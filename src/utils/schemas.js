import * as yup from "yup";

export const registerSchema = yup.object({
    name: yup.string().required("Please enter your name"),
    email: yup.string().matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email format").required("Email is required"),
    password: yup.string().min(7, "Password must be at least 7 characters").required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password must match").required("Please confirm your password")
});

export const loginSchema = yup.object({
    email: yup.string().matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, "Invalid email format").required("Email is required"),
    password: yup.string().min(7, "Password must be at least 7 characters").required("Password is required")
});