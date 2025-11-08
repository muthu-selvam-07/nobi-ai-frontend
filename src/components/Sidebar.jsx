import React from "react";
import { FaBars, FaTimes, FaFolderPlus } from "react-icons/fa";

export default function Sidebar({ sidebarOpen, setSidebarOpen, onNewChat }) {
  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-3 left-3 z-50 bg-transparent backdrop-blur-md p-3 rounded-full shadow-md text-white hover:bg-gray-800 transition md:hidden"
      >
        {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-5 border-r border-gray-700 shadow-lg transform transition-transform duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative`}
      >
        <h2 className="text-2xl font-bold text-blue-400 mb-6">Nobi-AI</h2>

        <button
          onClick={onNewChat}
          className="flex items-center gap-2 w-full mb-4 bg-blue-600 hover:bg-blue-700 py-2 px-3 rounded-lg transition"
        >
          <FaFolderPlus /> New Chat
        </button>

        <div className="text-gray-400 text-sm mt-6">Saved Chats (Coming Soon)</div>
      </div>
    </>
  );
}
