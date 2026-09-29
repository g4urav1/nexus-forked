import { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Popup from "../Individual/PopUp";
import CallNotification from "../Individual/CallNotification";
import {
  CallerContext,
  CallStatusContext,
  PopUpContext,
  PopUpMsgContext,
} from "../context/context";

export default function Parent({ socket }) {
  const adminId = localStorage.getItem("adminId");
  const location = useLocation();

  const { setShowPopUp } = useContext(PopUpContext);
  const { setPopUpMsg } = useContext(PopUpMsgContext);

  const { caller, setCaller } = useContext(CallerContext);
  const { callStatus, setCallStatus } = useContext(CallStatusContext);

  useEffect(() => {
    if (!socket || !adminId) return;

    const GetCallNotification = (data) => {
      const { callerId, Username } = data;

      if (callerId === adminId) return;

      setCaller(Username);
      setCallStatus("getCall");
    };

    socket.on("GetCall", GetCallNotification);

    return () => {
      socket.off("GetCall", GetCallNotification);
    };
  }, [socket, adminId, setCaller, setCallStatus]);

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
      {!isCallPage && <CallNotification />}
      <Popup />
      <Outlet />
    </>
  );
}
