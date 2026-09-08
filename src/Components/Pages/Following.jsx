import React, { useContext, useEffect, useState } from "react";
import MobileMenu from "../Individual/MobileMenu";
import DesktopNav from "../Individual/DesktopNav";
import { AdminContext } from "../context/context";
import { useNavigate, useParams } from "react-router-dom";

export default function ProfilePage() {
  const [darkMode] = useState(true);
  const [following, setfollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  const { Username } = useParams();
  const navigate = useNavigate();

  const { admin, setAdmin } = useContext(AdminContext);

 const handleFollow = async (userId, e) => {
  e.stopPropagation();

  try {
    const response = await fetch("http://localhost:1111/follow", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserId: userId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    setfollowing((prev) =>
      prev.map((user) =>
        user.id === userId
          ? {
              ...user,
              isFollowing: data.isFollowing,
            }
          : user
      )
    );

    setAdmin({
      ...admin,
      isFollowing: data.isFollowing,
      Followers: data.Followers,
      FollowersCount: data.Followers.length,
    });
  } catch (error) {
    console.error("Follow error:", error);
  }
};


 
    const getfollowing = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:1111/getFollowing/${encodeURIComponent(Username)}`,
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          setfollowing([]);
          return;
        }

        setfollowing(data.result);

        console.log("following: ", following);
      } catch (error) {
        console.error("Failed to get following:", error);
        setfollowing([]);
      } finally {
        setLoading(false);
      }
    };

    
    useEffect(() => {
  getfollowing();
}, [Username]);

  

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 lg:gap-6 p-2 sm:p-4 lg:p-6 pb-20 md:pb-6">
          <DesktopNav />

          <main className="flex-1 min-w-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
            <div className="p-4">
              {loading ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  Loading following...
                </div>
              ) : following.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {following.map((followingIds) => (
                    <div
                      key={followingIds.id}
                      onClick={() =>
                        navigate(`/user/${followingIds.Following}`)
                      }
                      className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl flex items-center justify-between hover:border-indigo-500/30 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            followingIds?.FollowingPfp ||
                            "https://i.pinimg.com/736x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
                          }
                          alt={followingIds.Following}
                          className="w-12 h-12 rounded-full object-cover"
                        />

                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {followingIds.Following}
                        </h3>
                      </div>
                      <button
                        onClick={(e) => {
                          handleFollow(followingIds.id,e);
                        }}
                        className={`px-4 py-2 sm:px-5 sm:py-2.5 font-semibold rounded-2xl text-xs sm:text-sm transition shadow-md active:scale-95  ${
                          followingIds.isFollowing
                            ? "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20"
                        }`}
                      >
                        {followingIds.isFollowing ? "UnFollow" : "Follow"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-sm">
                  No following found.
                </div>
              )}
            </div>
          </main>

          <MobileMenu />
        </div>
      </div>
    </div>
  );
}
