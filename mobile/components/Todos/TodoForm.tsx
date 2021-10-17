import React from "react";
import { Text, StyleSheet } from "react-native";
import { Button, WingBlank, WhiteSpace, InputItem, TextareaItem, List, Flex } from "@ant-design/react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RadioButton from "react-native-animated-radio-button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FormikErrors } from "formik";
import { ERROR_COLOR, PRIMARY_COLOR } from "../../utils/contants";
import { ITodoFormValues } from "../../interfaces";
import staticStyles from "../../styles/staticStyles";

interface IProps {
    heading: string;
    values: ITodoFormValues;
    errors: FormikErrors<ITodoFormValues>;
    handleFormSubmit: () => void;
    handleOnTextChange: (key: string) => (text: string) => void;
    handleCheckBox: (val: boolean) => () => void;
    handleRadioPress: (key: string) => () => void;
    handleReturn: () => void;
}

const TodoForm = ({
    heading,
    values,
    errors,
    handleFormSubmit,
    handleOnTextChange,
    handleRadioPress,
    handleCheckBox,
    handleReturn
}: IProps) => {
    return (
        <KeyboardAwareScrollView enableAutomaticScroll={true} style={staticStyles.container}>
            <List renderHeader={heading}>
                <InputItem
                    clear
                    value={values.title}
                    onChangeText={handleOnTextChange("title")}
                    placeholder="Todo`s title"
                >
                    Title
                </InputItem>
                <List.Item>
                    <TextareaItem
                        rows={10}
                        value={values.description}
                        onChangeText={handleOnTextChange("description")}
                        placeholder="Todo`s description"
                    />
                    {!!errors.title && <Text style={styles.customErrorMessage}>{errors.title}</Text>}
                    {!!errors.description && <Text style={styles.customErrorMessage}>{errors.description}</Text>}
                </List.Item>
            </List>
            <WhiteSpace size="sm" />
            <List.Item>
                <Flex direction="row">
                    <RadioButton
                        style={staticStyles.radio}
                        innerBackgroundColor={PRIMARY_COLOR}
                        innerContainerStyle={staticStyles.radioInner}
                        isActive={values.privacy === "public"}
                        onPress={handleRadioPress("public")}
                    />
                    <Text onPress={handleRadioPress("public")} style={staticStyles.radioText}>Public</Text>
                    <RadioButton
                        style={staticStyles.radioSecond}
                        innerBackgroundColor={PRIMARY_COLOR}
                        innerContainerStyle={staticStyles.radioInner}
                        isActive={values.privacy === "private"}
                        onPress={handleRadioPress("private")}
                    />
                    <Text onPress={handleRadioPress("private")} style={staticStyles.radioText}>Private</Text>
                </Flex>
            </List.Item>
            <WhiteSpace size="sm" />
            <List.Item>
                <Flex direction="row">
                    <BouncyCheckbox
                        isChecked={values.completion}
                        iconStyle={staticStyles.checkbox}
                        fillColor={PRIMARY_COLOR}
                        unfillColor="#FFFFFF"
                        onPress={handleCheckBox(!values.completion)}
                        textStyle={staticStyles.checkboxText}
                        text="Completed"
                    />
                </Flex>
            </List.Item>           
            <WhiteSpace size="lg" />
            <WingBlank>
                <Button type="primary" onPress={handleFormSubmit}>Save</Button>
                <WhiteSpace size="lg" />
                <Button type="ghost" onPress={handleReturn}>Cancel</Button>
                <WhiteSpace size="lg" />
            </WingBlank>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    customErrorMessage: {
        color: ERROR_COLOR,
        marginTop: 5,
        marginBottom: 10
    }
});

export default TodoForm;
