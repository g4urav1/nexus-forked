import { useState } from "react";
import DesktopNav from "../Individual/DesktopNav";
import MobileMenu from "../Individual/MobileMenu";
import Popup from "../Individual/Popup";
import { ArrowLeft, Image, Text } from "lucide-react";
import { BiLeftArrow } from "react-icons/bi";
import { useNavigate } from "react-router";

export default function EditPage() {
  const [darkMode, setDarkMode] = useState(true);

  const [Post, setPost] = useState(null);
  const [Caption, setCaption] = useState("");

  const handleSubmit = async () => {
    if (!Post) {
      return;
    }

    const formData = new FormData();
    formData.append("image", Post);
    formData.append("caption", Caption);

  

    try {
      const response = await fetch("http://localhost:1111/uploadmain", {
        credentials: "include",
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
      }
      alert(data.message)
      console.log(data);
    } catch (error) {
      alert("something went wrong");
      console.error(error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        {/* APP CONTAINER */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 lg:gap-6 p-2 sm:p-4 lg:p-6 pb-20 md:pb-6">
          {/* ================= 1. DESKTOP SIDEBAR ================= */}
          <DesktopNav />

          {/* ================= 2. MAIN PROFILE CONTENT ================= */}
          <main className=" relative flex-1 min-w-0 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm flex justify-center items-center">
            <div
              onClick={() => navigate(-1)}
              className="absolute z-10 top-10 left-10 cursor-pointer"
            >
              <ArrowLeft />
            </div>
            <form className="space-y-5 w-1/2 mx-auto">
              <div className="relative">
                <Image
                  size={18}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={(e) => setPost(e.target.files[0])}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 pl-11 pr-12 outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="relative">
                <Text
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                  type="text"
                  placeholder="Caption"
                  value={Caption}
                  onChange={(e) => {
                    setCaption(e.target.value);
                  }}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 pl-11 pr-12 outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  handleSubmit();
                }}
                className={`w-full rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 py-3 font-semibold text-white transition hover:scale-[1.02] active:scale-95`}
              >
                Post
              </button>
            </form>
          </main>

          {/* ================= 3. MOBILE BOTTOM NAVIGATION BAR ================= */}
          <MobileMenu />
        </div>
      </div>
    </div>
  );
}
