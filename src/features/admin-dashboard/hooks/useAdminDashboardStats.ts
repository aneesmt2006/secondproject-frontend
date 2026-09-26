import { useState, useEffect } from 'react';
import { AdminDashboardStatsData } from '../types/adminDashboard.type';
import { getAdminDashboardStats } from '@/services/api/appoinment.service';
import { toast } from 'sonner';

export const useAdminDashboardStats = (initialPeriod: 'daily' | 'monthly' | 'yearly' = 'monthly') => {
  const [data, setData] = useState<AdminDashboardStatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<'daily' | 'monthly' | 'yearly'>(initialPeriod);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAdminDashboardStats(period);
        if (response.success && response.data) {
          setData(response.data);
        } else {
          throw new Error(response.message || 'Failed to load dashboard data');
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || err.message || 'Failed to fetch dashboard stats');
        toast.error(err?.response?.data?.message || err.message || 'Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [period]);

  return { data, loading, error, period, setPeriod };
};

