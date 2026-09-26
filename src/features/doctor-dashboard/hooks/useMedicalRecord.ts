import { getUserMedicalData } from "@/services/api/medical.service";
import { Patient } from "@/types/medical.overveiew.type";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useMedicalRecord = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [selectedPastPrescription, setSelectedPastPrescription] = useState<any>(null);
  const [medicalData,setMedicalData] = useState<Patient | undefined>(undefined)
  const { id: patientId } = useParams<{ id: string }>();


  const handleOpenPrescriptionModal = (prescription:any) => {
    setSelectedPastPrescription(prescription);
    setIsPrescriptionModalOpen(true);
  };

  const handleClosePrescriptionModal = () => {
    setIsPrescriptionModalOpen(false);
    setSelectedPastPrescription(null);
  };

  const laodMedicalData= async(userId:string)=>{
      try {
        const response = await getUserMedicalData(userId)
        setMedicalData(response.data)
      } catch (error) {
        console.error('Error loading medical data:', error)
      }
     }

  // Automatically load medical data when patientId is available
  useEffect(() => {

    if (patientId) {
      laodMedicalData(patientId);
    }
  }, [patientId]);



  return {
    activeTab,
    setActiveTab,
    patient:medicalData,
    isPrescriptionModalOpen,
    selectedPastPrescription,
    handleOpenPrescriptionModal,
    handleClosePrescriptionModal,
    laodMedicalData
  };
};
