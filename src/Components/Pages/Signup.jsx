import { Camera, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!Username || !Email || !Password || !ConfirmPassword) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [Username, Email, Password, ConfirmPassword]);
  useEffect(() => {
    if (ConfirmPassword !== "" && Password !== ConfirmPassword) {
      setError(true);
      setDisable(true);
    } else {
      setError(false);
      setDisable(false);
    }
  }, [Password, ConfirmPassword]);

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:1111/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Username: Username,
          Email: Email,
          Password: Password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        alert("server error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-violet-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-black px-4 py-8">
      <div className="w-full max-w-md rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-2xl border border-white/30 dark:border-zinc-800 p-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
            <Camera className="text-white" size={30} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-zinc-900 dark:text-white">
            Create Account
          </h1>

          <p className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Join thousands of creators and start sharing today.
          </p>
        </div>

        {/* Avatar */}
        <div className="mt-8 flex justify-center">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Avatar"
              className="h-24 w-24 rounded-full object-cover ring-4 ring-pink-500/20"
            />

            <button className="absolute bottom-0 right-0 h-9 w-9 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-lg text-white hover:scale-105 transition">
              <Camera size={18} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-4">
          <div className="relative">
            <User
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="text"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />
            <input
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
          </div>

          {/* Confirm Password */}
          <div className="relative mt-4">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type={showConfirmPassword ? "text" : "password"}
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 py-3 pl-11 pr-12 outline-none focus:ring-2 focus:ring-pink-500"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {error && (
              <p className="text-red-600 absolute text-sm left-2">
                password don't match
              </p>
            )}
          </div>
          <label className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400 pt-4">
            <input type="checkbox" className="mt-1 accent-pink-500" />
            <span>
              I agree to the{" "}
              <button type="button" className="text-pink-500 hover:underline">
                Terms
              </button>{" "}
              and{" "}
              <button type="button" className="text-pink-500 hover:underline">
                Privacy Policy
              </button>
            </span>
          </label>

          <button
            disabled={disable}
            onClick={() => handleSignup()}
            className={`w-full  rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 py-3 font-semibold text-white shadow-lg hover:opacity-90 transition  ${disable ? "cursor-not-allowed " : "cursor-pointer"} `}
          >
            Create Account
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-xs text-zinc-400 uppercase">or</span>
          <div className="h-px flex-1 bg-zinc-300 dark:bg-zinc-700" />
        </div>

        <button className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 py-3 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
          Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Already have an account?
          <button className="ml-2 font-semibold text-pink-500 hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
