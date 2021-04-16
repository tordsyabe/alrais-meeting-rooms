import * as yup from "yup";

export const signInValidation = yup.object({
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Username is requred"),
  password: yup.string().required("Password is required"),
});

export const meetingValidation = yup.object({
  title: yup.string().required("Title is required"),
  roomId: yup.string().required("Please select a meeting room"),
  // status: yup.string().required("Password is required"),
});
