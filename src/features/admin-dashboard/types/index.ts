import { User, Doctor, Appointment } from "../../../common/types/models";

export type { User, Doctor, Appointment };

export interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  weekFilter: string;
  setWeekFilter: (filter: string) => void;
  conditionFilter: string;
  setConditionFilter: (filter: string) => void;
  dueDateFilter: string;
  setDueDateFilter: (filter: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export interface fetusForm {
  week: number;
  fetusImage?: string; // for edit & preview 
  fruitImage?: string;// for edit & preview 
  weight: string;
  height: string;
  development: string;
  fetusFile?: File | null; // file for upload the uploaded image
  fruitFile?: File | null;// same
}

export interface FetusUploadFormProps {
  onSave: (data: fetusForm) => void;
  onCancel: () => void;
  editingData?: fetusForm;
  loading:boolean,
  setLoading:(is:boolean)=>void
}

export interface FetusData {
  week: number;
  fetusImage: string; // cloudinary url
  fruitImage: string;// cloudinary url
  weight: string;
  height: string;
  development: string;
}

export interface FetusPreviewModalProps {
  data: fetusForm;
  onClose: () => void;
  onEdit: () => void;
}




export interface SymptomsData {
  week: number;
  normalSymptoms: string[];
  abnormalSymptoms: string[];
}

export interface LogSymptomsPayload {
  week: number;
  selectedNormalSymptoms: string[];
  selectedAbnormalSymptoms: string[];
}
