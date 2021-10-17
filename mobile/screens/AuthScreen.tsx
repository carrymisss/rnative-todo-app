import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NAVIGATOR_KEYS } from "../utils/contants";
import LoginForm from "../containers/Auth/LoginForm";
import SignupForm from "../containers/Auth/SignupForm";
import AuthHome from "../containers/Auth/AuthHome";

const Login = () => {
    const AuthStackNavigator = createNativeStackNavigator();
    
    return (
        <AuthStackNavigator.Navigator initialRouteName={NAVIGATOR_KEYS.AUTH}>
            <AuthStackNavigator.Screen name={NAVIGATOR_KEYS.AUTH} component={AuthHome} />
            <AuthStackNavigator.Screen name={NAVIGATOR_KEYS.LOGIN} component={LoginForm} />
            <AuthStackNavigator.Screen name={NAVIGATOR_KEYS.SIGNUP} component={SignupForm} />
        </AuthStackNavigator.Navigator> 
    );
};

export default Login;
