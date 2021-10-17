import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Flex, WhiteSpace, WingBlank } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ITodoItem } from "../../interfaces";
import staticStyles from "../../styles/staticStyles";

interface IProps {
    item: ITodoItem;
    handleTodoEdit: (item: ITodoItem) => () => void;
    handleTodoDelete: (id: string) => () => void;
}

const TodoListItem = ({ item, handleTodoEdit, handleTodoDelete }: IProps) => {
    const itemData: ITodoItem = item;

    return (
        <WingBlank>
            <Flex align="center" direction="column" style={staticStyles.fullWidth}>
                <View style={staticStyles.divider} />
                <WhiteSpace size="md" />
                <Flex direction="row" align="stretch" wrap="nowrap" style={staticStyles.fullWidth}>
                    <Flex style={styles.leftCol} direction="column" justify="between">
                        <Flex direction="row" align="start" style={staticStyles.fullWidth}>
                            <Text  style={styles.title}>{itemData.title}</Text>
                            <Text style={styles.date}>{new Date(itemData.date).getFullYear()}</Text>
                        </Flex>
                        <Flex style={staticStyles.fullWidth} align="start" direction="column">
                            <Text style={styles.description}>{itemData.description}</Text>
                            <Flex direction="row" justify="start">
                                <Text style={styles.extra}>{itemData.completion ? "Completed" : "Not completed" }</Text>
                                <Text style={styles.extra}>{itemData.privacy.charAt(0).toUpperCase() + itemData.privacy.slice(1)}</Text>
                            </Flex>
                        </Flex>
                    </Flex> 
                    <Flex justify="around" align="start" style={styles.rightCol}>
                        <Icon.Button onPress={handleTodoEdit(itemData)} iconStyle={styles.icons} style={styles.buttons} name="pencil-alt">
                            <Text>Edit</Text>
                        </Icon.Button>
                        <Icon.Button onPress={handleTodoDelete(itemData._id)} iconStyle={styles.icons} style={styles.buttons} name="trash-alt">
                            <Text>Delete</Text>
                        </Icon.Button>
                    </Flex>
                </Flex>
                <WhiteSpace size="md" />
            </Flex>
        </WingBlank>
    );
};

const styles = StyleSheet.create({
    leftCol: {
        width: "70%"
    },
    rightCol: {
        width: "30%"
    },
    buttons: {
        display: "flex",
        flexDirection: "column",
        borderWidth: 0,
        borderRadius: 0,
        borderColor: "rgb(242, 242, 242)",
        backgroundColor: "rgb(242, 242, 242)"
    },
    icons: { 
        marginRight: "auto", 
        marginLeft: "auto",
        marginBottom: 5,
        color: "#000"
    },
    title: {
        fontSize: 18,
        marginRight: 15,
        marginBottom: 5,
        maxWidth: "80%"
    },
    date: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: "600",
        minWidth: 32
    },
    description:{
        fontSize: 16,
        marginBottom: 8
    },
    extra: {
        fontSize: 16,
        display: "flex",
        paddingVertical: 2,
        paddingHorizontal: 4,
        fontWeight: "400",
        backgroundColor: "rgb(214, 214, 214)",
        color: "#000",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "rgb(214, 214, 214)",
        borderStyle: "solid",
        marginRight: 10,
        overflow: "hidden"
    }
});

export default TodoListItem;
