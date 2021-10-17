import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Formik } from "formik";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import TodoFormComponent from "../../components/Todos/TodoForm";
import TodoService from "../../services/todo.service";
import useAuth from "../../hooks/useAuth";
import { NAVIGATOR_KEYS, REACT_QUERY_KEYS } from "../../utils/contants";
import { TodoFormSchema } from "../../schemas";
import { ITodoFormValues } from "../../interfaces";

interface IRouteParams {
    key: string;
    name: "Home" | "Create";
    params: ITodoFormValues & { heading: string; _id: string; };
}

const TodoForm = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const route = useRoute<IRouteParams>();
    const navigation: any = useNavigation();
    const { token } = useAuth();
    const todoService = new TodoService(token);

    const handleReturn = (): void => {
        navigation.goBack();
    };

    const editValues: ITodoFormValues = {
        title: route.params.title,
        description: route.params.description,
        privacy: route.params.privacy,
        completion: route.params.completion
    };

    const createTodoMutation = useMutation(async (values: ITodoFormValues) => {
        try {
            const result: any = await todoService.createTodo(values);            
            toast.show(result.data, { type: "success" });
            navigation.navigate(NAVIGATOR_KEYS.LIST);
            queryClient.fetchQuery(REACT_QUERY_KEYS.ALL_TODOS);
            return result;
        } catch (error: any) {
            toast.show(error.response.status + ": " + error.response.data, { type: "danger" });
        }
    });

    const editTodoMutation = useMutation(async (values: ITodoFormValues) => {
        try {
            const result: any = await todoService.editTodo(route.params._id, values);
            toast.show(result.data, { type: "success" });
            navigation.navigate(NAVIGATOR_KEYS.LIST);
            queryClient.fetchQuery(REACT_QUERY_KEYS.ALL_TODOS);
            return result;
        } catch(error: any) {
            toast.show(error.response.status + ": " + error.response.data, { type: "danger" });
        }
    });

    return (
        <Formik
            initialValues={
                route.name === "Create" ? { 
                    title: "",
                    description: "",
                    privacy: "public",
                    completion: false
                } 
                : editValues
            }
            validationSchema={TodoFormSchema}
            onSubmit={(values: ITodoFormValues) => {
                route.name === "Create" ? createTodoMutation.mutateAsync(values) 
                : editTodoMutation.mutateAsync(values);
            }}
        >
            {({ handleSubmit, setFieldValue, values, errors }) => {
                const handleRadioPress = (key: string) => (): void => {
                    setFieldValue("privacy", key);
                };

                const handleOnTextChange = (key: string) => (text: string): void => {                    
                    setFieldValue(key, text);
                };

                const handleCheckBox = (val: boolean) => (): void => {
                    setFieldValue("completion", val);
                };

                const handleFormSubmit = (): void => {
                    handleSubmit();
                };

                return (
                    <TodoFormComponent
                        heading={route.params.heading}
                        handleReturn={handleReturn}
                        handleRadioPress={handleRadioPress}
                        handleOnTextChange={handleOnTextChange}
                        handleCheckBox={handleCheckBox}
                        handleFormSubmit={handleFormSubmit} 
                        errors={errors}
                        values={values} 
                    />
                );
            }}
        </Formik>
    );
};

export default TodoForm;