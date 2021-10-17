import React from "react";
import { RouteProp, ParamListBase } from "@react-navigation/native";
import { createBottomTabNavigator, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import { NAVIGATOR_KEYS } from "../utils/contants";

interface ITabBarIconProps {
    color: string;
    size: number;
}

const MainScreen = () => {
    const MainScreenTabNavigator = createBottomTabNavigator();

    const screenOptions = ({ route }: { route: RouteProp<ParamListBase, string>; }): BottomTabNavigationOptions => ({
        headerShown: false,
        tabBarIcon: ({ color, size }: ITabBarIconProps): React.ReactNode => (
            <Icon
                name={route.name === NAVIGATOR_KEYS.HOME ? "list-alt" : "user"}
                color={color}
                size={size}
            />
        )
    });

    return (
        <MainScreenTabNavigator.Navigator screenOptions={screenOptions}>
            <MainScreenTabNavigator.Screen name={NAVIGATOR_KEYS.HOME} component={HomeScreen} />
            <MainScreenTabNavigator.Screen name={NAVIGATOR_KEYS.PROFILE} component={ProfileScreen} />
        </MainScreenTabNavigator.Navigator>
    );
};

export default MainScreen;
