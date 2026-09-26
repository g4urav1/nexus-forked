import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Popup from "../Individual/PopUp";
import { PopUpContext, PopUpMsgContext } from "../context/context";

export default function Parent({ socket }) {
  const adminId = localStorage.getItem("adminId");

  const { setShowPopUp } = useContext(PopUpContext);
  const { setPopUpMsg } = useContext(PopUpMsgContext);

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

  return (
    <>
      <Popup />
      <Outlet />
    </>
  );
}
