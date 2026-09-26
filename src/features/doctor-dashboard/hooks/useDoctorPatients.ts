import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bookedPatients } from "@/services/api/appoinment.service";
import { ChatContact } from "@/components/chat/types";
import { useMedicalRecord } from "./useMedicalRecord";

export const useDoctorPatients = () => {
  const navigate = useNavigate();
  const { laodMedicalData } = useMedicalRecord();
  
  const [patients, setPatients] = useState<ChatContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setIsLoading(true);
        const response = await bookedPatients();
        if (response.success && response.data) {
          setPatients(response.data);
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientClick = (patientId: string) => {
    laodMedicalData(patientId);
    navigate(`/doctor/medical-record/${patientId}`);
  };

  return {
    patients: filteredPatients,
    isLoading,
    searchQuery,
    setSearchQuery,
    handlePatientClick
  };
};
