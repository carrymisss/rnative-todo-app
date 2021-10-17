import React from "react";
import { Button, Flex, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, StyleSheet, Text } from "react-native";
import staticSatyles from "../../styles/staticStyles";
import { ILoginFormComponentProps } from "../../interfaces";

const LoginForm = ({
    values,
    errors,
    handleChange,
    handleFormSubmit
}: ILoginFormComponentProps) => {
    return (
        <KeyboardAwareScrollView enableAutomaticScroll={true} style={staticSatyles.container}>
            <WingBlank>
                <Flex style={styles.form} direction="column" align="start" justify="center">
                    <TextInput
                        style={errors.email ? staticSatyles.customInputError : staticSatyles.customInput}
                        onChangeText={handleChange("email")}
                        value={values.email}
                        autoCapitalize="none"
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                    {!!errors.email && <Text style={staticSatyles.errorMessage}>{errors.email}</Text>}
                    <TextInput
                        style={errors.password ? staticSatyles.customInputError : staticSatyles.customInput}
                        secureTextEntry={true}
                        onChangeText={handleChange("password")}
                        value={values.password}
                        placeholder="Password"
                    />
                    {!!errors.password && <Text style={staticSatyles.errorMessage}>{errors.password}</Text>}
                </Flex>
                <WhiteSpace size="lg" />
                <Button type="primary" onPress={handleFormSubmit}>Log in</Button>
                <WhiteSpace size="lg" />
            </WingBlank>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        marginTop: 250
    }
});

export default LoginForm;