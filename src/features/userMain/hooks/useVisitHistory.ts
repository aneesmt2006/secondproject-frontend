import { useState, useEffect } from "react";
import { getUserVisitHistory } from "@/services/api/appoinment.service";
import { UserVisitHistory } from "@/types/appointments.type";

const MOCK_HISTORY: UserVisitHistory = {
    upcoming: {
        appointmentId: "up-1",
        doctorName: "Dr. Sarah Johnson",
        specialization: "Obstetrician",
        appoinmentDate: "Jan 12, 2026",
        appoinmentTime: "09:00 AM",
        reason: "Routine Checkup",
        status: "Scheduled",
        hospitalName: "City Medical Center"
    },
    history: [
        {
            appointmentId: "h-1",
            doctorName: "Dr. Sarah Johnson",
            specialization: "Obstetrician",
            appoinmentDate: "Dec 15, 2025",
            appoinmentTime: "10:30 AM",
            reason: "Monthly Routine Checkup",
            notes: "Everything is progressing normally. Blood pressure is stable at 110/70. Recommended continuing current prenatal vitamins.",
            status: "Completed"
        },
        {
            appointmentId: "h-2",
            doctorName: "Dr. Michael Chen",
            specialization: "Radiologist",
            appoinmentDate: "Nov 12, 2025",
            appoinmentTime: "02:15 PM",
            reason: "Late First Trimester Scan",
            notes: "Anatomy scan looks perfect. Heartbeat is strong and steady. Growth is exactly on track for 12 weeks.",
            status: "Completed"
        },
        {
            appointmentId: "h-3",
            doctorName: "Dr. Sarah Johnson",
            specialization: "Obstetrician",
            appoinmentDate: "Oct 10, 2025",
            appoinmentTime: "09:00 AM",
            reason: "Initial Confirmation Visit",
            notes: "Pregnancy confirmed. Estimated due date discussed. Blood tests ordered for routine screening.",
            status: "Completed"
        }
    ]
};

export const useVisitHistory = () => {
    const [data, setData] = useState<UserVisitHistory | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        fetchHistory();
    }, []);

    return {
        data,
        isLoading,
        refresh: fetchHistory
    };
};
