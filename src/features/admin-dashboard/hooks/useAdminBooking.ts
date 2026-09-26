import { useState, useEffect, useCallback } from 'react';
import { getAdminBookingStats, getAdminBookingList } from '@/services/api/appoinment.service';
import { AdminBookingStats, AdminAppointment } from '../types/booking.type';
import { toast } from 'sonner';

export const useAdminBooking = () => {
  const [stats, setStats] = useState<AdminBookingStats | null>(null);
  const [bookings, setBookings] = useState<AdminAppointment[]>([]);
  const [loadingStats, setLoadingStats] = useState<boolean>(true);
  const [loadingList, setLoadingList] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const limit = 10;

  const fetchStats = useCallback(async () => {
    try {
      setLoadingStats(true);
      const response = await getAdminBookingStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch booking statistics');
    } finally {
      setLoadingStats(false);
    }
  }, []);

  const fetchBookings = useCallback(async (page: number) => {
    try {
      setLoadingList(true);
      const response = await getAdminBookingList(page, limit);
      if (response.success && response.data) {
        setBookings(response.data.appointments);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setTotalCount(response.data.totalCount);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to fetch bookings list');
    } finally {
      setLoadingList(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage, fetchBookings]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return {
    stats,
    bookings,
    loadingStats,
    loadingList,
    currentPage,
    totalPages,
    totalCount,
    handlePageChange,
    refreshData: () => {
      fetchStats();
      fetchBookings(currentPage);
    }
  };
};
