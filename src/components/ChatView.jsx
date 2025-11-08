import React, { useRef, useEffect, useState } from "react";
import { FaPaperPlane, FaImage } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ChatView({ messages, onSend, sidebarOpen }) {
  const chatEndRef = useRef();
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() && !image) return;
    onSend({ text: input, image });
    setInput("");
    setImage(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className={`flex-1 flex flex-col bg-gray-950 transition-all duration-300 relative`}
      style={{ marginLeft: sidebarOpen ? "16rem" : "0" }}
    >
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 pt-16 pb-32 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`max-w-[70%] p-3 sm:p-4 rounded-2xl break-words shadow-md ${
              msg.sender === "user"
                ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white self-end ml-auto"
                : "bg-gray-800 text-gray-200 self-start mr-auto"
            }`}
          >
            {msg.image && (
              <img
                src={msg.image}
                alt="uploaded"
                className="mb-2 rounded-xl shadow-sm max-h-64 object-contain"
              />
            )}
            <p className="whitespace-pre-wrap">{msg.text}</p>
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%] max-w-3xl flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-3 rounded-full outline-none placeholder-gray-400 bg-gray-800 text-white shadow-inner"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <label className="cursor-pointer text-gray-400 hover:text-gray-200 transition">
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => setImage(reader.result);
              reader.readAsDataURL(file);
            }}
          />
          <FaImage size={20} />
        </label>
        <button
          onClick={handleSend}
          className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg flex items-center justify-center"
        >
          <FaPaperPlane size={16} />
        </button>
      </div>
    </div>
  );
}
