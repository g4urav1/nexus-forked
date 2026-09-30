import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Popup from "../Individual/PopUp";
import CallNotification from "../Individual/CallNotification";
import callSound from "../../assets/instagram_caller_tune.mp3";

import {
  CallerContext,
  CallStatusContext,
  PopUpContext,
  PopUpMsgContext,
} from "../context/context";

export default function Parent({ socket }) {
  const adminId = localStorage.getItem("adminId");
  const location = useLocation();

  const navigate = useNavigate();

  const { setShowPopUp } = useContext(PopUpContext);
  const { setPopUpMsg } = useContext(PopUpMsgContext);

  const { caller, setCaller } = useContext(CallerContext);

  const { callStatus, setCallStatus } = useContext(CallStatusContext);

  useEffect(() => {
    if (callStatus == "rejected") {
      navigate(-1);
      setCaller(null);
    }
  }, [callStatus]);

  useEffect(() => {
    const audio = new Audio(callSound);

    if (callStatus === "calling" || callStatus === "getCall") {
      audio.loop = true;

      audio.play().catch((err) => {
        console.log("Call audio blocked:", err);
      });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [callStatus]);

  useEffect(() => {
    if (!socket || !adminId) return;

    const GetCallNotification = (data) => {
      console.log("GetCall received:", data);

      const { callerId, Username, pfp, conversationId } = data;

      if (callerId === adminId) {
        return;
      }

      console.log("Incoming caller:", Username);

      setCaller({
        Username: Username || "Unknown User",
        pfp: pfp || "",
        callerId,
        conversationId,
      });

      setCallStatus("getCall");
    };

    socket.on("GetCall", GetCallNotification);

    return () => {
      socket.off("GetCall", GetCallNotification);
    };
  }, [socket, adminId, setCaller, setCallStatus]);

  useEffect(() => {
    console.log("CALLER STATE:", caller);
  }, [caller]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (data) => {
      const newMessage = data.message;
      const Username = data.Username;

      if (newMessage.user_id === adminId) return;

      setPopUpMsg(`You have a new message from ${Username}`);
      setShowPopUp(true);

      setTimeout(() => {
        setShowPopUp(false);
      }, 5000);
    };

    socket.on("RefreshMsg", handleNewMessage);

    return () => {
      socket.off("RefreshMsg", handleNewMessage);
    };
  }, [socket, adminId, setPopUpMsg, setShowPopUp]);

  const isCallPage = location.pathname.startsWith("/call");

  return (
    <>
      {!isCallPage && <CallNotification socket={socket} />}
      <Popup />
      <Outlet />
    </>
  );
}
