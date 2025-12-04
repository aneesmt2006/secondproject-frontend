import { PregnantProfile } from "../../../common/types/models";

export type pregnantProfile = PregnantProfile;

export interface updatePayload{
  lmp: string;
  isFirstPregnancy: boolean;
  bloodGroup: string;
  height: string;
  weight: string;
  gestationalDiabetes: boolean;
  gestationalSugar: string;
  bloodPressure: boolean;
  bpReading: string;
  thyroidProblems: boolean;
  pcosPcod: boolean;
  takingSupplements: string;
  knownAllergies: string;
  familyRelated: string;
  otherHealthIssues: string;
}


export interface getUser<T>{
  commonData?:T,
  profile:pregnantProfile
}
export interface profileError {
  lmp: string;
  takingSupplements: string;
  knownAllergies: string;
  familyRelated: string;
  height: string;
  weight: string;
}


