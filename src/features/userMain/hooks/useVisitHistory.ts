import { useState, useEffect } from "react";
import { getUserVisitHistory } from "@/services/api/appoinment.service";
import { UserVisitHistory } from "@/types/appointments.type";

export const useVisitHistory = () => {
    const [data, setData] = useState<UserVisitHistory | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHistory = async () => {
        try {
            setIsLoading(true);
            const response = await getUserVisitHistory();
            if (response.success) {
                setData(response.data!);
            } else {
                setError(response.message || "Failed to fetch history");
            }
        } catch (err) {
            console.error("Error fetching visit history:", err);
            setError("Something went wrong while fetching visit history");
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
        error,
        refresh: fetchHistory
    };
};
