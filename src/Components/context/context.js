import { createContext } from "react";

export const AdminContext = createContext({
    admin: "",
    setAdmin: () => { }
});
export const UserPostContext = createContext({
    UserPosts: "",
    setUserPosts: () => []
});

export const PopUpContext = createContext({
    ShowPopUp: false,
    setShowPopUp: () => []
});
export const PopUpMsgContext = createContext({
    popUpMsg: "",
    setPopUpMsg: () => []
});