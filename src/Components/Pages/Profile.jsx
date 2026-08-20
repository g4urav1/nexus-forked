import React, { useContext, useEffect, useState } from "react";
import MobileMenu from "../Individual/MobileMenu";
import DesktopNav from "../Individual/DesktopNav";
import { UserContext, UserPostContext } from "../context/context";
import { User } from "lucide-react";

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  const { UserPosts } = useContext(UserPostContext);

  const { user } = useContext(UserContext);

  const formatPostTime = (date) => {
    const diff = Date.now() - new Date(date).getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days}d ago`;

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // User details state
  const userArr = {
    name: "Alex Chen",
    handle: "@you_dev",
    role: "Product Designer & Frontend Engineer",
    bio: "Crafting pixel-perfect UI/UX systems & building with React, Tailwind CSS, and Framer Motion. 🚀",
    location: "San Francisco, CA",
    website: "https://alexchen.dev",
    joined: "Joined March 2023",
    following: 412,
    followers: "12.8k",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
    cover:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* APP CONTAINER */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 lg:gap-6 p-2 sm:p-4 lg:p-6 pb-20 md:pb-6">
          {/* ================= 1. DESKTOP SIDEBAR ================= */}
          <DesktopNav />

          {/* ================= 2. MAIN PROFILE CONTENT ================= */}
          <main className="flex-1 min-w-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
            {/* Cover Image */}
            <div className="h-36 sm:h-52 lg:h-60 w-full relative bg-slate-800 overflow-hidden">
              <img
                src={userArr.cover}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>

              {/* Mobile Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="md:hidden absolute top-3 right-3 p-2 bg-slate-900/60 backdrop-blur-md rounded-full text-white text-xs"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>

            {/* Profile Info Header */}
            <div className="px-4 sm:px-6 pb-4 relative">
              <div className="flex justify-between items-end -mt-12 sm:-mt-16 mb-4">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={
                      user?.Pfp ||
                      "https://i.pinimg.com/736x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
                    }
                    alt={user?.Username || "loading..."}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-white dark:ring-slate-900 shadow-xl"
                  />
                  <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full absolute bottom-2 right-2"></span>
                </div>

                {/* Edit Profile Action */}
                <div className="space-x-4">
                  <button
                    onClick={() => (window.location.href = "create/post")}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 text-white font-semibold rounded-2xl text-xs sm:text-sm transition shadow-md active:scale-95"
                  >
                    Create Post
                  </button>
                  <button
                    onClick={() => (window.location.href = "edit/profile")}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 text-white font-semibold rounded-2xl text-xs sm:text-sm transition shadow-md active:scale-95"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Identity & Bio */}
              <div className="space-y-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                    {user?.Username || (
                      <p className="animate-pulse">loading...</p>
                    )}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {user?.Email || (
                      <span className="animate-pulse">loading...</span>
                    )}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
                  {user?.Bio || (
                    <span className="animate-pulse">loading...</span>
                  )}
                </p>

                {/* Meta details */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    <span>{userArr.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                      />
                    </svg>
                    <a
                      href={userArr.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {userArr.website.replace("https://", "")}
                    </a>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                      />
                    </svg>
                    <span>{user?.Joined}</span>
                  </div>
                </div>

                {/* Follower Stats */}
                <div className="flex space-x-5 pt-1 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {user?.Following}
                    </span>{" "}
                    <span className="text-slate-500 dark:text-slate-400">
                      Following
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {user?.Followers}
                    </span>{" "}
                    <span className="text-slate-500 dark:text-slate-400">
                      Followers
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-200/80 dark:border-slate-800 mt-6 text-xs sm:text-sm font-semibold">
                {["posts", "media", "likes"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 px-4 capitalize relative transition ${
                      activeTab === tab
                        ? "text-indigo-600 dark:text-indigo-400 font-bold"
                        : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Feed Content */}
            <div className="p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-slate-950/30">
              {activeTab === "posts" &&
                UserPosts.length === 0 &&
                "NO POSTS YET!"}
              {activeTab === "posts" &&
                UserPosts.length > 0 &&
                UserPosts.map((post) => (
                  <article
                    key={post._id}
                    className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl space-y-3 shadow-sm"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={userArr.avatar}
                        alt={
                          user?.Username || (
                            <p className="animate-pulse">loading...</p>
                          )
                        }
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                          {user?.Username || (
                            <p className="animate-pulse">loading...</p>
                          )}
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          {formatPostTime(post.UploadedAt)}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      {post.Caption}
                    </p>

                    {post.Url && (
                      <div className="rounded-xl overflow-hidden max-h-80 border border-slate-100 dark:border-slate-800">
                        <img
                          src={post.Url}
                          alt="Post media"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex items-center space-x-6 text-slate-400 text-xs pt-2">
                      <button className="flex items-center space-x-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          />
                        </svg>
                        <span>{post.Likes}</span>
                      </button>
                      <button className="flex items-center space-x-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.585 1.659l-.48 1.921 2.03-.406c.552-.11 1.115.08 1.542.418A8.93 8.93 0 0012 20.25z"
                          />
                        </svg>
                        <span>{post.Shares}</span>
                      </button>
                    </div>
                  </article>
                ))}

              {activeTab === "media" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {UserPosts.map((src) => (
                    <div
                      key={src._id}
                      className="aspect-square rounded-2xl overflow-hidden bg-slate-800 border border-slate-200/80 dark:border-slate-800"
                    >
                      <img
                        src={src.Url}
                        alt="Media thumbnail"
                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "likes" && (
                <div className="text-center py-8 text-xs text-slate-400">
                  Liked posts will appear here.
                </div>
              )}
            </div>
          </main>

          {/* ================= 3. MOBILE BOTTOM NAVIGATION BAR ================= */}
          <MobileMenu />
        </div>
      </div>
    </div>
  );
}
