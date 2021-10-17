import React from "react";
import { Formik } from "formik";
import { useToast } from "react-native-toast-notifications";
import { useMutation } from "react-query";
import AuthService from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";
import { SignupFormSchema } from "../../schemas";
import { IAuthFormResponse, ISignupFormValues } from "../../interfaces";
import SignupFormComponent from "../../components/Auth/SignupForm";

const SignupForm = () => {
    const toast = useToast();
    const authService = new AuthService(); 
    const { setToken } = useAuth();

    const registrationMutation = useMutation(
        async (values: ISignupFormValues) => {
            try {
                const { data }: IAuthFormResponse = await authService.signupUser(values);
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
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            }}
            validationSchema={SignupFormSchema}
            onSubmit={async (values: ISignupFormValues) => {
                await registrationMutation.mutateAsync(values);  
            }}
        >
            {({ handleChange, handleSubmit, values, errors }) => {
                const handleFormSubmit = (): void => {
                    handleSubmit();
                };
            
                return (
                    <SignupFormComponent 
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

export default SignupForm;
