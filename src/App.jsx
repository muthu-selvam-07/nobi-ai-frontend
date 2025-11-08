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
    setMessages(prev => [...prev, { sender: "user", text, image }]);

    if (text) {
      try {
        const res = await axios.post("http://localhost:4000/api/chat", { message: text });
        setMessages(prev => [...prev, { sender: "ai", text: res.data.reply || "No response" }]);
      } catch {
        setMessages(prev => [...prev, { sender: "ai", text: "⚠️ Unable to reach server" }]);
      }
    }
  };

  // Close sidebar when clicking on chat area
  const handleClickHome = () => { if (sidebarOpen) setSidebarOpen(false); };

  return (
    <div className="flex h-screen">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onNewChat={() => setMessages([])}
      />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header />
        <div className="flex-1" onClick={handleClickHome}>
          <ChatView messages={messages} onSend={handleSend} sidebarOpen={sidebarOpen} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
