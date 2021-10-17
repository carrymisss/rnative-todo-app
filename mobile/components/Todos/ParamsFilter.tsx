import React from "react";
import { Text, View, Modal, StyleSheet, TextInput, Switch } from "react-native";
import { Badge, Button, Flex, WhiteSpace } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import RadioButton from "react-native-animated-radio-button";
import { PRIMARY_COLOR } from "../../utils/contants";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { TPrivacy } from "../../types";
import { IParamsProps } from "../../interfaces";
import staticStyles from "../../styles/staticStyles";

interface IProps extends IParamsProps {
    enableCompletionParam: boolean;
    enablePrivacyParam: boolean;
    filtersModalVisible: boolean;
    handleChangeSearchParam: (text: string) => void;
    handleChangeCompletionParam: () => void;
    handleChangePrivacyParam: (val: TPrivacy) => () => void;
    handleEnabledCompletionParam: (val: boolean) => void;
    handleEnabledPrivacyParam: () => void;
    handleToggleFiltersModal: (val: boolean) => () => void;
    handleFindByParams: () => void;
    handleResetFilters: () => void;
}

const ParamsFilter = ({ 
    searchParam,
    completionParam,
    privacyParam,
    enableCompletionParam,
    enablePrivacyParam,
    filtersModalVisible,
    handleToggleFiltersModal,
    handleChangeSearchParam,
    handleChangeCompletionParam,
    handleChangePrivacyParam,
    handleEnabledCompletionParam,
    handleEnabledPrivacyParam,
    handleFindByParams,
    handleResetFilters
}: IProps) => {
    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={filtersModalVisible}
                onRequestClose={handleToggleFiltersModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={staticStyles.customInput}
                            onChangeText={handleChangeSearchParam}
                            value={searchParam}
                            autoCapitalize="none"
                            placeholder="Filter by title"
                        />
                        <Flex style={staticStyles.fullWidth} align="center" justify="between">
                            <Text style={styles.text}>Filter by completion:</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: PRIMARY_COLOR }}
                                thumbColor={enableCompletionParam ? "#fff" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleEnabledCompletionParam}
                                value={enableCompletionParam}
                            />
                        </Flex>
                        <WhiteSpace size="md" />
                        {
                            enableCompletionParam && <Flex style={staticStyles.fullWidth} direction="row" align="start">
                                <BouncyCheckbox
                                    isChecked={completionParam}
                                    iconStyle={staticStyles.checkbox}
                                    fillColor={PRIMARY_COLOR}
                                    unfillColor="#FFFFFF"
                                    onPress={handleChangeCompletionParam}
                                    textStyle={staticStyles.checkboxText}
                                    text="Completed"
                                />
                            </Flex>
                        }
                        <WhiteSpace size="lg" />
                        <Flex style={staticStyles.fullWidth} align="center" justify="between">
                            <Text style={styles.text}>Filter by privacy:</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: PRIMARY_COLOR }}
                                thumbColor={enablePrivacyParam ? "#fff" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={handleEnabledPrivacyParam}
                                value={enablePrivacyParam}
                            />
                        </Flex>
                        <WhiteSpace size="md" />
                        {
                            enablePrivacyParam && <Flex style={staticStyles.fullWidth} direction="row" align="start">
                                <RadioButton
                                    style={staticStyles.radio}
                                    innerBackgroundColor={PRIMARY_COLOR}
                                    innerContainerStyle={staticStyles.radioInner}
                                    isActive={privacyParam === "public"}
                                    onPress={handleChangePrivacyParam("public")}
                                />
                                <Text onPress={handleChangePrivacyParam("public")} style={staticStyles.radioText}>Public</Text>
                                <RadioButton
                                    style={staticStyles.radioSecond}
                                    innerBackgroundColor={PRIMARY_COLOR}
                                    innerContainerStyle={staticStyles.radioInner}
                                    isActive={privacyParam === "private"}
                                    onPress={handleChangePrivacyParam("private")}
                                />
                                <Text onPress={handleChangePrivacyParam("private")} style={staticStyles.radioText}>Private</Text>
                            </Flex>
                        }
                        <WhiteSpace size="lg" />
                        <Flex style={staticStyles.fullWidth} direction="column" justify="between" align="center">
                            <Button style={staticStyles.fullWidth} type="primary" onPress={handleFindByParams}>Find</Button>
                            <WhiteSpace size="md" />
                            <Button style={staticStyles.fullWidth} type="ghost" onPress={handleResetFilters}>Reset</Button>
                            <WhiteSpace size="lg" />
                            <View style={staticStyles.divider} />
                            <WhiteSpace size="lg" />
                            <Button style={staticStyles.fullWidth} type="ghost" onPress={handleToggleFiltersModal(false)}>Cancel</Button>
                        </Flex>
                    </View>
                </View>
            </Modal>
            <Badge size="large" dot={
                searchParam !== undefined ||
                completionParam !== undefined ||
                privacyParam !== undefined
            }>
                <Button style={styles.ml} onPress={handleToggleFiltersModal(true)}>
                    <Icon size={16} name="filter" />
                </Button>
            </Badge>
        </View>
    );
};

const styles = StyleSheet.create({
    ml: {
        marginLeft: 10
    },
    text: {
        fontSize: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        backgroundColor: "rgba(0,0,0, .45)"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        width: "100%",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    }
});

export default ParamsFilter;