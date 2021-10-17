import React from "react";
import { Button, Flex, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, StyleSheet, Text } from "react-native";
import staticSatyles from "../../styles/staticStyles";
import { ISignupFormComponentProps } from "../../interfaces";

const SignupForm = ({
    values,
    errors,
    handleChange,
    handleFormSubmit
}: ISignupFormComponentProps) => {
    return (
        <KeyboardAwareScrollView enableAutomaticScroll={true} style={staticSatyles.container}>
            <WingBlank>
                <Flex style={styles.form} direction="column" align="start" justify="center">
                    <TextInput
                        style={errors.username ? staticSatyles.customInputError : staticSatyles.customInput}
                        onChangeText={handleChange("username")}
                        value={values.username}
                        placeholder="Username"
                    />
                    {!!errors.username && <Text style={staticSatyles.errorMessage}>{errors.username}</Text>}
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
                    <TextInput
                        style={errors.confirmPassword ? staticSatyles.customInputError : staticSatyles.customInput}
                        secureTextEntry={true}
                        onChangeText={handleChange("confirmPassword")}
                        value={values.confirmPassword}
                        placeholder="Confirm password"
                    />
                    {!!errors.confirmPassword && <Text style={staticSatyles.errorMessage}>{errors.confirmPassword}</Text>}
                </Flex>
                <WhiteSpace size="lg" />
                <Button type="primary" onPress={handleFormSubmit}>Sign up</Button>
                <WhiteSpace size="lg" />
            </WingBlank>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        marginTop: 200
    }
});

export default SignupForm;