import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { initializeThread, sendMessage } from "../store/chatSlice";

const ChatAssistant: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const chatHistory = useSelector((state: RootState) => state.chat.chatHistory);
  const loading = useSelector((state: RootState) => state.chat.loading);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    dispatch(initializeThread());
  }, [dispatch]);

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(sendMessage(message));
      setMessage("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <p style={{ color: "white" }} key={index}>
            {msg}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={loading}
      />
      <button onClick={handleSendMessage} disabled={loading}>
        {loading ? "Loading..." : "Send"}
      </button>
    </div>
  );
};

export default ChatAssistant;
