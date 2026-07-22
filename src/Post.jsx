import React from 'react';

export default function Post({ post }) {
  // Pass your custom logic down via props or import your handlers here
  return (
    <article className="max-w-md mx-auto bg-white border border-gray-200 rounded-sm mb-6">
      
      {/* 1. Header (User Info) */}
      <header className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <img
            src={post?.userAvatar || "https://via.placeholder.com/150"}
            alt="User avatar"
            className="w-8 h-8 rounded-full object-cover border"
          />
          <span className="font-semibold text-sm text-gray-900">
            {post?.username || "username"}
          </span>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          {/* Ellipsis / Options Icon */}
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="6" cy="12" r="1.5" />
            <circle cx="18" cy="12" r="1.5" />
          </svg>
        </button>
      </header>

      {/* 2. Media Section */}
      <div className="w-full aspect-square bg-gray-100 overflow-hidden">
        <img
          src={post?.imageUrl || "https://via.placeholder.com/500"}
          alt="Post content"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3. Action Buttons */}
      <section className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            {/* Like Button */}
            <button className="hover:opacity-60 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            {/* Comment Button */}
            <button className="hover:opacity-60 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            {/* Share / DM Button */}
            <button className="hover:opacity-60 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          {/* Bookmark Button */}
          <button className="hover:opacity-60 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* 4. Likes & Caption */}
        <div className="text-sm">
          <p className="font-semibold mb-1">{post?.likesCount || 0} likes</p>
          <p className="text-gray-800">
            <span className="font-semibold mr-2">{post?.username || "username"}</span>
            {post?.caption || "This is a placeholder caption for the MVP UI."}
          </p>
        </div>

        {/* 5. Time Stamp */}
        <time className="text-[10px] text-gray-400 uppercase tracking-wide block mt-2">
          {post?.createdAt || "2 hours ago"}
        </time>
      </section>

      {/* 6. Comment Input Bar */}
      <footer className="border-t border-gray-100 p-3 flex items-center">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full text-sm outline-none bg-transparent"
        />
        <button className="text-sky-500 font-semibold text-sm ml-2 hover:text-sky-700">
          Post
        </button>
      </footer>
    </article>
  );
}