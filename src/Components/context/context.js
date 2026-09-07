import { createContext } from "react";

export const AdminContext = createContext({
    admin: "",
    setAdmin: () => { }
});
export const UserPostContext = createContext({
    UserPosts: "",
    setUserPosts: () => []
});