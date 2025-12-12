import * as Yup from "yup";

export const DRprofileSchema = Yup.object().shape({
  specialization:Yup.string().trim().required("Specialization is required"),
  profileImage: Yup.string().nullable(),
  experience: Yup.string().trim().required("Experience is required"),
  address: Yup.string().trim().required("Address is required"),
  registration: Yup.string().trim().required("Registration number is required"),
  online_fee: Yup.string().trim().required("Online consultation fee is required"),
});
