// utils/openai.ts

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const ASSISTANT_ID = process.env.REACT_APP_ASSISTANT_ID;

export const createThread = async (): Promise<string | null> => {
  console.log("trying to create thread");
  try {
    const response = await fetch("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "OpenAI-Beta": "assistants=v2",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to create thread: ${response.statusText}`);
    }
    const thread = await response.json();
    return thread.Id;
  } catch (error) {
    console.error("Error creating thread:", error);
    return null;
  }
};

export const sendMessageToThread = async (
  threadId: string,
  userMessage: string,
): Promise<boolean> => {
  console.log("trying to send message");
  try {
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        role: "user",
        content: userMessage,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error sending message:", error);
    return false;
  }
};

export const runAssistant = async (threadId: string): Promise<ReadableStream | null> => {
  try {
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        assistant_id: ASSISTANT_ID,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to run assistant: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error("Response body is null");
    }
    console.log(response.body);
    return response.body; // Return the readable stream
  } catch (error) {
    console.error("Error running assistant:", error);
    return null;
  }
};
