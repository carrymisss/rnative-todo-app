import React from "react";
import { Formik } from "formik";
import { useToast } from "react-native-toast-notifications";
import { useMutation } from "react-query";
import AuthService from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";
import { IAuthFormResponse, ILoginFormValues } from "../../interfaces";
import { LoginFormSchema } from "../../schemas";
import LoginFormComponent from "../../components/Auth/LoginForm";

const LoginForm = () => {
    const toast = useToast();
    const authService = new AuthService();
    const { setToken } = useAuth();

    const loginingMutation = useMutation(
        async (values: ILoginFormValues) => {
            try {
                const { data }: IAuthFormResponse = await authService.loginUser(values);
                toast.show("Welcome", { type: "success" });
                setToken(data.token);
            } catch (error: any) {                
                toast.show(`${error.response.status}: ${error.response.data}`, { type: "danger" });
            }
        }
    );

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validationSchema={LoginFormSchema}
            onSubmit={(values: ILoginFormValues) => {                
                loginingMutation.mutateAsync(values);
            }}
        >
            {({ handleChange, handleSubmit, values, errors }) => {
                const handleFormSubmit = (): void => {
                    handleSubmit();
                };

                return (
                    <LoginFormComponent
                        handleChange={handleChange}
                        handleFormSubmit={handleFormSubmit}
                        values={values}
                        errors={errors}
                    />
                );
            }}
        </Formik>
    );
};

export default LoginForm;
