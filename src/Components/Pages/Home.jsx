import React, { useContext, useEffect, useState } from "react";
import DesktopNav from "../Individual/DesktopNav";
import MobileMenu from "../Individual/MobileMenu";
import { UserContext } from "../context/context";

export default function FeedPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  const getFeed = async () => {
    const response = await fetch("http://localhost:1111", {
      credentials: "include",
    });
    const data = await response.json();
    setPosts(data);
    console.log(data);
  };

  useEffect(() => {
    getFeed();
  }, []);
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

  const [NewPost, setNewPost] = useState(null);
  const [Caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [sending, setSending] = useState(false);

  const handleCreatePost = async () => {
    if (!NewPost) {
      return;
    }

    const formData = new FormData();
    formData.append("image", NewPost);
    formData.append("caption", Caption);

    setSending(true);

    try {
      const response = await fetch("http://localhost:1111/uploadmain", {
        credentials: "include",
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
      }
      alert("post uploaded");
    } catch (error) {
      alert("something went wrong");
      console.error(error);
    } finally {
      setSending(false);
      setNewPost(null);
      setPreview(null);
      setCaption("");
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex gap-6 px-4 py-6">
          {/* ================= 1. SIDEBAR NAVIGATION ================= */}
          <DesktopNav />
          {/* ================= 2. MAIN FEED STREAM ================= */}
          <main className="flex-1 max-w-2xl space-y-5">
            {/* --- CREATE POST CARD --- */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <form>
                <div className="flex gap-3">
                  <img
                    src={
                      user?.Pfp ||
                      "https://i.pinimg.com/736x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
                    }
                    alt="Your Avatar"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                  />
                  <textarea
                    rows={3}
                    value={Caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="What's happening in your dev world?"
                    className="w-full resize-none border-none bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-0 pt-1"
                  />
                  {preview && (
                    <div className="mt-3">
                      <img
                        src={preview}
                        alt="Post preview"
                        className="w-full max-h-36 object-cover rounded-xl"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3 mt-2">
                  <div className="flex items-center space-x-1">
                    <input
                      type="file"
                      id="AddPost"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={(e) => setNewPost(e.target.files[0])}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          setNewPost(file);
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                    />

                    <label
                      htmlFor="AddPost"
                      title="Add Image"
                      className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-xl transition cursor-pointer"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.8"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleCreatePost();
                    }}
                    disabled={!Caption.trim() || !NewPost}
                    className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-40 text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md shadow-indigo-500/20 active:scale-95"
                  >
                    {sending ? (
                      <div className="h-5 w-5 animate-spin   rounded-full border-l-[2px] border-b-[1.5px] border-r-[1px] border-text border-t-transparent"></div>
                    ) : (
                      "Post"
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* --- FEED CARDS --- */}
            {posts.map((post) => (
              <article
                key={post._id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 space-y-3"
              >
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        post.Pfp ||
                        "https://i.pinimg.com/736x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
                      }
                      alt={post.Username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:underline cursor-pointer">
                          {post.Username}
                        </h3>
                      </div>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {post.Username} • {formatPostTime(post.UploadedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {post.Caption}
                </p>

                {/* Optional Image */}
                {post.Url && (
                  <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                    <img
                      src={post.Url}
                      alt="Post asset"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                )}

              
                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <div className="flex items-center space-x-5">
                    {/* Like */}
                    <button
                      onClick={() => handleLike(post._id)}
                      className={`flex items-center space-x-1.5 transition ${post.isLiked ? "text-rose-600 dark:text-rose-500 font-bold" : "hover:text-rose-600"}`}
                    >
                      <svg
                        className={`w-4 h-4 ${post.isLiked ? "fill-rose-600 stroke-rose-600" : "fill-none stroke-current"}`}
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span>{post.Likes}</span>
                    </button>

                    {/* Comments */}
                    <button className="flex items-center space-x-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                      <svg
                        className="w-4 h-4 fill-none stroke-current"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span>{post.comments}</span>
                    </button>
                  </div>

                  {/* Bookmark */}
                  <button
                    onClick={() => handleBookmark(post.id)}
                    className={`transition ${post.isBookmarked ? "text-amber-500" : "hover:text-amber-500"}`}
                  >
                    <svg
                      className={`w-4 h-4 ${post.isBookmarked ? "fill-amber-500 stroke-amber-500" : "fill-none stroke-current"}`}
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </main>

          {/* ================= 3. RIGHT WIDGETS ================= */}
          <aside className="hidden lg:block w-72 space-y-5">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Trending Tags
              </h3>
              <div className="space-y-2">
                {["TailwindCSS", "React2026", "Nextjs", "DarkUI"].map(
                  (tag, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center text-xs hover:bg-slate-50 dark:hover:bg-slate-800/60 p-2 rounded-xl cursor-pointer transition"
                    >
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        #{tag}
                      </span>
                      <span className="text-slate-400 text-[10px]">
                        1.2k posts
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </aside>

          <MobileMenu />
        </div>
      </div>
    </div>
  );
}
