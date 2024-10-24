import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addMessageToHistory, updateLastAssistantMessage } from "../store/chatSlice";
import { AssistantStream } from "openai/lib/AssistantStream";
import { createThread, sendMessageToThread, runAssistant } from "../utils/openai";

type TextDelta = {
  value?: string;
};

type AssistantEvent = {
  event: string;
};

const ChatAssistant: React.FC = () => {
  const dispatch = useDispatch();
  const chatHistory = useSelector((state: RootState) => state.chat.chatHistory);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const threadIdRef = useRef<string | null>(null);

  // Create a thread on component mount, if one does not exist
  useEffect(() => {
    const initializeThread = async () => {
      const threadId = await createThread();
      if (threadId) {
        console.log("setting threadIdRef.current to", threadId);
        threadIdRef.current = threadId;
        console.log("threadIdRef.current", threadIdRef.current);
      }
    };

    if (!threadIdRef.current) {
      initializeThread();
    }
  }, []);

  const handleSendMessage = async () => {
    if (message.trim()) {
      dispatch(addMessageToHistory(`User: ${message}`));
      setLoading(true);
      setMessage("");
      console.log(threadIdRef.current);
      try {
        if (threadIdRef.current && (await sendMessageToThread(threadIdRef.current, message))) {
          const responseStream = await runAssistant(threadIdRef.current);
          if (responseStream) {
            handleReadableStream(responseStream);
          } else {
            dispatch(addMessageToHistory("Assistant: No response from server."));
          }
        } else {
          dispatch(addMessageToHistory("Assistant: Error sending message."));
        }
      } catch (error) {
        const typedError = error as Error; // Type-cast to Error
        dispatch(addMessageToHistory(`Assistant: Error - ${typedError.message}`));
        console.error("Error in handleSendMessage:", typedError); // Log detailed error
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReadableStream = (stream: ReadableStream) => {
    const assistantStream = AssistantStream.fromReadableStream(stream);

    dispatch(addMessageToHistory("Assistant: ")); // Add an initial empty assistant message

    assistantStream.on("textCreated", () => {
      dispatch(addMessageToHistory("Assistant: ")); // Start of assistant message
    });

    assistantStream.on("textDelta", (delta: TextDelta) => {
      if (delta.value) {
        dispatch(updateLastAssistantMessage(delta.value)); // Append streamed text
      }
    });

    assistantStream.on("event", (event: AssistantEvent) => {
      if (event.event === "thread.run.completed") {
        setLoading(false); // Complete the stream and stop loading
      }
    });
  };

  return (
    <div className="chat-window">
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <p key={index}>{msg}</p>
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
