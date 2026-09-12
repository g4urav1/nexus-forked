import React, { useEffect, useState } from "react";
import DesktopNav from "../Individual/DesktopNav";
import MobileMenu from "../Individual/MobileMenu";

export default function ResponsiveMessagesPage() {
  const [darkMode, setDarkMode] = useState(true);

  const [adminId, setAdminId] = useState("");

  const [activeChatId, setActiveChatId] = useState("");
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  // Messages fetched from MongoDB
  const [messages, setMessages] = useState([]);

  // Loading state
  const [loadingMessages, setLoadingMessages] = useState(false);

  const [loadingConversation, setLoadingConversation] = useState(false);
  const [conversations, setConversations] = useState([]);

  const activeChat = conversations.find((chat) => chat.id === activeChatId);

  useEffect(() => {
    const getConversation = async () => {
      try {
        setLoadingConversation(true);

        const response = await fetch("http://localhost:1111/conversations", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();

        setConversations(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setConversations([]);
      } finally {
        setLoadingConversation(false);
      }
    };

    getConversation();
  }, []);

  useEffect(() => {
    if (!activeChatId) {
      setMessages([]);
      return;
    }

    const getMessages = async () => {
      try {
        setLoadingMessages(true);

        const response = await fetch(
          `http://localhost:1111/messages/${activeChatId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();

        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    };

    getMessages();
  }, [activeChatId]);

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setMobileShowChat(true);
  };

  const formatMessageTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* APP CONTAINER */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 lg:gap-6 p-2 sm:p-4 lg:p-6 h-screen">
          {/* ================= 1. DESKTOP SIDEBAR / NAVIGATION ================= */}

          <DesktopNav />

          {/* ================= 2. MESSAGES CONTAINER ================= */}

          <main className="flex-1 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm flex h-[calc(100vh-5rem)] md:h-[calc(100vh-2rem)] lg:h-[calc(100vh-3rem)]">
            {/* ================= LEFT: CONVERSATIONS ================= */}

            <div
              className={`w-full md:w-72 lg:w-80 border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col shrink-0 ${
                mobileShowChat ? "hidden md:flex" : "flex"
              }`}
            >
              {/* Header */}

              <div className="p-3.5 sm:p-4 space-y-3 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    Messages
                  </h2>

                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="md:hidden p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {darkMode ? "☀️" : "🌙"}
                  </button>
                </div>

                {/* Search */}

                <div className="relative">
                  <svg
                    className="w-4 h-4 absolute left-3 top-3 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>

                  <input
                    type="text"
                    placeholder="Search chats..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800/60 border-none rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>
              </div>

              {/* Contacts */}

              <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50">
                {conversations.map((chat) => {
                  const isActive = chat.id === activeChatId;

                  return (
                    <div
                      key={chat.id}
                      onClick={() => handleSelectChat(chat.id)}
                      className={`flex items-center space-x-3 p-3.5 cursor-pointer transition ${
                        isActive
                          ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-l-4 border-indigo-600 dark:border-indigo-400"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      {/* Avatar */}

                      <div className="relative shrink-0">
                        <img
                          src={chat.avatar}
                          alt={chat.name}
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover"
                        />

                        {chat.online && (
                          <span className="w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full absolute bottom-0 right-0"></span>
                        )}
                      </div>

                      {/* User information */}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                            {chat.name}
                          </h4>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {chat.handle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ================= RIGHT: CHAT ================= */}

            {activeChat ? (
              <div
                className={`flex-1 flex-col h-full bg-slate-50/50 dark:bg-slate-900/50 ${
                  mobileShowChat ? "flex" : "hidden md:flex"
                }`}
              >
                {/* ================= CHAT HEADER ================= */}

                <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    {/* Mobile back button */}

                    <button
                      onClick={() => setMobileShowChat(false)}
                      className="md:hidden p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                      </svg>
                    </button>

                    {/* Avatar */}

                    <div className="relative">
                      <img
                        src={activeChat.avatar}
                        alt={activeChat.name}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                      />

                      {activeChat.online && (
                        <span className="w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full absolute bottom-0 right-0"></span>
                      )}
                    </div>

                    {/* Name */}

                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {activeChat.name}
                      </h3>

                      <span className="text-[10px] sm:text-[11px] text-slate-400">
                        {activeChat.online ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>

                  {/* Call button */}

                  <div className="flex items-center space-x-1 sm:space-x-2 text-slate-400">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.828-1.015-5.116-3.303-6.131-6.131l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* ================= MESSAGE LOG ================= */}

                <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3">
                  {loadingMessages ? (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-xs text-slate-400">
                        Loading messages...
                      </p>
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                      <p className="text-xs text-slate-400">No messages yet</p>
                    </div>
                  ) : (
                    messages.map((msg) => {
                      const isMe =
                        Number(msg.user_id) === Number(currentUserId);

                      return (
                        <div
                          key={msg._id}
                          className={`flex flex-col ${
                            isMe ? "items-end" : "items-start"
                          }`}
                        >
                          {/* Message */}

                          <div
                            className={`max-w-[80%] sm:max-w-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl text-xs leading-relaxed ${
                              isMe
                                ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-br-none shadow-md shadow-indigo-500/10"
                                : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200/80 dark:border-slate-700/80 shadow-sm"
                            }`}
                          >
                            {msg.content}
                          </div>

                          {/* Time */}

                          <span className="text-[10px] text-slate-400 mt-1 px-1">
                            {formatMessageTime(msg.created_at)}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* ================= COMPOSER ================= */}

                <div className="p-2.5 sm:p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800/80">
                  <form className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-slate-100 dark:bg-slate-800/60 border-none rounded-2xl px-3.5 py-2 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                    />

                    <button
                      type="submit"
                      disabled={!messageInput.trim()}
                      className="p-2 sm:p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl transition shadow-md shadow-indigo-500/20 active:scale-95"
                    >
                      <svg
                        className="w-4 h-4 fill-none stroke-current"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 12L3 21l18-9L3 3l3 9zm0 0h7"
                        />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex flex-1 items-center justify-center">
                <p className="text-sm text-slate-400">Select a conversation</p>
              </div>
            )}
          </main>

          {/* ================= 3. MOBILE BOTTOM NAVIGATION ================= */}

          <MobileMenu />
        </div>
      </div>
    </div>
  );
}
