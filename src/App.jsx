import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatView from "./components/ChatView";
import axios from "axios";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSend = async ({ text, image }) => {
    if (!text && !image) return;

    // Add user message
    setMessages(prev => [...prev, { sender: "user", text, image }]);

    if (text) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/chat`,
          { message: text }
        );

        setMessages(prev => [
          ...prev,
          { sender: "ai", text: res.data.reply || "⚠️ No response" }
        ]);
      } catch (error) {
        console.error("API Error:", error);
        setMessages(prev => [
          ...prev,
          { sender: "ai", text: "⚠️ Unable to reach server" }
        ]);
      }
    }
  };

  // Close sidebar when clicking outside
  const handleClickHome = () => {
    if (sidebarOpen) setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen flex-col md:flex-row bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onNewChat={() => setMessages([])}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header />

        {/* Chat area */}
        <div
          className="flex-1 overflow-hidden"
          onClick={handleClickHome}
        >
          <ChatView
            messages={messages}
            onSend={handleSend}
            sidebarOpen={sidebarOpen}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
