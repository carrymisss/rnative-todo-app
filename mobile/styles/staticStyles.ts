import { StyleSheet } from "react-native";
import { PRIMARY_COLOR } from "../utils/contants";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fullWidth: {
        width: "100%"
    },
    checkbox: {
        borderRadius: 6,
        borderWidth: 2,
        borderColor: PRIMARY_COLOR
    },
    checkboxText: {
        fontSize: 18,
        fontFamily: "System",
        color: "#000",
        textDecorationLine: "none"
    },
    radio: {
        width: 25,
        height: 25,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: PRIMARY_COLOR
    },
    radioSecond: {
        width: 25,
        height: 25,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: PRIMARY_COLOR,
        marginLeft: 30
    },
    radioText: {
        paddingHorizontal: 15,
        fontSize: 18
    },
    radioInner: {
        height: 15, 
        width: 15,
        borderRadius: 3
    },
    customInput: {
        width: "100%",
        marginBottom: 15,
        paddingHorizontal: 11,
        paddingVertical: 8,
        color: "#000000d9",
        fontSize: 16,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#d9d9d9",
        borderRadius: 4
    },
    customInputError: {
        width: "100%",
        marginBottom: 15,
        paddingHorizontal: 11,
        paddingVertical: 8,
        color: "#000000d9",
        fontSize: 16,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#ff4d4f",
        borderRadius: 4
    },
    errorMessage: {
        marginTop: -10,
        color: "#ff4d4f",
        marginBottom: 10
    },
    divider: {
        width: "100%",
        borderTopWidth: 1,
        borderTopColor: "rgba(0, 0, 0, .2)"
    }
});

export default styles;