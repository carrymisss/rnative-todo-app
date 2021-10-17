import React from "react";
import { StyleSheet } from "react-native";
import { Flex, Button } from "@ant-design/react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import staticSatyles from "../styles/staticStyles";

interface IProps {
    handleLogout: () => void;
}

const Profile = ({ handleLogout }: IProps) => {
    return (
        <SafeAreaView style={staticSatyles.container}>
            <Flex style={styles.fullHeight} align="center" justify="center">
                <Button onPress={handleLogout} type="warning">Log Out</Button> 
            </Flex>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    fullHeight: {
        height: "100%" 
    }
});

export default Profile;