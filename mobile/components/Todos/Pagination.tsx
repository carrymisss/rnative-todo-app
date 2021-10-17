import React from "react";
import { Text, View } from "react-native";
import { Button, Flex } from "@ant-design/react-native";
import { WhiteSpace, WingBlank } from "@ant-design/react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { IPaginationProps, IPaginationPropsSetters } from "../../interfaces";

interface IProps extends IPaginationProps, IPaginationPropsSetters {
    loadingStatus: boolean;
    handlePaginateForward: () => void;
    handlePaginateBackward: () => void;
}

const Pagination = ({ 
    loadingStatus,
    paginationLimit,
    paginationOffset,
    totalCount,
    handlePaginateForward,
    handlePaginateBackward 
}: IProps) => {
    return (
        <View>
            <WingBlank>
                <WhiteSpace size="lg" />
                <Flex direction="row" justify="between" align="center">
                    <Button disabled={paginationOffset === 0 || loadingStatus} onPress={handlePaginateBackward}>
                        &nbsp;<Icon size={22} name="angle-left" />&nbsp;
                    </Button>
                    <Text>{((totalCount - paginationOffset) <= paginationLimit) ? totalCount : (paginationOffset + paginationLimit)}</Text>
                    <Text>/</Text>
                    <Text>{totalCount}</Text>
                    <Button disabled={((totalCount - paginationOffset) <= paginationLimit) || loadingStatus} onPress={handlePaginateForward}>
                        &nbsp;<Icon size={22} name="angle-right" />&nbsp;
                    </Button>
                </Flex>
                <WhiteSpace size="lg" />
            </WingBlank>
        </View>
    );
};

export default Pagination;
