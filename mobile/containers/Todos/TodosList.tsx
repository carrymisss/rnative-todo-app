import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { ActionSheet } from "@ant-design/react-native";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import TodoService from "../../services/todo.service";
import { NAVIGATOR_KEYS, REACT_QUERY_KEYS } from "../../utils/contants";
import useAuth from "../../hooks/useAuth";
import { ITodoItem } from "../../interfaces";
import TodosListComponent from "../../components/Todos/TodosList";

interface ITodosFetch {
    data: {
        count: number;
        items: ITodoItem[];
    }
}

const TodosList = () => {
    const toast = useToast();
    const navigation: any = useNavigation();
    const { token } = useAuth();
    const todoService = new TodoService(token);
    const [searchParam, setSearchParam,] = useState<string | undefined>(undefined);
    const [completionParam, setCompletionParam,] = useState<boolean | undefined>(undefined);
    const [privacyParam, setPrivacyParam,] = useState<"private" | "public" | undefined>(undefined);
    const [paginationOffset, setPaginationOffset,] = useState<number>(0);
    const [itemsCount, setItemsCount,] = useState<number>(0);
    const paginationLimit = 5;

    const allTodosFetch = useQuery(REACT_QUERY_KEYS.ALL_TODOS, async () => {
        try {
            const result: ITodosFetch = await todoService.getTodos({
                search: searchParam,
                completion: completionParam,
                privacy: privacyParam
            },
            {
                offset: paginationOffset,
                limit: paginationLimit
            });

            setItemsCount(result.data.count);

            return result.data.items;
        } catch (error: any) {
            error.response && toast.show(error.response.status + ": " + error.response.data, { type: "danger" });
        }
    });
    
    const deleteTodoMutation = useMutation(async (id: string) => {
        try {
            const result: any = await todoService.deleteTodo(id);
            toast.show(result.data, { type: "success" });
            allTodosFetch.refetch();
        } catch (error: any) {
            error.response && toast.show(error.response.status + ": " + error.response.data, { type: "danger" });
        }
    });

    useEffect(() => {
        allTodosFetch.refetch();
    }, [paginationOffset,]);

    const handlePaginateForward = () => {
        setPaginationOffset(prev => prev + paginationLimit);
    };

    const handlePaginateBackward = () => {
        setPaginationOffset(prev => prev - paginationLimit);
    };

    const handleTodoCreate = () => {
        navigation.navigate(NAVIGATOR_KEYS.CREATE, { heading: "Create Todo" });
    };

    const handleTodoEdit = (data: ITodoItem) => (): void =>  {
        navigation.navigate(NAVIGATOR_KEYS.EDIT, { ...data, heading: "Edit Todo" });
    };

    const handleTodoDelete = (id: string) => (): void => {
        const BUTTONS: string[] = [
            "Delete",
            "Cancel",
        ];
        ActionSheet.showActionSheetWithOptions(
            {
                title: "Delete Todo",
                message: "Want to delete an item?",
                options: BUTTONS,
                cancelButtonIndex: 1,
                destructiveButtonIndex: 0
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                    deleteTodoMutation.mutateAsync(id); 
                }
            }
        );
    };

    return (
        <TodosListComponent
            data={allTodosFetch.data}
            status={allTodosFetch.status}
            statusIsFetching={allTodosFetch.isFetching}
            totalCount={itemsCount}
            paginationOffset={paginationOffset}
            paginationLimit={paginationLimit}
            searchParam={searchParam}
            completionParam={completionParam}
            privacyParam={privacyParam}
            setPaginationOffset={setPaginationOffset}
            handlePaginateForward={handlePaginateForward}
            handlePaginateBackward={handlePaginateBackward}
            setSearchParam={setSearchParam}
            setCompletionParam={setCompletionParam}
            setPrivacyParam={setPrivacyParam}
            handleTodoCreate={handleTodoCreate}
            handleTodoEdit={handleTodoEdit}
            handleTodoDelete={handleTodoDelete}
        />
    );
};

export default TodosList;
