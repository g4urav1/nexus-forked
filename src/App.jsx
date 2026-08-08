import { createBrowserRouter, RouterProvider } from "react-router";
import AuthPages from "./Components/Pages/Auth";
import FeedPage from "./Components/Pages/Home";
import MessagesPage from "./Components/Pages/Messages";
import ProfilePage from "./Components/Pages/Profile";
import SearchPage from "./Components/Pages/Search";
import LoginPage from "./Components/Pages/Login";
import SignupPage from "./Components/Pages/Signup";
import EditPage from "./Components/Pages/Edit";
import { useEffect, useState } from "react";
import { UserContext } from "./Components/context/context";

export default function App() {
  const [user, setUser] = useState("");

  const router = createBrowserRouter([
    { path: "/", element: <FeedPage /> },
    { path: "/auth", element: <AuthPages /> },
    { path: "/inbox", element: <MessagesPage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/search", element: <SearchPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/signup", element: <SignupPage /> },
    { path: "/edit/profile", element: <EditPage/> },
  ]);

  const loadUser = async () => {
    try {
      const response = await fetch("http://localhost:1111/profile", {
        credentials: "include",
      });
      const data = await response.json();

      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
