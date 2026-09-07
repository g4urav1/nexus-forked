import { useContext, useEffect, useState } from "react";
import DesktopNav from "../Individual/DesktopNav";
import MobileMenu from "../Individual/MobileMenu";
import { UserContext } from "../context/context";

export default function NotificationPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notification, setNotification] = useState([]);

  const getNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:1111/notifications`, {
        credentials: "include",
      });
      const data = await response.json();

      setNotification(data);
    } catch (error) {
      console.log(error);
      alert(data.message);
    }
  };

  useEffect(() => {
    getNotifications();
  }, [notification]);

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

  const { user } = useContext(UserContext);
  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* APP CONTAINER */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 lg:gap-6 p-2 sm:p-4 lg:p-6 pb-20 md:pb-6">
          {/* ================= 1. DESKTOP SIDEBAR ================= */}

          <DesktopNav />
          {/* ================= 2. MAIN Notification CONTENT ================= */}

          <main className="flex-1 min-w-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Notifications
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  activities on your account
                </p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="md:hidden p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
            </div>
            {/* ================= Notificationss================= */}

            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {notification.length > 0 ? (
                notification.map((notify) => (
                  <div
                    key={notify._id}
                    onClick={() =>
                      (window.location.href = `/user/${notify.NotificationBy}`)
                    }
                    className="
          w-full
          p-2 sm:p-3
          bg-slate-50/70 dark:bg-slate-800/40
          border border-slate-200/80 dark:border-slate-800/80
          rounded-xl sm:rounded-2xl
          flex flex-col
          gap-3
          hover:border-indigo-500/30
          transition
          cursor-pointer
          overflow-hidden
        "
                  >
                    <div className="flex items-start justify-between gap-3">
                      {/* User + Notification */}
                      <div className="flex items-start gap-2.5 sm:gap-3 min-w-0 flex-1">
                        <img
                          src={
                            notify?.byPfp ||
                            "https://i.pinimg.com/736x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg"
                          }
                          alt={notify.NotificationBy}
                          className="
                w-9 h-9
                sm:w-11 sm:h-11
                md:w-12 md:h-12
                rounded-full
                object-cover
                shrink-0
              "
                        />

                        <div className="min-w-0 flex-1">
                          <h3
                            className="
                 
                  text-sm sm:text-base
                  text-slate-900 dark:text-white/70
                  leading-snug
                  break-words
                  line-clamp-2
                "
                          >
                            <span className="font-bold text-white">
                              {notify.NotificationBy}
                            </span>{" "}
                            {notify.NotificationMessage}
                          </h3>

                          <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
                            {formatPostTime(notify.sentAt)}
                          </p>
                        </div>
                      </div>

                      {/* Action / Post Image */}
                      <div className="shrink-0">
                        {notify?.postUrl ? (
                          <img
                            src={notify.postUrl}
                            alt="Post"
                            className="
                  w-14 h-14
                  sm:w-16 sm:h-16
                  md:w-20 md:h-20
                  rounded-lg sm:rounded-xl
                  object-cover
                "
                          />
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFollow(notify.id);
                            }}
                            className={`
                  px-2.5 sm:px-3.5
                  py-1.5
                  rounded-lg sm:rounded-xl
                  text-[10px] sm:text-xs
                  font-semibold
                  whitespace-nowrap
                  transition
                  active:scale-95
                  ${
                    notify.isFollowing
                      ? "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20"
                  }
                `}
                          >
                            {notify.isFollowing ? "Following" : "Follow"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-slate-400 text-xs">
                  No Notifications yet.
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
