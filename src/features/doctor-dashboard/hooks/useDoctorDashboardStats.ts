import { useState, useEffect } from "react";
import { getDoctorDashboardStats } from "@/services/api/appoinment.service";
import { DoctorDashboardStatsData } from "@/types/appointments.type";

export const useDoctorDashboardStats = () => {
  const [stats, setStats] = useState<DoctorDashboardStatsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await getDoctorDashboardStats();
        if (response.success && response.data) {
          setStats(response.data);
        } else {
          setError(response.message || "Failed to fetch stats");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch stats");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, isLoading, error };
};
