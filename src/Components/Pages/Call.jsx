import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeOff } from "lucide-react";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  CallerContext,
  CallStatusContext,
  ReceiverContext,
} from "../context/context";

export default function CallPage({ socket }) {
  const [darkMode, setDarkMode] = useState(true);

  const adminId = localStorage.getItem("adminId");
  const { conversationId } = useParams();

  const { callStatus, setCallStatus } = useContext(CallStatusContext);

  const { caller, setCaller } = useContext(CallerContext);
  const { receiver, setReceiver } = useContext(ReceiverContext);

  const [duration, setDuration] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [OnSpeaker, setOnSpeaker] = useState(false);

  useEffect(() => {
    const getCallDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:1111/call/${conversationId}`,
          {
            method: "POST",
            credentials: "include",
          },
        );

        if (!response.ok) {
          console.error("Failed to get call details");
          return;
        }

        const data = await response.json();

        console.log("CALL DATA:", data);

        if (data.callerDetails) {
          setCaller(data.callerDetails);
        }

        if (data.receiverDetails) {
          setReceiver(data.receiverDetails);
        }
      } catch (error) {
        console.error("Failed to get call details:", error);
      }
    };

    if (conversationId) {
      getCallDetail();
    }
  }, [conversationId, setCaller, setReceiver]);

  const getCallUser = () => {
    if (!adminId) {
      return null;
    }

    if (!caller || !receiver) {
      return null;
    }

    const callerId = caller?._id?.toString();
    const receiverId = receiver?._id?.toString();
    const currentUserId = adminId?.toString();

    if (callerId === currentUserId) {
      return receiver;
    }

    if (receiverId === currentUserId) {
      return caller;
    }
  };

  useEffect(() => {
    if (callStatus !== "OnCall") {
      return;
    }

    const timer = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [callStatus]);

  const hours = Math.floor(duration / 3600);

  const minutes = Math.floor((duration % 3600) / 60);

  const seconds = duration % 60;

  const callUser = getCallUser();
  console.log("callUser:", callUser);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-[100dvh] w-full bg-slate-50 text-slate-800 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <div className="flex min-h-[100dvh] w-full items-center justify-center p-2 sm:p-4 lg:p-6">
          <main className="relative isolate flex h-[calc(100dvh-1rem)] w-full max-w-7xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800/80 dark:bg-slate-900 sm:h-[calc(100dvh-2rem)] sm:rounded-3xl lg:h-[calc(100dvh-3rem)]">
            {callUser?.Pfp && (
              <>
                <div
                  className="absolute inset-0 z-0 scale-110 bg-cover bg-center blur-2xl"
                  style={{
                    backgroundImage: `url(${callUser.Pfp})`,
                  }}
                />

                <div className="absolute inset-0 z-0 bg-black/60" />
              </>
            )}

            <div className="relative z-10 h-full w-full">
              {callStatus === "incoming" && (
                <div className="relative h-full w-full">
                  {callUser && (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-4 text-center">
                      <img
                        src={callUser.Pfp || ""}
                        alt={callUser.Username || "User"}
                        className="h-24 w-24 rounded-full object-cover ring-4 ring-slate-700 sm:h-28 sm:w-28 md:h-32 md:w-32"
                      />

                      <div>
                        <h2 className="text-lg font-semibold sm:text-xl">
                          {callUser.Username || "Unknown User"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                          Incoming call...
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center bg-gradient-to-t from-black/80 to-transparent px-4 pb-6 pt-16 sm:pb-8">
                    <div className="flex items-center space-x-10 rounded-full bg-black/50 px-4 py-3 backdrop-blur-xl sm:gap-4 sm:px-6 md:space-x-32">
                      <button
                        onClick={() => {
                          setCallStatus("rejected");
                        }}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 transition hover:bg-red-700 sm:h-14 sm:w-14"
                      >
                        <PhoneOff size={20} />
                      </button>

                      <button
                        onClick={() => {
                          setCallStatus("OnCall");
                        }}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 transition hover:bg-green-700 sm:h-14 sm:w-14"
                      >
                        <Phone size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {callStatus === "calling" && (
                <div className="relative h-full w-full">
                  {callUser && (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-4 text-center">
                      <img
                        src={callUser.Pfp || ""}
                        alt={callUser.Username || "User"}
                        className="h-24 w-24 rounded-full object-cover ring-4 ring-slate-700 sm:h-28 sm:w-28 md:h-32 md:w-32"
                      />

                      <div>
                        <h2 className="text-lg font-semibold sm:text-xl">
                          {callUser.Username || "Unknown User"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                          Calling...
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center bg-gradient-to-t from-black/80 to-transparent px-4 pb-6 pt-16 sm:pb-8">
                    <div className="flex items-center gap-3 rounded-full bg-black/50 px-4 py-3 backdrop-blur-xl sm:gap-4 sm:px-6">
                      {/* MIC */}

                      <button
                        onClick={() => setMicOn((prev) => !prev)}
                        className={`flex h-12 w-12 items-center justify-center rounded-full transition sm:h-14 sm:w-14 ${
                          micOn
                            ? "bg-white/10 hover:bg-white/20"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                      </button>

                      {/* SPEAKER */}

                      <button
                        onClick={() => setOnSpeaker((prev) => !prev)}
                        className={`flex h-12 w-12 items-center justify-center rounded-full transition sm:h-14 sm:w-14 ${
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

                      {/* END */}

                      <button
                        onClick={() => setCallStatus("ended")}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 transition hover:bg-red-700 sm:h-14 sm:w-14"
                      >
                        <PhoneOff size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {callStatus === "OnCall" && (
                <div className="relative h-full w-full">
                  {callUser && (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-4 text-center">
                      <img
                        src={callUser.Pfp || ""}
                        alt={callUser.Username || "User"}
                        className="h-24 w-24 rounded-full object-cover ring-4 ring-slate-700 sm:h-28 sm:w-28 md:h-32 md:w-32"
                      />

                      <div>
                        <h2 className="text-lg font-semibold sm:text-xl">
                          {callUser.Username || "Unknown User"}
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
                  )}

                  <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center bg-gradient-to-t from-black/80 to-transparent px-4 pb-6 pt-16 sm:pb-8">
                    <div className="flex items-center gap-3 rounded-full bg-black/50 px-4 py-3 backdrop-blur-xl sm:gap-4 sm:px-6">
                      <button
                        onClick={() => setMicOn((prev) => !prev)}
                        className={`flex h-12 w-12 items-center justify-center rounded-full transition sm:h-14 sm:w-14 ${
                          micOn
                            ? "bg-white/10 hover:bg-white/20"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                      >
                        {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                      </button>

                      <button
                        onClick={() => setOnSpeaker((prev) => !prev)}
                        className={`flex h-12 w-12 items-center justify-center rounded-full transition sm:h-14 sm:w-14 ${
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
                        className="flex h-12 w-14 items-center justify-center rounded-full bg-red-500 transition hover:bg-red-600 sm:h-14 sm:w-16"
                      >
                        <PhoneOff size={21} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {callStatus === "ended" && (
                <div className="absolute inset-0 bg-black/75">
                  {callUser && (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-4 text-center">
                      <img
                        src={callUser.Pfp || ""}
                        alt={callUser.Username || "User"}
                        className="h-24 w-24 rounded-full object-cover ring-4 ring-slate-700 sm:h-28 sm:w-28 md:h-32 md:w-32"
                      />

                      <div>
                        <h2 className="text-lg font-semibold sm:text-xl">
                          {callUser.Username || "Unknown User"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                          Call ended
                        </p>

                        <div className="mt-1 text-sm text-slate-100">
                          <p>
                            {hours === 0 && minutes === 0 && seconds === 0
                              ? "No Answer"
                              : `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setDuration(0);
                          setCallStatus("calling");
                        }}
                        className="rounded-xl bg-indigo-600 p-2 text-white shadow-md shadow-indigo-500/20 transition hover:bg-indigo-700 active:scale-95 sm:p-2.5"
                      >
                        Call Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
