import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CallerContext, CallStatusContext } from "../context/context";

export default function CallNotification({ socket }) {
  const [darkMode, setDarkMode] = useState(true);

  const navigate = useNavigate();

  const adminId = localStorage.getItem("adminId");

  
    const {caller, setCaller} = useContext(CallerContext);

  const [conversationId, setConversationId] = useState();

  const { callStatus, setCallStatus } = useContext(CallStatusContext);



  const [duration, setDuration] = useState(0);

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

  return (
    <div className={darkMode ? "dark" : ""}>
      {callStatus != "" && (
        <div className="absolute z-50 w-full ">
          <div
            // onClick={() => {
            //   navigate(`/call/${conversationId}`);
            // }}
            className="md:w-1/5 w-full rounded-full mt-3 mx-auto
  bg-gradient-to-tr from-indigo-600 to-violet-500
  shadow-[0_10px_30px_rgba(99,102,241,0.35)]
  border border-white/20
  hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(99,102,241,0.45)]
  transition-all duration-300"
          >
            <main>
              {callStatus === "getCall" && (
                <div className="w-full">
                  {caller && (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                      <div className="text-center flex justify-center gap-2 items-center py-3">
                        <p className="font-semibold">
                          {caller?.Username || "Unknown User"}
                        </p>
                        •
                        <p className=" text-sm text-slate-400">Incoming Call</p>
                      </div>
                    </div>
                  )}{" "}
                </div>
              )}
              {callStatus === "calling" && (
                <div className="w-full">
                  {caller && (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                      <div className="text-center flex justify-center gap-2 items-center py-3">
                        <p className="font-semibold">
                          {caller?.Username || "Unknown User"}
                        </p>
                        •<p className=" text-sm text-slate-400">Calling...</p>
                      </div>
                    </div>
                  )}{" "}
                </div>
              )}
              {callStatus === "OnCall" && (
                <div className="w-full">
                  {caller && (
                    <div className="w-full">
                      <div className="text-center flex justify-center gap-2 items-center py-3">
                        <p className="font-semibold">
                          {caller?.Username || "Unknown User"}
                        </p>
                        •
                        <p className="text-sm text-slate-400">
                          {String(hours).padStart(2, "0")}:
                          {String(minutes).padStart(2, "0")}:
                          {String(seconds).padStart(2, "0")}
                        </p>
                      </div>
                    </div>
                  )}{" "}
                </div>
              )}
              {callStatus === "ended" && (
                <div>
                  {caller && (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                      <div className="text-center flex justify-center gap-2 items-center py-3">
                        <p className="font-semibold">
                          {caller?.Username || "Unknown User"}
                        </p>
                        •<p className="text-sm text-slate-100">Ended</p>
                      </div>
                    </div>
                  )}{" "}
                </div>
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
