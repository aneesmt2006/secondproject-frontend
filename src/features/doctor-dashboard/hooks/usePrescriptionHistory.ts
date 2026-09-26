import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getUserVisitHistory } from "@/services/api/appoinment.service";
import { getPrescriptionByAppointmentId } from "@/services/api/medical.service";
import { UserAppointment } from "@/types/appointments.type";

export const usePrescriptionHistory = (patientId: string) => {
  const [pastConsultations, setPastConsultations] = useState<UserAppointment[]>([]);
  const [selectedConsultation, setSelectedConsultation] = useState<UserAppointment | null>(null);
  const [selectedPrescriptionContent, setSelectedPrescriptionContent] = useState<string | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingPrescription, setIsLoadingPrescription] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadHistory = async () => {
    if (!patientId) return;
    try {
      setIsLoadingHistory(true);
      const response = await getUserVisitHistory(patientId);
      // Filter for completed appointments
      const history = response.data?.history?.filter(app => app.status === 'Completed') || [];
      setPastConsultations(history);

      if (history.length > 0) {
        handleViewConsultation(history[0]);
      }
    } catch (error) {
      console.error("Error loading visit history:", error);
      toast.error("Failed to load consultation history.");
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, [patientId]);

  const handleViewConsultation = async (consultation: UserAppointment) => {
    setSelectedConsultation(consultation);
    setSelectedPrescriptionContent(null); // Reset while loading
    try {
      setIsLoadingPrescription(true);
      const response = await getPrescriptionByAppointmentId(consultation.appointmentId);
      setSelectedPrescriptionContent(response.data?.content || "No clinical note found for this consultation.");
    } catch (error) {
      console.error("Error loading prescription:", error);
      setSelectedPrescriptionContent("No clinical note found for this consultation.");
    } finally {
      setIsLoadingPrescription(false);
    }
  };

  const filteredConsultations = pastConsultations.filter(
    (note) =>
      note.reason?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.appointmentDate?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    selectedConsultation,
    selectedPrescriptionContent,
    isLoadingHistory,
    isLoadingPrescription,
    handleViewConsultation,
    searchQuery,
    setSearchQuery,
    filteredConsultations,
  };
};
