"use client"
import { ReactNode, useContext, useState, createContext } from "react";

// ~ ######### User Info Context tybe

    interface AuthContextType {
        WhichCatigory: null | string ;
        setWhichCatigory: (user: string | null) => void;
    }
// ~ ######### User Info Context tybe
// ~ ######### User Info Context itself
    const GlobalContext = createContext<AuthContextType|undefined> (undefined)
    export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {

        const [WhichCatigory, setWhichCatigory] = useState<string | null >(null)

        return (
            <GlobalContext.Provider value={{WhichCatigory, setWhichCatigory }} >
                {children}
            </GlobalContext.Provider>
        )  
    }
// ~ ######### User Info Context itself
// ~ ######### Hook to use Context
    export const useGlobalContext = () => {
        const context = useContext(GlobalContext);
        if (!context) {
            throw new Error("useAuth must be used inside an AuthProvider");
        }
        return context;
    }
// ~ ######### Hook to use Context
