// utils/openai.ts

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const ASSISTANT_ID = process.env.REACT_APP_ASSISTANT_ID;

export const createThread = async (): Promise<string | null> => {
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
    return thread.id;
  } catch (error) {
    console.error("Error creating thread:", error);
    return null;
  }
};

export const sendMessageToThread = async (
  threadId: string,
  userMessage: string,
): Promise<boolean> => {
  console.log("trying to send message", userMessage);
  try {
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "OpenAI-Beta": "assistants=v2",
      },
      body: JSON.stringify({
        role: "user",
        content: userMessage,
      }),
    });
    console.log("Send message API response", response);
    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error sending message:", error);
    return false;
  }
};

export const getMessagesFromThread = async (threadId: string): Promise<string[] | null> => {
  try {
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "OpenAI-Beta": "assistants=v2",
        mode: "no-cors",
      },
    });
    console.log("Get messages API response", response);
    if (!response.ok) {
      throw new Error(`Failed to get messages: ${response.statusText}`);
    }
    console.log("Get messages API response", response);
    const messages = await response.json();
    return messages.data.map((message: any) => message.content);
  } catch (error) {
    console.error("Error getting messages:", error);
    return null;
  }
};

export const runAssistant = async (threadId: string): Promise<ReadableStream | null> => {
  try {
    const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "OpenAI-Beta": "assistants=v2",
      },
      body: JSON.stringify({
        assistant_id: ASSISTANT_ID,
      }),
    });
    console.log("Run assistant API response", response);
    if (!response.ok) {
      throw new Error(`Failed to run assistant: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error("Response body is null");
    }
    console.log("Got response: ", response.body);
    return response.body;
  } catch (error) {
    console.error("Error running assistant:", error);
    return null;
  }
};
