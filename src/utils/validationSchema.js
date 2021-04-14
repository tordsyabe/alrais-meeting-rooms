import * as yup from "yup";

export const signInValidation = yup.object({
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Username is requred"),
  password: yup.string().required("Password is required"),
});