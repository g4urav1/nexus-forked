import { createContext } from "react";

export const UserContext = createContext({
    user: "",
    setUser: () => { }
});
export const UserPostContext = createContext({
    UserPosts: "",
    setUserPosts: () => []
});