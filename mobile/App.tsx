import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "react-native-toast-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthScreen from "./screens/AuthScreen";
import { AuthContext, AuthProvider, IAuthContext } from "./context/authContext";
import MainScreen from "./screens/MainScreen";
import { PRIMARY_COLOR } from "./utils/contants";
import { ActivityIndicator } from "react-native";

const App = () => {
    const queryClient = new QueryClient();

    return (          
        <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
                <ToastProvider offsetTop={55} placement="top">
                    <AuthProvider>
                        <AuthContext.Consumer>
                            {(context: IAuthContext): React.ReactElement => {
                                return (
                                    <NavigationContainer>
                                        {
                                            context.token === undefined ?
                                                <ActivityIndicator size="large" color={PRIMARY_COLOR} /> :
                                                !context.token ?
                                                    <AuthScreen /> :
                                                    <MainScreen />
                                        }
                                    </NavigationContainer>
                                );
                            }}
                        </AuthContext.Consumer>
                    </AuthProvider>
                </ToastProvider>
            </SafeAreaProvider>
        </QueryClientProvider>
    );
};

export default App;