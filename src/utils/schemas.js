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

export const editUserSchema = yup.object().shape({
    avatar: yup
        .string()
        .nullable()
        .notRequired()
        .test(
            "valid-avatar",
            "Avatar must be a valid image URL",
            (value) => {
                if (!value) return true;
                if (value.startsWith("blob:")) return true;
                return /^https?:\/\/.*\.(png|jpe?g|gif|bmp|webp)$/i.test(value);
            }
        ),

    name: yup
        .string()
        .min(2, "Name is too short")
        .max(30, "Name is too long")
        .required("Name is required"),

    email: yup
        .string()
        .matches(
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            "Invalid email format"
        )
        .required("Email is required"),

    phone: yup
        .string()
        .matches(/^\+38\d{10}$/, "Phone must be in format +380XXXXXXXXX")
        .nullable()
});


export const addPetSchema = yup.object().shape({
    title: yup
        .string()
        .required("Title is required"),

    name: yup
        .string()
        .required("Pet name is required"),

    imgUrl: yup
        .string()
        .required("Image URL is required")
        .matches(
            /^https?:\/\/.*\.(png|jpg|jpeg|gif|bmp|webp)$/i,
            "URL must link to an image (png, jpg, jpeg, gif, bmp, webp)"
        ),

    species: yup
        .string()
        .required("Type of pet is required"),

    birthday: yup
        .string()
        .required("Birthday is required")
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Birthday must be in format YYYY-MM-DD"),

    sex: yup.string().nullable(),
});
