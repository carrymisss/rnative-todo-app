import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { NAVIGATOR_KEYS } from "../utils/contants";
import TodoList from "../containers/Todos/TodosList";
import TodoForm from "../containers/Todos/TodoForm";

const MainScreen = () => {
    const HomeScreenStackNavigator = createNativeStackNavigator();
    
    return (
        <HomeScreenStackNavigator.Navigator initialRouteName={NAVIGATOR_KEYS.LIST}>
            <HomeScreenStackNavigator.Screen name={NAVIGATOR_KEYS.LIST} component={TodoList} />
            <HomeScreenStackNavigator.Screen name={NAVIGATOR_KEYS.CREATE} component={TodoForm} />
            <HomeScreenStackNavigator.Screen name={NAVIGATOR_KEYS.EDIT} component={TodoForm} />
        </HomeScreenStackNavigator.Navigator>
    );
};

export default MainScreen;
