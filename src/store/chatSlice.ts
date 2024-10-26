// src/store/chatSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";

// Define the interface for the chat state
interface ChatState {
  chatHistory: string[];
  loading: boolean;
  error: string | null;
}

// Set the initial state
const initialState: ChatState = {
  chatHistory: [],
  loading: false,
  error: null,
};

// Create the chat slice
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessageToHistory: (state, action: PayloadAction<string>) => {
      state.chatHistory.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export the actions
export const { addMessageToHistory, setLoading, setError } = chatSlice.actions;

// Export the reducer
export default chatSlice.reducer;

// Asynchronous action to initialize the thread
export const initializeThread = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  try {
    const response = await fetch("http://localhost:5001/api/init-thread", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for session management
    });

    if (!response.ok) {
      throw new Error("Failed to initialize thread");
    }

    // No need to store threadId on the client; the server handles it via sessions
    dispatch(setLoading(false));
  } catch (error) {
    console.error("Error initializing thread:", error);
    dispatch(setError("Error initializing thread"));
    dispatch(setLoading(false));
  }
};

// Asynchronous action to send a message and receive the assistant's response
export const sendMessage = (message: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(addMessageToHistory(`User: ${message}`));
  console.log(message);
  try {
    const response = await fetch("http://localhost:5001/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies for session management
      body: JSON.stringify({ message }),
    });
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      dispatch(setError(errorData.error || "Error communicating with server"));
      dispatch(setLoading(false));
      return;
    }

    const data = await response.json();
    dispatch(addMessageToHistory(`Assistant: ${data.assistantMessage}`));
  } catch (error) {
    console.error("Error sending message:", error);
    dispatch(setError("Error sending message"));
  } finally {
    dispatch(setLoading(false));
  }
};
