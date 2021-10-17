import React from "react";
import { Button, Flex, WhiteSpace } from "@ant-design/react-native";
import staticSatyles from "../../styles/staticStyles";

interface IProps {
    handleLogin: () => void;
    handleSignup: () => void;
}

const AuthComponent = ({ handleLogin, handleSignup }: IProps) => {
    return (
        <Flex style={staticSatyles.container} align="center" direction="column" justify="center">
            <Button onPress={handleLogin} type="primary">Login</Button>
            <WhiteSpace size="lg" />
            <Button onPress={handleSignup} type="primary">Signup</Button>
        </Flex>
    );
};

export default AuthComponent;