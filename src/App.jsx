import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPages from "./Components/Pages/Auth";
import FeedPage from "./Components/Pages/Home";
import MessagesPage from "./Components/Pages/Messages";
import InboxPage from "./Components/Pages/Inbox";
import ProfilePage from "./Components/Pages/Profile";
import SearchPage from "./Components/Pages/Search";
import LoginPage from "./Components/Pages/Login";
import ForgetPasswordPage from "./Components/Pages/ForgetPassword";
import ResetPasswordPage from "./Components/Pages/ResetPassword";
import SignupPage from "./Components/Pages/Signup";
import EditPage from "./Components/Pages/Edit";
import CreatePostPage from "./Components/Pages/CreatePost";
import Post from "./Components/Pages/Post";
import { useEffect, useState } from "react";

import { Peer } from "peerjs";

import {
  AdminContext,
  UserPostContext,
  PopUpContext,
  PopUpMsgContext,
  CallStatusContext,
  CallerContext,
  ReceiverContext,
  CurrentCallContext,
  PeerContext,
} from "./Components/context/context";
import NotificationPage from "./Components/Pages/Notification";
import FollowersPage from "./Components/Pages/Followers";
import FollowingPage from "./Components/Pages/Following";
import { io } from "socket.io-client";
import Parent from "./Components/Pages/Parent";
import CallPage from "./Components/Pages/Call";

export default function App() {
  const [admin, setAdmin] = useState("");
  const [UserPosts, setUserPosts] = useState([]);
  const [ShowPopUp, setShowPopUp] = useState(false);
  const [popUpMsg, setPopUpMsg] = useState("");
  const [callStatus, setCallStatus] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [peer, setPeer] = useState(null);

  const adminId = localStorage.getItem("adminId");

  const [caller, setCaller] = useState();
  const [receiver, setReceiver] = useState();
  const [currentCall, setCurrentCall] = useState();
  const [socket, setSocket] = useState(null);

  const [peerId, setPeerId] = useState("");
  const [remotePeerId, setRemotePeerId] = useState("");
  const [remoteStream, setRemoteStream] = useState(null);

  useEffect(() => {
    (() => {
      const socket = io("http://localhost:1111", { withCredentials: true });
      setSocket(socket);
      // socket.on("welcome", (data) => alert(data));
      socket.on("randomRouteHit", (data) => console.log(data));
    })();
  }, []);

  useEffect(() => {
    console.log("#################################");

    console.log("Stream updated: ", localStream);

    console.log("##################################");
  }, [localStream]);

  useEffect(() => {
    const peer = new Peer();
    setPeer(peer);

    peer.on("open", (id) => {
      console.log("Peer id: ", id);
      setPeerId(id);

      (async () => {
        try {
          let response = await fetch("http://localhost:1111/connect/peer", {
            body: JSON.stringify({ peerId: id }),
            method: "POST",
            headers: { "content-type": "application/json" },
            credentials: "include",
          });

          if (!response.ok) throw new Error("Something went wrong!");

          console.log("Peer connected!");
        } catch (error) {
          console.log(error);
        }
      })();
    });

    peer.on("call", (call) => {
      console.log("$$$$$$$$$$$$$$$$$44");
      console.log("incoming call");
      console.log("$$$$$$$$$$$$$$$$$$$$$$");
      call.answer(localStream);
      call.on("stream", (remoteStream) => {
        console.log("Receiving remote stream: ", remoteStream);
        setRemoteStream(remoteStream);
      });
    });

    return () => {
      peer.destroy();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleSendPeer = (data) => {
      if (String(adminId) === String(data.senderId)) return;
      console.log("Received remote peer:", data.peer);
      console.log("Making call", localStream, data.peer);
      if (localStream) {
        const call = peer.call(data.peer, localStream);

        call.on("stream", () => {
          console.log("-------------------------------------");
          console.log("remote stream received!");
          console.log("---------------------------------");
        });
      }
      setRemotePeerId(data.peer);
    };

    socket.on("sendPeer", handleSendPeer);
    return () => socket.off("sendPeer", handleSendPeer);
  }, [socket, adminId, localStream]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Parent socket={socket} />,
      children: [
        { path: "/", element: <FeedPage socket={socket} /> },
        { path: "/auth", element: <AuthPages /> },
        { path: "/inbox", element: <InboxPage /> },
        {
          path: "/inbox/:conversationId",
          element: <MessagesPage socket={socket} />,
        },
        {
          path: "/call/:conversationId",
          element: <CallPage socket={socket} />,
        },
        { path: "/User/:Username", element: <ProfilePage /> },
        { path: "/search", element: <SearchPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/forget-password", element: <ForgetPasswordPage /> },
        { path: "/reset-password", element: <ResetPasswordPage /> },
        { path: "/signup", element: <SignupPage /> },
        {
          path: "/notification",
          element: <NotificationPage socket={socket} />,
        },
        { path: "/edit/profile", element: <EditPage /> },
        { path: "/create/post", element: <CreatePostPage /> },
        { path: "/post/:id", element: <Post socket={socket} /> },
        { path: "/Followers/:Username", element: <FollowersPage /> },
        { path: "/Following/:Username", element: <FollowingPage /> },
      ],
    },
  ]);

  const loadUser = async () => {
    try {
      const response = await fetch(`http://localhost:1111/admin`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        window.location.href = "/login";
      }
      setAdmin(data.admin);
      setUserPosts(data.UserPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/forget-password" &&
      window.location.pathname !== "/signup"
    ) {
      loadUser();
    }
  }, []);

  return (
    <PeerContext.Provider
      value={{ peerId, setPeerId, remotePeerId, setRemotePeerId }}
    >
      <CurrentCallContext.Provider value={{ currentCall, setCurrentCall }}>
        <ReceiverContext.Provider value={{ receiver, setReceiver }}>
          <CallerContext.Provider
            value={{
              caller,
              setCaller,
              localStream,
              setLocalStream,
              remoteStream,
            }}
          >
            <CallStatusContext.Provider value={{ callStatus, setCallStatus }}>
              <PopUpMsgContext.Provider value={{ popUpMsg, setPopUpMsg }}>
                <PopUpContext.Provider value={{ ShowPopUp, setShowPopUp }}>
                  <UserPostContext.Provider value={{ UserPosts, setUserPosts }}>
                    <AdminContext.Provider value={{ admin, setAdmin }}>
                      <RouterProvider router={router} />
                    </AdminContext.Provider>
                  </UserPostContext.Provider>
                </PopUpContext.Provider>
              </PopUpMsgContext.Provider>
            </CallStatusContext.Provider>
          </CallerContext.Provider>
        </ReceiverContext.Provider>
      </CurrentCallContext.Provider>
    </PeerContext.Provider>
  );
}
