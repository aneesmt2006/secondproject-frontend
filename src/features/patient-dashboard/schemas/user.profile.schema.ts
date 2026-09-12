import * as Yup from "yup";

const step1Fields = {
  fullName: Yup.string().required("Full name is required"),
  dateOfBirth: Yup.date()
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .typeError("Invalid date format")
    .required("Date of birth is required")
    .test("age", "You must be at least 18 years old", (value) => {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= 18;
    }),
  lmp: Yup.string().required("Last menstrual period date is required"),
  isFirstPregnancy: Yup.boolean().required("Please select if this is your first pregnancy"),
  bloodGroup: Yup.string().required("Blood group is required"),
  height: Yup.string().required("Height is required"),
  weight: Yup.string().required("Weight is required"),
};

const step2Fields = {
  gestationalDiabetes: Yup.boolean().required(),
  gestationalSugar: Yup.string().optional(),
  bloodPressure: Yup.boolean().required(),
  bpReading: Yup.string().optional(),
  thyroidProblems: Yup.boolean().required(),
  pcosPcod: Yup.boolean().required(),
  takingSupplements: Yup.string().required("Please select if you are taking supplements"),
  knownAllergies: Yup.string().required("Please select if you have known allergies"),
  familyRelated: Yup.string().required("Please select if family is related"),
  otherHealthIssues: Yup.string().nullable(),
};

export const step1Schema = Yup.object().shape(step1Fields);
export const step2Schema = Yup.object().shape(step2Fields);

export const updateProfileSchema = Yup.object().shape({
  ...step1Fields,
  ...step2Fields,
});
