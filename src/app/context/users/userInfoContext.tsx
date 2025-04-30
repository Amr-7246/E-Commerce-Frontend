"use client"
import { ReactNode, useContext, useState, createContext } from "react";

// ~ ######### User Info Context tybe
    interface IUser {
        id: string;
        name: string;
        email: string;
    }

    interface AuthContextType {
        UserInfo: IUser | null;
        setUserInfo: (user: IUser | null) => void;
    }
// ~ ######### User Info Context tybe
// ~ ######### User Info Context itself
    const UserInfoContext = createContext<AuthContextType|undefined> (undefined)
    export const UserInfoContextProvider = ({ children }: { children: ReactNode }) => {

        const [UserInfo, setUserInfo] = useState<IUser | null >(null)

        return (
            <UserInfoContext.Provider value={{UserInfo, setUserInfo }} >
                {children}
            </UserInfoContext.Provider>
        )  
    }
// ~ ######### User Info Context itself
// ~ ######### Hook to use Context
    export const useUserInfoContext = () => {
        const context = useContext(UserInfoContext);
        if (!context) {
            throw new Error("useAuth must be used inside an AuthProvider");
        }
        return context;
    }
// ~ ######### Hook to use Context
