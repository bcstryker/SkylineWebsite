// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const OpenAI = require('openai');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000', // Update this to your frontend origin
    credentials: true,
  })
);
app.use(cookieParser());

const port = process.env.PORT || 5001;

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In-memory storage for user sessions and threads
const userSessions = {};

// Middleware to handle user sessions
app.use((req, res, next) => {
  let sessionId = req.cookies.sessionId;

  if (!sessionId || !userSessions[sessionId]) {
    sessionId = uuidv4();
    userSessions[sessionId] = { threadId: null, lastActivity: Date.now() };
    res.cookie('sessionId', sessionId, { httpOnly: true });
  } else {
    // Update last activity time
    userSessions[sessionId].lastActivity = Date.now();
  }

  req.sessionId = sessionId;
  req.sessionData = userSessions[sessionId];
  next();
});

// Endpoint to initialize a thread
app.post('/api/init-thread', async (req, res) => {
  const sessionData = req.sessionData;

  try {
    const assistantId = process.env.ASSISTANT_ID;

    // Create a new thread
    const thread = await openai.beta.threads.create();

    const threadId = thread.id;
    console.log('Created Thread with ID:', threadId);

    // Store threadId and assistantId in session
    sessionData.threadId = threadId;
    sessionData.assistantId = assistantId;

    res.json({ threadId });
  } catch (error) {
    console.error('Error initializing thread:', error);
    res.status(500).json({ error: 'Failed to initialize thread' });
  }
});

// Endpoint to send a message and get assistant's response
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const sessionData = req.sessionData;
  const threadId = sessionData.threadId;
  const assistantId = sessionData.assistantId;

  if (!threadId || !assistantId) {
    return res.status(400).json({ error: 'Thread not initialized' });
  }
  console.log(message);
  try {
    console.log("Creating message in thread", threadId, message);
    // Send user's message to the thread
    await openai.beta.threads.messages.create(threadId, {
      content: message,
      role: 'user',
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: assistantId,
    });

    const runId = run.id;

    // Poll the run status until it's completed
    let runStatus = run.status;
    while (runStatus !== 'completed' && runStatus !== 'failed') {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const statusResponse = await openai.beta.threads.runs.get(threadId, runId);
      runStatus = statusResponse.status;
      console.log('Run status:', runStatus);
    }

    if (runStatus === 'failed') {
      return res.status(500).json({ error: 'Assistant run failed' });
    }

    // Fetch the thread messages
    const messagesResponse = await openai.beta.threads.messages.list(threadId);
    console.log("Messages response", messagesResponse);
    const messages = messagesResponse.data;

    // Find the latest assistant message
    const assistantMessages = messages.filter((msg) => msg.role === 'assistant');
    const assistantMessage = assistantMessages[0];
    console.log(assistantMessage.content);

    if (assistantMessage) {
      res.json({ assistantMessage: assistantMessage.content[0].text.value });
    } else {
      res.status(500).json({ error: 'Assistant message not found' });
    }
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

// Cleanup inactive sessions periodically
setInterval(() => {
  const now = Date.now();
  const sessionTimeout = 30 * 60 * 1000; // 30 minutes
  for (const sessionId in userSessions) {
    if (now - userSessions[sessionId].lastActivity > sessionTimeout) {
      delete userSessions[sessionId];
      console.log(`Session ${sessionId} expired and removed.`);
    }
  }
}, 15 * 60 * 1000); // Run every 15 minutes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
