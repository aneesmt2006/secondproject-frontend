import { useState, useEffect } from "react";
import { getUserVisitHistory } from "@/services/api/appoinment.service";
import { getPrescriptionByAppointmentId } from "@/services/api/medical.service";
import { UserAppointment } from "@/types/appointments.type";
import { MedicalPrescription } from "@/types/medical.overview.type";

export const useClinicalHistory = (patientId?: string) => {
  const [history, setHistory] = useState<UserAppointment[]>([]);
  const [upcoming, setUpcoming] = useState<UserAppointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Prescription Modal State
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<MedicalPrescription | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<UserAppointment | null>(null);
  const [isPrescriptionLoading, setIsPrescriptionLoading] = useState(false);

  const fetchClinicalHistory = async () => {
    setIsLoading(true);
    try {
      const response = await getUserVisitHistory(patientId);
      if (response.success && response.data) {
        setHistory(response.data.history || []);
        setUpcoming(response.data.upcoming || null);
      } else {
        setHistory([]);
        setUpcoming(null);
      }
    } catch (err) {
      console.error("Failed to fetch patient clinical history:", err);
      setHistory([]);
      setUpcoming(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewPrescription = async (appointment: UserAppointment) => {
    setSelectedAppointment(appointment);
    setIsPrescriptionModalOpen(true);
    setIsPrescriptionLoading(true);
    setSelectedPrescription(null);

    try {
      const res = await getPrescriptionByAppointmentId(appointment.appointmentId);
      if (res.success && res.data) {
        setSelectedPrescription(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch prescription details:", err);
    } finally {
      setIsPrescriptionLoading(false);
    }
  };

  const handleClosePrescriptionModal = () => {
    setIsPrescriptionModalOpen(false);
    setSelectedPrescription(null);
    setSelectedAppointment(null);
  };

  useEffect(() => {
    fetchClinicalHistory();
  }, [patientId]);

  const sortedHistory = [...history].sort((a, b) => {
    const dateA = new Date(a.appointmentDate).getTime();
    const dateB = new Date(b.appointmentDate).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  return {
    history: sortedHistory,
    upcoming,
    isLoading,
    sortOrder,
    setSortOrder,
    refreshHistory: fetchClinicalHistory,
    isPrescriptionModalOpen,
    selectedPrescription,
    selectedAppointment,
    isPrescriptionLoading,
    handleViewPrescription,
    handleClosePrescriptionModal
  };
};
