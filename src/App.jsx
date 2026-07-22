import { createBrowserRouter, RouterProvider } from "react-router";
import AuthPages from "./Components/Pages/Auth";
import FeedPage from "./Components/Pages/Home";
import MessagesPage from "./Components/Pages/Messages";
import ProfilePage from "./Components/Pages/Profile";
import SearchPage from "./Components/Pages/Search";

export default function App(){

  const router = createBrowserRouter([
    {path: "/", element: <FeedPage />},
    {path: "/inbox", element: <MessagesPage />},
    {path: "/profile", element: <ProfilePage />},
    {path: "/search", element: <SearchPage />},
  ])

  return (
    <RouterProvider router={router} />
  )
}