import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  chatHistory: string[];
}

const initialState: ChatState = {
  chatHistory: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessageToHistory: (state, action: PayloadAction<string>) => {
      state.chatHistory.push(action.payload);
    },
    updateLastAssistantMessage: (state, action: PayloadAction<string>) => {
      if (state.chatHistory.length > 0) {
        const lastIndex = state.chatHistory.length - 1;
        state.chatHistory[lastIndex] += action.payload;
      }
    },
  },
});

export const { addMessageToHistory, updateLastAssistantMessage } = chatSlice.actions;
export default chatSlice.reducer;
