import * as Yup from "yup";

const phoneRegex = /^[\d\s\-+()]{10,15}$/;

export const drRegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(20, "Full name cannot exceed 20 characters"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegex, "Enter a valid phone number (10–15 digits)"),

  specialization: Yup.string()
    .required("Medical specialization is required")
    .min(3, "Specialization must be at least 3 characters")
    .max(30, "Specialization cannot exceed 30 characters"),

  clinicName: Yup.string()
    .required("Clinic/Hospital name is required")
    .min(3, "Clinic/Hospital name must be at least 3 characters")
    .max(40, "Clinic/Hospital name cannot exceed 40 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),

  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), ''], "Passwords must match"),
});
