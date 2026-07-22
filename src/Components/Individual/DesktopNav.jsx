import { useState } from "react";
import { NavLink } from "react-router";

export default function DesktopNav() {
    const [darkMode, setDarkMode] = useState(true);
    const [activeChatId, setActiveChatId] = useState(1);
    const [mobileShowChat, setMobileShowChat] = useState(false); // Mobile state to switch between list & chat
    const [messageInput, setMessageInput] = useState('');

    return (
        <aside className="hidden md:flex md:w-20 xl:w-64 flex-col justify-between h-[calc(100vh-2rem)] lg:h-[calc(100vh-3rem)] sticky top-4 lg:top-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-4 shadow-sm shrink-0">
            <div className="space-y-6">
                {/* Brand Logo */}
                <div className="flex items-center space-x-3 px-2">
                    <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
                        N
                    </div>
                    <span className="hidden xl:inline font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                        Nexus<span className="text-indigo-600 dark:text-indigo-400">.ui</span>
                    </span>
                </div>

                <NavLink
                    to="/"
                    end // Optional: Ensures exact matching for root path "/"
                    className={({ isActive }) =>
                        `flex flex-col items-center space-y-1 transition ${isActive
                            ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`
                    }
                >
                    <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span className="text-[10px]">Feed</span>
                </NavLink>

                <NavLink to="/search"
                    end // Optional: Ensures exact matching for root path "/"
                    className={({ isActive }) =>
                        `flex flex-col items-center space-y-1 transition ${isActive
                            ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`
                    }>


                    <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    <span className="text-[10px]">Explore</span>

                </NavLink>
                <NavLink to="/inbox"
                    end // Optional: Ensures exact matching for root path "/"
                    className={({ isActive }) =>
                        `flex flex-col items-center space-y-1 transition ${isActive
                            ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`
                    }>
                    <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.074-.865 5.25 5.25 0 001.294-2.671A8.243 8.243 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>
                    <span className="text-[10px]">Messages</span>

                </NavLink>

                <NavLink to="/profile"
                    end // Optional: Ensures exact matching for root path "/"
                    className={({ isActive }) =>
                        `flex flex-col items-center space-y-1 transition ${isActive
                            ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`
                    }>
                    <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                    <span className="text-[10px]">Profile</span>

                </NavLink>
            </div>

            {/* Dark Mode Toggle */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 transition"
                >
                    <div className="flex items-center space-x-3">
                        {darkMode ? (
                            <svg className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" /></svg>
                        ) : (
                            <svg className="w-5 h-5 text-indigo-600 fill-current" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                        )}
                        <span className="hidden xl:inline text-xs font-semibold">{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
                    </div>
                </button>
            </div>
        </aside>
    )
}