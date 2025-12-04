import * as Yup from "yup";

export const updateProfileSchema = Yup.object()
  .shape({

    lmp: Yup.string().required("Last menstrual period date is required"),

    isFirstPregnancy: Yup.boolean().required(),
    bloodGroup: Yup.string().required(),

    height: Yup.string().required(),
    weight: Yup.string().required(),

    gestationalDiabetes: Yup.boolean().required(),
    gestationalSugar: Yup.string().optional(),

    bloodPressure: Yup.boolean().required(),
    bpReading: Yup.string().optional(),

    thyroidProblems: Yup.boolean().required(),
    pcosPcod: Yup.boolean().required(),

   
    takingSupplements: Yup.string().nullable(),
    knownAllergies: Yup.string().nullable(),
    familyRelated: Yup.string().nullable(),

    otherHealthIssues: Yup.string().nullable(),
  })
  .test(
    "all-yes-no-selected",
    "Please make sure you’ve selected Yes/No for all required options.",
    function (values) {
      if (!values) return false;

      const { takingSupplements, knownAllergies, familyRelated } = values;

      
      if (
        takingSupplements === undefined ||
        takingSupplements === "" ||
        knownAllergies === undefined ||
        knownAllergies === "" ||
        familyRelated === undefined ||
        familyRelated === ""
      ) {
        return false;
      }

      return true;
    }
  );
