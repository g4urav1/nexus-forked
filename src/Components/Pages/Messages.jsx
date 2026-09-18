import React, { useEffect, useRef, useState } from "react";
import DesktopNav from "../Individual/DesktopNav";
import MobileMenu from "../Individual/MobileMenu";
import { useNavigate, useParams } from "react-router-dom";

export default function MessagesPage() {
  const [darkMode, setDarkMode] = useState(true);

  const adminId = localStorage.getItem("adminId");

  const { conversationId } = useParams();

  const [activeChatId, setActiveChatId] = useState(conversationId || "");
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingConversation, setLoadingConversation] = useState(false);

  const [conversations, setConversations] = useState([]);

  const activeChat = conversations.find(
    (chat) => chat.conversationId === activeChatId,
  );

  // Sync active chat with URL param
  useEffect(() => {
    setActiveChatId(conversationId || "");

    if (conversationId) {
      setMobileShowChat(true);
    } else {
      setMobileShowChat(false);
    }
  }, [conversationId]);

  // Get conversations
  useEffect(() => {
    const getConversation = async () => {
      try {
        setLoadingConversation(true);
        console.log("AdminId:", adminId);

        const response = await fetch("http://localhost:1111/conversations", {
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Failed to get conversations");
          return;
        }

        const data = await response.json();

        setConversations(data);

        console.log("Conversations:", data);
      } catch (error) {
        console.error(error);
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
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          console.error("Failed to get messages");
          return;
        }

        const data = await response.json();

        setMessages(data);
      } catch (error) {
        console.error(error);
        setMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    };

    getMessages();
  }, [activeChatId]);

  const navigate = useNavigate();

  const handleSelectChat = (conversationId) => {
    setActiveChatId(conversationId);
    setMobileShowChat(true);
    navigate(`/inbox/${conversationId}`);
  };

  const formatMessageTime = (date) => {
    if (!date) return "";

    const messageDate = new Date(date);
    const now = new Date();

    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffInHours >= 24) {
      return messageDate.toLocaleDateString([], {
        day: "2-digit",
        month: "short",
        year: "numeric",
         hour: "2-digit",
      minute: "2-digit",
      });
    }

    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getChatName = (chat) => {
    if (!chat?.participants?.length) {
      return "Unknown Conversation";
    }

    return chat.participants
      .map((user) => user.Username || "Unknown User")
      .join(", ");
  };

  const getParticipants = (chat) => {
    return chat?.participants || [];
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const content = messageInput.trim();

    if (!content || !activeChatId) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:1111/sendMessages/${activeChatId}`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
          }),
        },
      );

      if (!response.ok) {
        console.error("Failed to send message");
        return;
      }

      setMessageInput("");

      const messagesResponse = await fetch(
        `http://localhost:1111/messages/${activeChatId}`,
        {
          credentials: "include",
        },
      );

      if (messagesResponse.ok) {
        const updatedMessages = await messagesResponse.json();
        setMessages(updatedMessages);
      }
    } catch (error) {
      console.error(error);
    }
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
              {/* ================= HEADER ================= */}

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

                {/* ================= SEARCH ================= */}

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

              {/* ================= CONTACTS ================= */}

              <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50">
                {loadingConversation ? (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-xs text-slate-400">
                      Loading conversations...
                    </p>
                  </div>
                ) : conversations.length === 0 ? (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-xs text-slate-400">No conversations</p>
                  </div>
                ) : (
                  conversations.map((chat) => {
                    const isActive = chat.conversationId === activeChatId;

                    const participants = getParticipants(chat);

                    return (
                      <div
                        key={chat.conversationId}
                        onClick={() => handleSelectChat(chat.conversationId)}
                        className={`flex items-center space-x-3 p-3.5 cursor-pointer transition ${
                          isActive
                            ? "bg-indigo-950/40 shadow-[inset_2px_0_6px_-1px_#818cf8]"
                            : "hover:bg-slate-800/40"
                        }`}
                      >
                        {/* ================= AVATARS ================= */}

                        <div className="flex -space-x-3 shrink-0">
                          {participants.slice(0, 3).map((user, index) => (
                            <img
                              key={`${user.Username}-${index}`}
                              src={
                                user.pfp ||
                                "https://i.pinimg.com/736x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
                              }
                              alt={user.Username || "User"}
                              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-white dark:border-slate-900"
                            />
                          ))}

                          {/* Show +N when more than 3 users */}

                          {participants.length > 3 && (
                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-semibold text-slate-600 dark:text-slate-200">
                              +{participants.length - 3}
                            </div>
                          )}
                        </div>

                        {/* ================= USER INFORMATION ================= */}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                              {getChatName(chat)}
                            </h4>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* ================= RIGHT: CHAT ================= */}

            {activeChat && (
              <div
                className={`flex-1 flex-col h-full bg-slate-50/50 dark:bg-slate-900/50 ${
                  mobileShowChat ? "flex" : "hidden md:flex"
                }`}
              >
                {/* ================= CHAT HEADER ================= */}

                <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                    {/* Mobile back button */}

                    <button
                      onClick={() => {
                        setMobileShowChat(false);
                        navigate("/inbox");
                      }}
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

                    {/* ================= HEADER AVATARS ================= */}

                    <div className="flex -space-x-2 shrink-0">
                      {activeChat.participants
                        ?.slice(0, 3)
                        .map((user, index) => (
                          <img
                            key={`${user.Username}-${index}`}
                            src={
                              user.pfp ||
                              "https://i.pinimg.com/736x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
                            }
                            alt={user.Username || "User"}
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white dark:border-slate-900"
                          />
                        ))}

                      {activeChat.participants?.length > 3 && (
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[9px] font-semibold text-slate-600 dark:text-slate-200">
                          +{activeChat.participants.length - 3}
                        </div>
                      )}
                    </div>

                    {/* ================= HEADER NAME ================= */}

                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">
                        {getChatName(activeChat)}
                      </h3>
                    </div>
                  </div>

                  {/* ================= CALL BUTTON ================= */}

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
                      const isMe = msg.user_id == adminId;

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
                  <div ref={messagesEndRef} />
                </div>

                {/* ================= COMPOSER ================= */}

                <div className="p-2.5 sm:p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800/80 mb-12 md:mb-2">
                  <form
                    onSubmit={handleSendMessage}
                    className="flex items-center space-x-2"
                  >
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
            )}
          </main>

          {/* ================= 3. MOBILE BOTTOM NAVIGATION ================= */}

          <MobileMenu />
        </div>
      </div>
    </div>
  );
}
