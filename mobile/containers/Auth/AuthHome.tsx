import { useNavigation } from "@react-navigation/native";
import React from "react";
import AuthHomeComponent from "../../components/Auth/AuthHome";
import { NAVIGATOR_KEYS } from "../../utils/contants";

const AuthHome = () => {
    const navigation: any = useNavigation();

    const handleLogin = (): void => {
        navigation.navigate(NAVIGATOR_KEYS.LOGIN);
    };

    const handleSignup = (): void => {
        navigation.navigate(NAVIGATOR_KEYS.SIGNUP);
    };
    
    return (
        <AuthHomeComponent
            handleLogin={handleLogin}
            handleSignup={handleSignup}
        />
    );
};

export default AuthHome;
