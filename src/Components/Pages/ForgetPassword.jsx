import {
  FaInstagram as Instagram,
  FaFacebookF as Facebook,
  FaApple as Apple,
} from "react-icons/fa";
import { Mail, Lock, Eye, EyeOff, Key } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/context";

export default function ForgetPasswordPage() {
  const [btnDisable, setBtnDisable] = useState(true);
  const [codeDisable, setCodeDisable] = useState(false);

  const [UserName, setUserName] = useState("");
  const [Code, setCode] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!UserName) {
      setCodeDisable(true);
    } else {
      setCodeDisable(false);
    }
  }, [UserName]);
  useEffect(() => {
    if (!UserName || !Code) {
      setBtnDisable(true);
    } else {
      setBtnDisable(false);
    }
  }, [UserName]);

  const getCode = async () => {
    try {
      const response = await fetch("http://localhost:1111/getCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: UserName,
        
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setBtnDisable(false)
      
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-violet-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-black flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-900">
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 p-12 text-white relative overflow-hidden">
          <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <Instagram size={50} />
            <h1 className="text-5xl font-bold mt-6">
              Connect.
              <br />
              Share.
              <br />
              Inspire.
            </h1>

            <p className="mt-6 text-white/80 text-lg leading-relaxed">
              Discover amazing creators and connect with your friends in one
              beautiful place.
            </p>
          </div>

          <div className="relative flex gap-3">
            <img
              src="https://i.pravatar.cc/60?img=1"
              className="rounded-full border-4 border-white"
            />
            <img
              src="https://i.pravatar.cc/60?img=2"
              className="rounded-full border-4 border-white -ml-4"
            />
            <img
              src="https://i.pravatar.cc/60?img=3"
              className="rounded-full border-4 border-white -ml-4"
            />
            <span className="ml-4 text-white/80 self-center">
              Join 50k+ creators
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-14">
          <div className="text-center mb-10">
            <Instagram className="mx-auto text-pink-500" size={42} />

            <h2 className="text-3xl font-bold mt-4">Forgot Your Password?</h2>

            <p className="text-gray-500 mt-2">Lets get back in.</p>
          </div>

          <form className="space-y-5">
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                placeholder="Username"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:bg-zinc-800 dark:border-zinc-700"
              />
            </div>

            <div className="relative">
              <Key
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
              disabled={codeDisable}
              title={codeDisable?"get code first": ""}
                type="text"
                placeholder="Code"
                value={Code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 pl-11 pr-12 outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            {/* <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                disabled={PasswordDisable}
                title={PasswordDisable ? "enter code first" : ""}
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 pl-11 pr-12 outline-none focus:ring-2 focus:ring-pink-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div> */}

            {btnDisable ? (
              <button
                type="button"
                onClick={() => {
                  getCode();
                }}
                className={`w-full rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 py-3 font-semibold text-white transition hover:scale-[1.02] active:scale-95 cursor-pointer`}
              >
                Get Code
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  // handleLogin();
                }}
                className={`w-full rounded-xl bg-gradient-to-r from-pink-500 to-violet-600 py-3 font-semibold text-white transition hover:scale-[1.02] active:scale-95 cursor-pointer`}
              >
                verify
              </button>
            )}
          </form>

          <div className="flex items-center my-8">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <p className="mt-8 text-center text-gray-500">
            Don't have an account?
            <a
              href="signup"
              className="ml-2 font-semibold text-pink-500 hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
