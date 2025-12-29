import { getUserMedicalData } from "@/services/api/medical.service";
import { Patient } from "@/types/medical.overveiew.type";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useMedicalRecord = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [selectedPastPrescription, setSelectedPastPrescription] = useState<any>(null);
  const [medicalData,setMedicalData] = useState<Patient | undefined>(undefined)
  const { id: patientId } = useParams<{ id: string }>();


  // Mock Patient Data
  // const patient = {
  //   name: "Aisha Sharma",
  //   age: 30,
  //   gender: "Female",
  //   id: "#MED-2024-892",
  //   status: "IN-PATIENT",
  //   height: "165 cm",
  //   weight: "68 kg",
  //   bloodType: "B Pos",
  //   allergies: "2 Active",
  //   pregnancy: {
  //     week: 28,
  //     trimester: "Third Trimester",
  //     dueDate: "Oct 15",
  //     progress: 70
  //   },
  //   vitals: [
  //     { id: 1, label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "Normal", color: "blue", date: "2024-07-29", desc: "Regular, healthy range" },
  //     { id: 2, label: "Blood Sugar", value: "95", unit: "mg/dL", status: "Normal", color: "indigo", date: "2024-07-29", desc: "Fasting, within normal limits" },
  //     { id: 3, label: "Baby Heart Rate", value: "145", unit: "bpm", status: "Normal", color: "rose", date: "2024-07-29", desc: "Strong and consistent" },
  //     { id: 4, label: "Weight", value: "68", unit: "kg", status: "Normal", color: "amber", date: "2024-07-29", desc: "Stable, healthy gain" },
  //   ],
  //   abnormalities: "Mild ankle swelling noted in evenings. No other concerns.",
  //   lastPrescription: {
  //     doctor: "Dr. Sarah Jenkins",
  //     date: "Dec 20, 2025",
  //     medication: "Prenatal Vitamins, Iron Supplements"
  //   },
  //   lastReport: {
  //     name: "3rd Trimester Ultrasound",
  //     date: "Dec 18, 2025",
  //     status: "Normal"
  //   }
  // };

  const handleOpenPrescriptionModal = (prescription:any) => {
    setSelectedPastPrescription(prescription);
    setIsPrescriptionModalOpen(true);
  };

  const handleClosePrescriptionModal = () => {
    setIsPrescriptionModalOpen(false);
    setSelectedPastPrescription(null);
  };

  const laodMedicalData=useCallback(async(userId:string)=>{
      console.log('iddddd',userId)
      try {
        const response = await getUserMedicalData(userId)
        console.log('Medical Data Response:', response)
        setMedicalData(response.data)
      } catch (error) {
        console.error('Error loading medical data:', error)
      }
     },[])

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
