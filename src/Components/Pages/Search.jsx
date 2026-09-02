import React, { useState } from "react";
import MobileMenu from "../Individual/MobileMenu";
import DesktopNav from "../Individual/DesktopNav";

export default function SearchPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  // People List State
  const [people, setPeople] = useState([]);

const searchPeople = async (e) => {
  const query = e.target.value;

  setSearchQuery(query);

  if (query.trim() === "") {
    return setPeople([]);
  }

  const response = await fetch(
    `http://localhost:1111/searchUsers?searchQuery=${query}`
  );

  const data = await response.json();
  console.log(searchQuery);

  setPeople(data);
};

  // Toggle Follow State
  const toggleFollow = (_id) => {
    setPeople(
      people.map((person) =>
        person._id === _id
          ? { ...person, isFollowing: !person.isFollowing }
          : person,
      ),
    );
  };

  return (
    <div className={darkMode ? "dark" : ""}>
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
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Find Creators & Friends
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Discover designers, developers, and colleagues
                  </p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="md:hidden p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
              </div>

              {/* Dynamic Input Bar */}
              <div className="relative">
                <svg
                  className="w-5 h-5 absolute left-4 top-3.5 text-slate-400"
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
                  value={searchQuery}
                  onChange={searchPeople}
                  placeholder="Search by name, handle, or role..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-slate-800/60 border-none rounded-2xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition"
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {people.length > 0 ? (
                people.map((person) => (
                  <div
                    key={person._id}
                    className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl flex flex-col justify-between space-y-3 hover:border-indigo-500/30 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            person?.Pfp ||
                            "https://i.pinimg.com/736x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
                          }
                          alt={person.Username}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            {person.Username}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {person.Email}
                          </p>
                        </div>
                      </div>

                      {/* Follow / Unfollow Button */}
                      <button
                        onClick={() => toggleFollow(person.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 ${
                          person.isFollowing
                            ? "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20"
                        }`}
                      >
                        {person.isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {person.Bio}
                    </p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-slate-400 text-xs">
                  No friends or creators found.
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
