import React, { useContext, useEffect, useState } from "react";
import MobileMenu from "../Individual/MobileMenu";
import DesktopNav from "../Individual/DesktopNav";
import { AdminContext } from "../context/context";
import { useNavigate, useParams } from "react-router-dom";

export default function ProfilePage() {
  const [darkMode] = useState(true);
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { Username } = useParams();
  const navigate = useNavigate();

  const { admin } = useContext(AdminContext);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:1111/getFollowers/${encodeURIComponent(Username)}`,
          {
            credentials: "include",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          setFollowers([]);
          return;
        }

        setFollowers(data.result);

        console.log("followers: ", followers);
      } catch (error) {
        console.error("Failed to get followers:", error);
        setFollowers([]);
      } finally {
        setLoading(false);
      }
    };

    if (Username) {
      getFollowers();
    }
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
                  Loading followers...
                </div>
              ) : followers.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {followers.map((follower) => (
                    <div
                      key={follower.id}
                      onClick={() => navigate(`/user/${follower.Follower}`)}
                      className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl flex items-center justify-between hover:border-indigo-500/30 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            follower?.FollowerPfp ||
                            "https://i.pinimg.com/736x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
                          }
                          alt={follower.Follower}
                          className="w-12 h-12 rounded-full object-cover"
                        />

                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {follower.Follower}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-sm">
                  No followers found.
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
