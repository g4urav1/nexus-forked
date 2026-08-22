import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DesktopNav from "../Individual/DesktopNav";

export default function Post() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await fetch(`http://localhost:1111/post/${id}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [id]);
  const handleLike = async (postId) => {
    try {
      const response = await fetch("http://localhost:1111/likes", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          PostId: postId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setPost((post) =>
        post._id === postId
          ? {
              ...post,
              Likes: data.likes,
              isLiked: data.isLiked,
            }
          : post,
      );
    } catch (error) {
      console.error(error);
    }
  };

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex gap-6 px-4 py-6">
        {/* ================= 1. SIDEBAR NAVIGATION ================= */}
        <DesktopNav />
        <article
          key={post._id}
          onClick={() => {
            console.log("CLICKED POST:", post);
            console.log("POST ID:", post._id);
            window.location.href = `/post/${post._id}`;
          }}
          className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 space-y-3 w-2/5"
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
            <div className="rounded-2xl  overflow-hidden border border-slate-100 dark:border-slate-800">
              <img
                src={post.Url}
                alt="Post asset"
                className=" object-contain"
              />
            </div>
          )}
          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center space-x-5">
              {/* Like */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(post._id);
                }}
                className={`flex items-center space-x-1.5 transition ${
                  post.isLiked
                    ? "text-rose-600 dark:text-rose-500"
                    : "hover:text-rose-600 dark:hover:text-rose-500"
                } font-bold`}
              >
                <Heart
                  size={14}
                  fill={post.isLiked ? "currentColor" : "none"}
                />
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
          </div>
        </article>
        <article className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 space-y-3 w-2/5"></article>
      </div>
    </div>
  );
}
