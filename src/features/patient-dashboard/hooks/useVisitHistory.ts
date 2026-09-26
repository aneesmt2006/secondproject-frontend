import { useState, useEffect } from "react";
import { getUserVisitHistory, bookedDoctors } from "@/services/api/appoinment.service";
import { UserVisitHistory, UserAppointment } from "@/types/appointments.type";
import { getAppointmentDateTime } from "@/utils/appointmentUtils";
import { updatePrimaryDoctor, getPrimaryDoctor, getPrescriptionByAppointmentId } from "@/services/api/medical.service";
import { MedicalPrescription } from "@/types/medical.overview.type";
import { ChatContact } from "@/components/chat/types";
import { toast } from "sonner";

const MOCK_HISTORY: UserVisitHistory = {
    upcoming: {
        appointmentId: "up-1",
        doctorName: "Dr. Sarah Johnson",
        specialization: "Obstetrician",
        appointmentDate: "Jan 12, 2026",
        appointmentTime: "09:00 AM",
        reason: "Routine Checkup",
        status: "Scheduled",
        hospitalName: "City Medical Center"
    },
    history: [
        {
            appointmentId: "h-1",
            doctorName: "Dr. Sarah Johnson",
            specialization: "Obstetrician",
            appointmentDate: "Dec 15, 2025",
            appointmentTime: "10:30 AM",
            reason: "Monthly Routine Checkup",
            notes: "Everything is progressing normally. Blood pressure is stable at 110/70. Recommended continuing current prenatal vitamins.",
            status: "Completed"
        },
        {
            appointmentId: "h-2",
            doctorName: "Dr. Michael Chen",
            specialization: "Radiologist",
            appointmentDate: "Nov 12, 2025",
            appointmentTime: "02:15 PM",
            reason: "Late First Trimester Scan",
            notes: "Anatomy scan looks perfect. Heartbeat is strong and steady. Growth is exactly on track for 12 weeks.",
            status: "Completed"
        },
        {
            appointmentId: "h-3",
            doctorName: "Dr. Sarah Johnson",
            specialization: "Obstetrician",
            appointmentDate: "Oct 10, 2025",
            appointmentTime: "09:00 AM",
            reason: "Initial Confirmation Visit",
            notes: "Pregnancy confirmed. Estimated due date discussed. Blood tests ordered for routine screening.",
            status: "Completed"
        }
    ]
};

export const useVisitHistory = () => {
    const [data, setData] = useState<UserVisitHistory | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Primary Doctor selector states
    const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
    const [bookedDoctorsList, setBookedDoctorsList] = useState<ChatContact[]>([]);
    const [isDoctorsLoading, setIsDoctorsLoading] = useState(false);
    const [isUpdatingDoctor, setIsUpdatingDoctor] = useState(false);

    // Prescription Notebook Modal States
    const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState<MedicalPrescription | null>(null);
    const [selectedAppointment, setSelectedAppointment] = useState<UserAppointment | null>(null);
    const [isPrescriptionLoading, setIsPrescriptionLoading] = useState(false);

    // Current primary doctor fetched from backend
    const [currentPrimaryDoctor, setCurrentPrimaryDoctor] = useState<{ doctorName: string; doctorId: string } | null>(null);
    const [isCurrentDoctorLoading, setIsCurrentDoctorLoading] = useState(false);
    
    // Selection state in the modal
    const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
    const [selectedDoctorName, setSelectedDoctorName] = useState<string | null>(null);

    const fetchHistory = async () => {
        try {
            setIsLoading(true);
            const response = await getUserVisitHistory();
            if (response.success && response.data && (response.data.history.length > 0 || response.data.upcoming)) {
                setData(response.data);
            } else {
                // Fallback to mock data if API response is empty or unsuccessful
                console.warn("Using mock data: API response empty or failed", response.message);
                setData(MOCK_HISTORY);
            }
        } catch (err) {
            console.error("Error fetching visit history, falling back to mock:", err);
            setData(MOCK_HISTORY);
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
            } else {
                setSelectedPrescription(null);
            }
        } catch (err) {
            console.error("Failed to fetch prescription details:", err);
            setSelectedPrescription(null);
        } finally {
            setIsPrescriptionLoading(false);
        }
    };

    const handleClosePrescriptionModal = () => {
        setIsPrescriptionModalOpen(false);
        setSelectedPrescription(null);
        setSelectedAppointment(null);
    };

    // Load booked doctors & current primary doctor on demand
    const loadDoctorsList = async () => {
        try {
            setIsDoctorsLoading(true);
            setIsCurrentDoctorLoading(true);
            
            const [bookedRes, primaryRes] = await Promise.all([
                bookedDoctors(),
                getPrimaryDoctor()
            ]);

            if (bookedRes.success && bookedRes.data) {
                setBookedDoctorsList(bookedRes.data);
            } else {
                setBookedDoctorsList([]);
            }

            if (primaryRes.success && primaryRes.data) {
                setCurrentPrimaryDoctor(primaryRes.data);
                // Pre-select the current primary doctor by default
                setSelectedDoctorId(primaryRes.data.doctorId);
                setSelectedDoctorName(primaryRes.data.doctorName);
            } else {
                setCurrentPrimaryDoctor(null);
                setSelectedDoctorId(null);
                setSelectedDoctorName(null);
            }
        } catch (err) {
            console.error("Error fetching doctors data:", err);
            toast.error("Failed to load doctor lists.");
        } finally {
            setIsDoctorsLoading(false);
            setIsCurrentDoctorLoading(false);
        }
    };

    useEffect(() => {
        if (isDoctorModalOpen) {
            loadDoctorsList();
        }
    }, [isDoctorModalOpen]);

    const handleChangePrimaryDoctor = async () => {
        if (!selectedDoctorId) {
            toast.error("Please select a doctor to confirm.");
            return;
        }
        try {
            setIsUpdatingDoctor(true);
            const response = await updatePrimaryDoctor(selectedDoctorId);
            if (response.success) {
                toast.success(response.message || `Primary doctor successfully updated to Dr. ${selectedDoctorName}`);
                
                // Update local state to reflect new primary doctor
                setCurrentPrimaryDoctor({
                    doctorId: selectedDoctorId,
                    doctorName: selectedDoctorName || ""
                });
                
                setIsDoctorModalOpen(false);
                fetchHistory(); // Refresh history list
            } else {
                toast.error(response.message || "Failed to update primary doctor.");
            }
        } catch (err) {
            console.error("Error setting primary doctor:", err);
            toast.error("Something went wrong while setting primary doctor.");
        } finally {
            setIsUpdatingDoctor(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const upcoming = data?.upcoming;
    const isTimeReached = upcoming
        ? (() => {
            const apptDateTime = getAppointmentDateTime(upcoming.appointmentDate, upcoming.appointmentTime);
            return apptDateTime ? new Date() >= apptDateTime : false;
        })()
        : false;

    return {
        data,
        isLoading,
        isTimeReached,
        refresh: fetchHistory,
        isDoctorModalOpen,
        setIsDoctorModalOpen,
        bookedDoctorsList,
        isDoctorsLoading,
        isUpdatingDoctor,
        handleChangePrimaryDoctor,
        currentPrimaryDoctor,
        isCurrentDoctorLoading,
        selectedDoctorId,
        setSelectedDoctorId,
        selectedDoctorName,
        setSelectedDoctorName,
        // Prescription notebook modal props
        isPrescriptionModalOpen,
        selectedPrescription,
        selectedAppointment,
        isPrescriptionLoading,
        handleViewPrescription,
        handleClosePrescriptionModal
    };
};

