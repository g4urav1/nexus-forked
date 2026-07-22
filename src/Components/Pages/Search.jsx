import React, { useState } from 'react';
import MobileMenu from '../Individual/MobileMenu';
import DesktopNav from '../Individual/DesktopNav';

export default function SearchPage() {
    const [darkMode, setDarkMode] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // People List State
    const [people, setPeople] = useState([
        {
            id: 1,
            name: 'Sarah Jenkins',
            handle: '@sarah_j',
            role: 'UI/UX Designer',
            bio: 'Building accessible design systems. Lover of typography and minimalist interfaces.',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
            category: 'designers',
            mutuals: 12,
            isFollowing: false
        },
        {
            id: 2,
            name: 'Marcus Vance',
            handle: '@mvance_code',
            role: 'Senior Frontend Engineer',
            bio: 'React, Next.js, and WebGL enthusiast. Pushing pixels and optimizing web performance.',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
            category: 'engineers',
            mutuals: 8,
            isFollowing: true
        },
        {
            id: 3,
            name: 'Amara Patel',
            handle: '@amara_tech',
            role: 'Product Designer',
            bio: 'Creating human-centered digital experiences. Currently exploring spatial UI.',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            category: 'designers',
            mutuals: 19,
            isFollowing: false
        },
        {
            id: 4,
            name: 'Liam O’Connor',
            handle: '@liam_dev',
            role: 'Full Stack Developer',
            bio: 'TypeScript all the way. Passionate about open-source and developer tooling.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
            category: 'engineers',
            mutuals: 5,
            isFollowing: false
        }
    ]);

    // Toggle Follow State
    const toggleFollow = (id) => {
        setPeople(
            people.map((person) =>
                person.id === id ? { ...person, isFollowing: !person.isFollowing } : person
            )
        );
    };

    // Filter People based on search query and tab filter
    const filteredPeople = people.filter((person) => {
        const matchesSearch =
            person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            person.role.toLowerCase().includes(searchQuery.toLowerCase());

        if (activeFilter === 'following') return matchesSearch && person.isFollowing;
        if (activeFilter !== 'all') return matchesSearch && person.category === activeFilter;

        return matchesSearch;
    });

    return (
        <div className={darkMode ? 'dark' : ''}>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">

                {/* APP CONTAINER */}
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 lg:gap-6 p-2 sm:p-4 lg:p-6 pb-20 md:pb-6">

                    {/* ================= 1. DESKTOP SIDEBAR ================= */}

                    <DesktopNav />
                    {/* ================= 2. MAIN SEARCH CONTENT ================= */}
                    <main className="flex-1 min-w-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-6">

                        {/* Header & Search Bar */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Find Creators & Friends</h1>
                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Discover designers, developers, and colleagues</p>
                                </div>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="md:hidden p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                                >
                                    {darkMode ? '☀️' : '🌙'}
                                </button>
                            </div>

                            {/* Dynamic Input Bar */}
                            <div className="relative">
                                <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by name, handle, or role..."
                                    className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-800/60 border-none rounded-2xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition"
                                />
                            </div>

                            {/* Filter Tabs */}
                            <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
                                {[
                                    { id: 'all', label: 'All Friends' },
                                    { id: 'designers', label: 'Designers' },
                                    { id: 'engineers', label: 'Engineers' },
                                    { id: 'following', label: 'Following' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveFilter(tab.id)}
                                        className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${activeFilter === tab.id
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                                            : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Results Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {filteredPeople.length > 0 ? (
                                filteredPeople.map((person) => (
                                    <div
                                        key={person.id}
                                        className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl flex flex-col justify-between space-y-3 hover:border-indigo-500/30 transition"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3">
                                                <img src={person.avatar} alt={person.name} className="w-12 h-12 rounded-full object-cover" />
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{person.name}</h3>
                                                    <p className="text-xs text-slate-400">{person.handle}</p>
                                                    <span className="inline-block mt-1 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-md text-[10px] font-semibold">
                                                        {person.role}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Follow / Unfollow Button */}
                                            <button
                                                onClick={() => toggleFollow(person.id)}
                                                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 ${person.isFollowing
                                                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400'
                                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20'
                                                    }`}
                                            >
                                                {person.isFollowing ? 'Following' : 'Follow'}
                                            </button>
                                        </div>

                                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                                            {person.bio}
                                        </p>

                                        <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center text-[11px] text-slate-400">
                                            <svg className="w-3.5 h-3.5 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                            </svg>
                                            {person.mutuals} mutual friends
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-slate-400 text-xs">
                                    No friends or creators found matching "{searchQuery}"
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