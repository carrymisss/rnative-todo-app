import * as Yup from "yup";

export const SignupFormSchema = Yup.object().shape({
    username: Yup.string().required("Username required"),
    email: Yup.string().required("Email required").email("Invalid email"),
    password: Yup.string().required("Password required").min(6, "Password must contains at least 6 symbols"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"),], "Passwords must match").required("Passwords must match")
});

export const LoginFormSchema = Yup.object().shape({
    email: Yup.string().required("Email required").email("Invalid email"),
    password: Yup.string().required("Password required").min(6, "Password must contain at least 6 symbols")
});

export const TodoFormSchema = Yup.object().shape({
    title: Yup.string().required("Title required"),
    description: Yup.string().required("Description required")
});