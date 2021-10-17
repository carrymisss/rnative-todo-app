import React from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView, ActivityIndicator } from "react-native";
import { WhiteSpace, WingBlank, Button, Flex } from "@ant-design/react-native";
import TodoListItem from "./TodosListItem";
import { PRIMARY_COLOR } from "../../utils/contants";
import ParamsFilter from "../../containers/Todos/ParamsFilter";
import Pagination from "./Pagination";
import { IPaginationProps,
    IPaginationPropsSetters,
    IParamsProps,
    IParamsPropsSetters,
    ITodoItem
} from "../../interfaces";
import staticStyles from "../../styles/staticStyles";

interface IProps extends IParamsProps, IParamsPropsSetters, IPaginationProps, IPaginationPropsSetters {
    data: ITodoItem[] | undefined;
    status: "idle" | "error" | "loading" | "success";
    statusIsFetching: boolean;
    setPaginationOffset: (val: number) => void;
    handleTodoCreate: () => void;
    handleTodoEdit: (item: ITodoItem) => () => void;
    handleTodoDelete: (id: string) => () => void;
}

const TodosList = ({ 
    data,
    status,
    totalCount,
    statusIsFetching,
    handleTodoEdit,
    handleTodoDelete,
    handleTodoCreate,
    searchParam,
    completionParam,
    privacyParam,
    setSearchParam,
    setCompletionParam,
    setPrivacyParam,
    paginationLimit,
    paginationOffset,
    handlePaginateForward,
    handlePaginateBackward,
    setPaginationOffset
}: IProps) => {    
    return (
        <SafeAreaView style={staticStyles.container}>
            {
                status === "error" ? 
                <View>
                    <Text style={styles.emptyText}>Error</Text>
                </View> :
                    status === "loading" ?
                    <View>
                        <WhiteSpace size="lg" />
                        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
                    </View> :
                        <FlatList
                            data={data}
                            ListHeaderComponent={
                                <WingBlank>
                                    <View>
                                        <WhiteSpace size="lg" />
                                        <Flex style={staticStyles.fullWidth}  direction="row">
                                            <Button style={staticStyles.container} onPress={handleTodoCreate} type="primary">Create new Todo</Button>
                                            <ParamsFilter
                                                setPaginationOffset={setPaginationOffset}
                                                searchParam={searchParam}
                                                completionParam={completionParam}
                                                privacyParam={privacyParam}
                                                setSearchParam={setSearchParam}
                                                setCompletionParam={setCompletionParam}
                                                setPrivacyParam={setPrivacyParam}
                                            />
                                        </Flex>
                                        <WhiteSpace size="lg" />
                                    </View>
                                </WingBlank>
                            }
                            renderItem={
                                ({ item }) => <TodoListItem item={item} handleTodoEdit={handleTodoEdit} handleTodoDelete={handleTodoDelete} />
                            }
                            keyExtractor={item => item._id}
                            ListFooterComponent={
                                data?.length ?
                                <Pagination
                                    loadingStatus={statusIsFetching}
                                    paginationLimit={paginationLimit}
                                    paginationOffset={paginationOffset}
                                    totalCount={totalCount}
                                    handlePaginateForward={handlePaginateForward}
                                    handlePaginateBackward={handlePaginateBackward}
                                /> : null
                            }
                        />
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    emptyText: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 25
    }
});

export default TodosList;