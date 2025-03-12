"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./styles.module.css";

const ChatTest = () => {
  let messagesArchive = [
    {
      sender: "coach",
      message: `Good morning, Aleksei! Ready to tackle your fitness goals today? How's your energy level?`,
    },
    {
      sender: "user",
      message: `I'm feeling good but planning a light workout day.`,
    },
    {
      sender: "coach",
      message: `Sounds like a plan! Keeping your routine varied helps prevent injury and keeps things interesting!`,
    },
  ];

  const [messages, setMessages] = useState(messagesArchive);
  const [newMessage, setNewMessage] = useState<null | {
    sender: string;
    message: string;
  }>(null);
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
      const newHeight = Math.min(textareaRef.current.scrollHeight, 80);
      if (newHeight > 40) {
        textareaRef.current.style.height = `${newHeight}px`;
      }
    }
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const messageToAdd = { sender: "user", message: inputValue.trim() };
      setNewMessage(messageToAdd);
      // if (textareaRef.current) {
      //     textareaRef.current.style.maxHeight = '40px';
      //     textareaRef.current.style.opacity = '0';
      //     textareaRef.current.focus();
      // }

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
      setInputValue("");
      if (textareaRef.current) {
        textareaRef.current.style.opacity = "1";
      }
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.maxHeight = "999px";
        }
        if (messageToAdd) {
          setMessages((prevMessages) => [...prevMessages, messageToAdd]);
          setNewMessage(null);
        }
      }, 250);
      setTimeout(() => {}, 350);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.stack}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.sender === "coach"
                ? styles.coachMessageWrapper
                : styles.userMessageWrapper
            }
          >
            {message.sender === "coach" && (
              <div className="flex gap-2 font-semibold text-sm text-purple-900">
                {" "}
                <img src="/ai avatar.png" className="h-6 w-6" /> zing coach
              </div>
            )}
            <div
              className={
                message.sender === "coach"
                  ? styles.coachMessage
                  : styles.userMessage
              }
            >
              {message.message}
            </div>
          </div>
        ))}
        <form onSubmit={handleSubmit} className={styles.inputWrapper}>
          <textarea
            ref={textareaRef}
            placeholder="Message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            rows={1}
            className="w-full resize-none max-h-24"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="flex w-full justify-between">
            <button type="button" className="text-3xl px-1">
              +
            </button>
            <button
              type="submit"
              className="text-2xl rounded-full bg-black text-white px-2"
            >
              ↑
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatTest;
