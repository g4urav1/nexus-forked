import { Heart, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DesktopNav from "../Individual/DesktopNav";
import MobileMenu from "../Individual/MobileMenu";

export default function Post() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  const defaultPfp =
    "https://i.pinimg.com/736x/02/59/54/0259543779b1c2db9ba9d62d47e11880.jpg";

  const getPost = async () => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:1111/post/${id}`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to fetch post");

      setPost(data);
    } catch (error) {
      console.error("GET POST ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const getComments = async () => {
    try {
      setCommentsLoading(true);

      const response = await fetch(`http://localhost:1111/getComments/${id}`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to fetch comments");

      setComments(data);
    } catch (error) {
      console.error("GET COMMENTS ERROR:", error);
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    getPost();
    getComments();
  }, [id]);

  const handleLike = async (postId) => {
    try {
      const response = await fetch("http://localhost:1111/likes", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ PostId: postId }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to like post");
        return;
      }

      setPost((currentPost) =>
        currentPost?._id === postId
          ? { ...currentPost, Likes: data.likes, isLiked: data.isLiked }
          : currentPost,
      );
    } catch (error) {
      console.error("LIKE ERROR:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    const trimmedComment = commentText.trim();
    if (!trimmedComment) return;

    try {
      setCommentLoading(true);

      const response = await fetch("http://localhost:1111/addComments", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          PostId: id,
          Comment: trimmedComment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add comment");
        return;
      }

      setComments((prev) => [
        ...prev,
        {
          id: data.id,
          Commenter: data.Commenter,
          CommenterPfp: data.CommenterPfp,
          CommentText: data.Comment,
          CommentedAt: data.CommentedAt,
        },
      ]);

      setCommentText("");

      setPost((currentPost) =>
        currentPost
          ? {
              ...currentPost,
              CommentCount: data.CommentCount,
              comments: data.CommentCount,
            }
          : currentPost,
      );
    } catch (error) {
      console.error("ADD COMMENT ERROR:", error);
    } finally {
      setCommentLoading(false);
    }
  };

  const formatPostTime = (date) => {
    if (!date) return "";

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
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex items-center justify-center">
        Post not found
      </div>
    );
  }

  const commentCount = post.CommentCount ?? post.comments ?? comments.length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 pb-10 sm:pb-0">
      <div className="max-w-7xl mx-auto flex gap-4 lg:gap-6 px-3 sm:px-4 py-4 sm:py-6">
        {/* ================= SIDEBAR ================= */}
        <DesktopNav />

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 min-w-0 w-full">
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* ================= POST ================= */}
            <article
              key={post._id}
              className="min-w-0 w-full bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-all duration-200 space-y-3 h-fit"
            >
              {/* Author */}
              <div className="flex items-center justify-between">
                <div
                  onClick={() =>
                    (window.location.href = `/user/${post.Username}`)
                  }
                  className="flex items-center space-x-2.5 sm:space-x-3 min-w-0"
                >
                  <img
                    src={post.Pfp || defaultPfp}
                    alt={post.Username}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                  />

                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                      {post.Username}
                    </h3>

                    <span className="block text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 truncate">
                      {post.Username} • {formatPostTime(post.UploadedAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Caption */}
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed break-words">
                {post.Caption}
              </p>

              {/* Image */}
              {post.Url && (
                <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                  <img
                    src={post.Url}
                    alt="Post asset"
                    className="w-full h-auto max-h-[600px] object-contain"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <div className="flex items-center space-x-4 sm:space-x-5">
                  {/* Like */}
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`flex items-center space-x-1.5 transition font-bold ${
                      post.isLiked
                        ? "text-rose-600 dark:text-rose-500"
                        : "hover:text-rose-600 dark:hover:text-rose-500"
                    }`}
                  >
                    <Heart
                      size={14}
                      fill={post.isLiked ? "currentColor" : "none"}
                    />

                    <span>{post.Likes || 0}</span>
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
                        d="M8 12h.01 M12 12h.01 M16 12h.01 M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>

                    <span>{commentCount}</span>
                  </button>
                </div>
              </div>
            </article>

            {/* ================= COMMENTS ================= */}
            <article className="min-w-0 w-full relative bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)]">
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                  Comments
                </h2>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {comments.length}{" "}
                  {comments.length === 1 ? "comment" : "comments"}
                </p>
              </div>

              {/* Comments List */}
              <div className="flex-1 min-h-0 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                {/* Loading */}
                {commentsLoading && (
                  <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    Loading comments...
                  </div>
                )}

                {/* Empty */}
                {!commentsLoading && comments.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="font-medium text-slate-700 dark:text-slate-300">
                      No comments yet
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Be the first to comment.
                    </p>
                  </div>
                )}

                {/* Comments */}
                {!commentsLoading && comments.length > 0 && (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-3.5 sm:p-4 flex gap-2.5 sm:gap-3"
                      >
                        {/* Avatar */}
                        <img
                          src={comment.CommenterPfp || defaultPfp}
                          alt={comment.Commenter}
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover flex-shrink-0"
                        />

                        {/* Comment Content */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate max-w-full">
                              {comment.Commenter}
                            </h3>

                            <span className="text-[10px] sm:text-[11px] text-slate-400 whitespace-nowrap">
                              {formatPostTime(comment.CommentedAt)}
                            </span>
                          </div>

                          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 break-words whitespace-pre-wrap">
                            {comment.CommentText}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Comment */}
              <form
                onSubmit={handleAddComment}
                className="shrink-0 p-3 sm:p-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900"
              >
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  maxLength={500}
                  disabled={commentLoading}
                  className="min-w-0 flex-1 px-3 sm:px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-50"
                />

                <button
                  type="submit"
                  disabled={!commentText.trim() || commentLoading}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-indigo-600 text-white transition hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send size={15} />
                </button>
              </form>
            </article>
          </div>
        </main>

        {/* ================= MOBILE MENU ================= */}
        <MobileMenu />
      </div>
    </div>
  );
}
