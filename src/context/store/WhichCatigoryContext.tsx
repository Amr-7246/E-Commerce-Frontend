"use client"
import { ReactNode, useContext, useState, createContext } from "react";

// ~ ######### User Info Context tybe

    interface AuthContextType {
        WhichCatigory: null | string ;
        setWhichCatigory: (category: string | null) => void;
    }
// ~ ######### User Info Context tybe
// ~ ######### User Info Context itself
    const WhichCatigoryContext = createContext<AuthContextType|undefined> (undefined)
    export const WhichCatigoryContextProvider = ({ children }: { children: ReactNode }) => {

        const [WhichCatigory, setWhichCatigory] = useState<string | null >('6818a0e728a424fd537dbe56')

        return (
          <WhichCatigoryContext.Provider value={{WhichCatigory, setWhichCatigory }} >
            {children}
          </WhichCatigoryContext.Provider>
        )  
    }
// ~ ######### User Info Context itself
// ~ ######### Hook to use Context
    export const useWhichCatigoryContext = () => {
        const context = useContext(WhichCatigoryContext);
        if (!context) {
            throw new Error("useAuth must be used inside an AuthProvider");
        }
        return context;
    }
// ~ ######### Hook to use Context
