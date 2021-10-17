import React, { Context, createContext, useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";

export interface IAuthContext {
    token: string | null | undefined;
    setToken: (token: string) => void;
    deleteToken: () => void;
}

interface IProps {
    children: React.ReactChild | React.ReactChild[];
}

const AuthContext: Context<IAuthContext> = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: IProps) => {
    const { setItem, getItem, removeItem } = useAsyncStorage("@token");
    const [token, setAuthToken,] = useState<string | null | undefined>(undefined);
    const toast = useToast();

    useEffect(() => {
        (async (): Promise<void> => {
            const token: string | null = await getItem();
            setAuthToken(token);
        })();
    });

    const setToken = async (token: string): Promise<void> => {
        try {
            await setItem(token);
            setAuthToken(token);
        } catch (error: any) {
            error.response && toast.show(error.response.status + ": " + error.response.data, { type: "danger" });
        }
    };

    const deleteToken = async (): Promise<void> => {
        try {        
            await removeItem();
            setAuthToken(null);
        } catch (error: any) {
            error.response && toast.show(error.response.status + ": " + error.response.data, { type: "danger" });
        }
    };
    
    return (
        <AuthContext.Provider value={{ setToken, token, deleteToken }}>
            { children }
        </AuthContext.Provider>
    );      
};

export { AuthContext, AuthProvider };