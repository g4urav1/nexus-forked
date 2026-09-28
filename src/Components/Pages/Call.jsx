import { Mic, MicOff, PhoneOff, Volume2, VolumeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CallPage({ socket }) {
  const [darkMode, setDarkMode] = useState(true);

  const adminId = localStorage.getItem("adminId");
  const { conversationId } = useParams();

  const [receiver, setReceiver] = useState();

  useEffect(() => {
    const getCallDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:1111/getCallDetail/${conversationId}`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          console.error("Failed to get conversations");
          return;
        }

        const data = await response.json();

        setReceiver(data);

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    getCallDetail();
  }, [conversationId]);

  const getCallUser = () => {
    return receiver?.participants?.[0];
  };

  const [duration, setDuration] = useState(0);

  const [callStatus, setCallStatus] = useState("OnCall");

  useEffect(() => {
    if (callStatus !== "OnCall") return;

    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [callStatus]);

  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const [micOn, setMicOn] = useState(true);
  const [OnSpeaker, setOnSpeaker] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-center items-center flex-col md:flex-row gap-4 lg:gap-6 p-2 sm:p-4 lg:p-6 h-screen md:px-10 lg:px-20">
          <main className="flex-1 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm flex h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)] lg:h-[calc(100vh-7rem)]  w-full ">
            {callStatus === "calling" && (
              <div className="w-full">
                {getCallUser() && (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <img
                      src={getCallUser()?.pfp}
                      alt={getCallUser()?.Username}
                      className="h-28 w-28 rounded-full object-cover ring-4 ring-slate-700"
                    />

                    <div className="text-center">
                      <h2 className="text-xl font-semibold">
                        {getCallUser()?.Username || "Unknown User"}
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">Calling...</p>
                    </div>
                  </div>
                )}{" "}
                <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center bg-gradient-to-t from-black/80 to-transparent px-4 pb-8 pt-16">
                  <div className="flex items-center gap-3 rounded-full bg-black/50 px-4 py-3 backdrop-blur-xl sm:gap-4 sm:px-6">
                    <button
                      onClick={() => setMicOn((prev) => !prev)}
                      className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                        micOn
                          ? "bg-white/10 hover:bg-white/20"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                    </button>

                    <button
                      onClick={() => setOnSpeaker((prev) => !prev)}
                      className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                        OnSpeaker
                          ? "bg-white/10 hover:bg-white/20"
                          : "bg-white/20 hover:bg-white/40"
                      }`}
                    >
                      {OnSpeaker ? (
                        <Volume2 size={20} />
                      ) : (
                        <VolumeOff size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {callStatus === "OnCall" && (
              <div className="w-full">
                {getCallUser() && (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <img
                      src={getCallUser()?.pfp}
                      alt={getCallUser()?.Username}
                      className="h-28 w-28 rounded-full object-cover ring-4 ring-slate-700"
                    />

                    <div className="text-center">
                      <h2 className="text-xl font-semibold">
                        {getCallUser()?.Username || "Unknown User"}
                      </h2>

                      <div className="mt-1 text-sm text-slate-400">
                        <p>
                          {String(hours).padStart(2, "0")}:
                          {String(minutes).padStart(2, "0")}:
                          {String(seconds).padStart(2, "0")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}{" "}
                <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center bg-gradient-to-t from-black/80 to-transparent px-4 pb-8 pt-16">
                  <div className="flex items-center gap-3 rounded-full bg-black/50 px-4 py-3 backdrop-blur-xl sm:gap-4 sm:px-6">
                    <button
                      onClick={() => setMicOn((prev) => !prev)}
                      className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                        micOn
                          ? "bg-white/10 hover:bg-white/20"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                    </button>

                    <button
                      onClick={() => setOnSpeaker((prev) => !prev)}
                      className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
                        OnSpeaker
                          ? "bg-white/10 hover:bg-white/20"
                          : "bg-white/20 hover:bg-white/40"
                      }`}
                    >
                      {OnSpeaker ? (
                        <Volume2 size={20} />
                      ) : (
                        <VolumeOff size={20} />
                      )}
                    </button>

                    <button
                      onClick={() => setCallStatus("ended")}
                      className="flex h-12 w-14 items-center justify-center rounded-full bg-red-500 transition hover:bg-red-600"
                    >
                      <PhoneOff size={21} />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {callStatus === "ended" && (
              <div className="w-full absolute inset-0 bg-black/75">
                {getCallUser() && (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <img
                      src={getCallUser()?.pfp}
                      alt={getCallUser()?.Username}
                      className="h-28 w-28 rounded-full object-cover ring-4 ring-slate-700"
                    />

                    <div className="text-center">
                      <h2 className="text-xl font-semibold">
                        {getCallUser()?.Username || "Unknown User"}
                      </h2>
                      <p className="mt-1 text-sm text-slate-400">call ended</p>{" "}
                      <div className="mt-1 text-sm text-slate-100">
                        <p>
                          {String(hours).padStart(2, "0")}:
                          {String(minutes).padStart(2, "0")}:
                          {String(seconds).padStart(2, "0")}
                        </p>
                      </div>
                    </div>

                      <button
                      onClick={()=>{
                        setCallStatus("calling")
                      }}
                      className="p-2 sm:p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition shadow-md shadow-indigo-500/20 active:scale-95"
                    >Call Again</button>
                  </div>
                )}{" "}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
