import { useEffect, useState } from 'react';
import { SymptomsData } from '../types';
import { AllWeekSymptoms, symptomsCreate, symptomsUpdate } from '../../../services/api/users-management.service';
import { toast } from 'sonner';

export const useSymptoms = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [previewData, setPreviewData] = useState<SymptomsData | null>(null);
  const [formData, setFormData] = useState<SymptomsData>({
    week: 1,
    normalSymptoms: '',
    abnormalSymptoms: '',
  });
  const [symptomsList, setSymptomsList] = useState<SymptomsData[]>([]);
  const [isEdit,setIsEdit] = useState(false)


  useEffect(()=>{
    const loadSymptoms = async()=>{
        try {
          const resposne = await AllWeekSymptoms();
          toast.success(resposne.message)
          setSymptomsList([...resposne.data!]);
          setIsCreating(false);
          setFormData({ week: 1, normalSymptoms: '', abnormalSymptoms: '' });
        } catch (error) {
          toast.error(error.response?.data?.message)
        }

      }


      loadSymptoms()
  },[])

  const handleSave = async() => {
    // Here you would typically call an API to save the data
      try {
        let response
        if(isEdit){
            response = await symptomsUpdate(formData)
        toast.success(response.message)
        }else{
          response = await symptomsCreate(formData)

        }

        setIsCreating(false)
        toast.success(response.message)

       
        
      } catch (error) {
        toast.error(error.response?.data?.message)
      }
    
  };

  const handlePreview = () => {
    setPreviewData(formData);
  };


   

  const handleCancel = () => {
    setIsCreating(false);
    setFormData({ week: 1, normalSymptoms: '', abnormalSymptoms: '' });
  };

  const handleEdit = (data: SymptomsData) => {
    setIsEdit(true)
    console.log('editing data---------------->',data)
    setFormData(data);
    setIsCreating(true);
  };

  const handleDelete = (week: number) => {
    setSymptomsList(symptomsList.filter(item => item.week !== week));
  };

  return {
    isCreating,
    setIsCreating,
    previewData,
    setPreviewData,
    formData,
    setFormData,
    symptomsList,
    handleSave,
    handlePreview,
    handleCancel,
    handleEdit,
    handleDelete,
    isEdit
  };
};
