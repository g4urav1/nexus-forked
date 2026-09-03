import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPages from "./Components/Pages/Auth";
import FeedPage from "./Components/Pages/Home";
import MessagesPage from "./Components/Pages/Messages";
import ProfilePage from "./Components/Pages/Profile";
import SearchPage from "./Components/Pages/Search";
import LoginPage from "./Components/Pages/Login";
import SignupPage from "./Components/Pages/Signup";
import EditPage from "./Components/Pages/Edit";
import CreatePostPage from "./Components/Pages/CreatePost";
import Post from "./Components/Pages/Post";
import { useEffect, useState } from "react";
import { UserContext, UserPostContext } from "./Components/context/context";

export default function App() {
  const [user, setUser] = useState("");
  const [UserPosts, setUserPosts] = useState([]);

  const router = createBrowserRouter([
    { path: "/", element: <FeedPage /> },
    { path: "/auth", element: <AuthPages /> },
    { path: "/inbox", element: <MessagesPage /> },
    { path: "/admin", element: <ProfilePage /> },
    { path: "/User/:Username", element: <ProfilePage /> },
    { path: "/search", element: <SearchPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/edit/profile", element: <EditPage /> },
    { path: "/create/post", element: <CreatePostPage /> },
    { path: "/post/:id", element: <Post /> },
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
      setUser(data.user);
      setUserPosts(data.UserPosts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/signup"
    ) {
      loadUser();
    }
  }, []);

  return (
    <UserPostContext.Provider value={{ UserPosts, setUserPosts }}>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </UserPostContext.Provider>
  );
}
