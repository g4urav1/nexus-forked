import React, { useState } from 'react';
import DesktopNav from '../Individual/DesktopNav';
import MobileMenu from '../Individual/MobileMenu';

export default function FeedPage() {
    const [darkMode, setDarkMode] = useState(true);
    const [activeTab, setActiveTab] = useState('home');

    const [posts, setPosts] = useState([
        {
            id: 1,
            author: 'Sophia Martinez',
            handle: '@sophiam',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            badge: 'PRO',
            time: '2h ago',
            content: 'Just deployed the new dark mode system! Fluid transitions with Tailwind CSS make dark theme switches feel like butter. 🌙✨',
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
            likes: 142,
            comments: 18,
            shares: 9,
            isLiked: false,
            isBookmarked: false,
            tags: ['DesignSystem', 'React', 'Tailwind']
        },
        {
            id: 2,
            author: 'David K.',
            handle: '@davidk_dev',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
            badge: '',
            time: '5h ago',
            content: 'Which theme preference do you default to in your dev setup? Dark Slate or Deep AMOLED Black?',
            image: null,
            likes: 89,
            comments: 42,
            shares: 4,
            isLiked: true,
            isBookmarked: true,
            tags: ['WebDev', 'UIUX']
        }
    ]);

    const [newPostText, setNewPostText] = useState('');

    // Like & Bookmark Handlers
    const handleLike = (id) => {
        setPosts(posts.map(post => post.id === id ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 } : post));
    };

    const handleBookmark = (id) => {
        setPosts(posts.map(post => post.id === id ? { ...post, isBookmarked: !post.isBookmarked } : post));
    };

    const handleCreatePost = (e) => {
        e.preventDefault();
        if (!newPostText.trim()) return;

        const newPost = {
            id: Date.now(),
            author: 'You',
            handle: '@you_dev',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            badge: 'DEV',
            time: 'Just now',
            content: newPostText,
            image: null,
            likes: 0,
            comments: 0,
            shares: 0,
            isLiked: false,
            isBookmarked: false,
            tags: ['General']
        };

        setPosts([newPost, ...posts]);
        setNewPostText('');
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">

                <div className="max-w-7xl mx-auto flex gap-6 px-4 py-6">

                    {/* ================= 1. SIDEBAR NAVIGATION ================= */}
                    <DesktopNav />
                    {/* ================= 2. MAIN FEED STREAM ================= */}
                    <main className="flex-1 max-w-2xl space-y-5">

                        {/* --- CREATE POST CARD --- */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                            <form onSubmit={handleCreatePost}>
                                <div className="flex gap-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                                        alt="Your Avatar"
                                        className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20"
                                    />
                                    <textarea
                                        rows={3}
                                        value={newPostText}
                                        onChange={(e) => setNewPostText(e.target.value)}
                                        placeholder="What's happening in your dev world?"
                                        className="w-full resize-none border-none bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-0 pt-1"
                                    />
                                </div>

                                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3 mt-2">
                                    <div className="flex items-center space-x-1">
                                        <button type="button" title="Add Image" className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-xl transition">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </button>
                                        <button type="button" title="Add Code" className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-xl transition">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!newPostText.trim()}
                                        className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 disabled:opacity-40 text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all shadow-md shadow-indigo-500/20 active:scale-95"
                                    >
                                        Post
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* --- FEED CARDS --- */}
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 space-y-3"
                            >
                                {/* Author Info */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                                        <div>
                                            <div className="flex items-center space-x-1.5">
                                                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:underline cursor-pointer">{post.author}</h3>
                                                {post.badge && (
                                                    <span className="px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-[10px] rounded-md tracking-wider">
                                                        {post.badge}
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-xs text-slate-400 dark:text-slate-500">{post.handle} • {post.time}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                    {post.content}
                                </p>

                                {/* Optional Image */}
                                {post.image && (
                                    <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 max-h-80">
                                        <img src={post.image} alt="Post asset" className="w-full h-full object-cover" />
                                    </div>
                                )}

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {post.tags.map((tag, idx) => (
                                        <span key={idx} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Bottom Actions */}
                                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    <div className="flex items-center space-x-5">
                                        {/* Like */}
                                        <button
                                            onClick={() => handleLike(post.id)}
                                            className={`flex items-center space-x-1.5 transition ${post.isLiked ? 'text-rose-600 dark:text-rose-500 font-bold' : 'hover:text-rose-600'}`}
                                        >
                                            <svg className={`w-4 h-4 ${post.isLiked ? 'fill-rose-600 stroke-rose-600' : 'fill-none stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            <span>{post.likes}</span>
                                        </button>

                                        {/* Comments */}
                                        <button className="flex items-center space-x-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                                            <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                            <span>{post.comments}</span>
                                        </button>
                                    </div>

                                    {/* Bookmark */}
                                    <button
                                        onClick={() => handleBookmark(post.id)}
                                        className={`transition ${post.isBookmarked ? 'text-amber-500' : 'hover:text-amber-500'}`}
                                    >
                                        <svg className={`w-4 h-4 ${post.isBookmarked ? 'fill-amber-500 stroke-amber-500' : 'fill-none stroke-current'}`} viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                        </svg>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </main>

                    {/* ================= 3. RIGHT WIDGETS ================= */}
                    <aside className="hidden lg:block w-72 space-y-5">
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Trending Tags</h3>
                            <div className="space-y-2">
                                {['TailwindCSS', 'React2026', 'Nextjs', 'DarkUI'].map((tag, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-xs hover:bg-slate-50 dark:hover:bg-slate-800/60 p-2 rounded-xl cursor-pointer transition">
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">#{tag}</span>
                                        <span className="text-slate-400 text-[10px]">1.2k posts</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>


                    <MobileMenu />
                </div>
            </div>
        </div>
    );
}