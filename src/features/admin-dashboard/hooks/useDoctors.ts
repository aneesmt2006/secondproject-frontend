import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Doctor } from '../types';
import { getAllDoctors, updateDoctorStatus } from '../../../services/api/auth.service';
import { getAllDoctorsProfile } from '../../../services/api/users-management.service';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const [doctorsRes, profilesRes] = await Promise.all([
        getAllDoctors(),
        getAllDoctorsProfile(),
      ]);

      if (doctorsRes.data && profilesRes.data) {
        const doctorsList = doctorsRes.data;
        const profilesList = profilesRes.data;

        const mergedDoctors: Doctor[] = doctorsList
          .filter((doc) => profilesList.some((p) => p.doctorId === doc.id))
          .map((doc) => {
            const profile = profilesList.find((p) => p.doctorId === doc.id)!;
            return {
              id: doc.id!,
              full_name: doc.fullName!,
              email: doc.email!,
              specialization: doc.specialization!,
              location: profile.address || 'N/A',
              fee: profile.online_fee || '0',
              status: (doc.status as Doctor['status']) || 'pending',
              total_appointments: 0, // Placeholder as per original code
              avatar_url: profile.profileImageLink,
              experience_years: profile.experience,
              qualifications: profile.certificateLinks,
              bio: '', // Placeholder
              doctorId: profile.doctorId,
            };
          });

        setDoctors(mergedDoctors);
      }
    } catch (error) {
      console.error('Error loading doctors:', error);
      toast.error('Failed to load doctors data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);

  const updateStatus = async (id: string, newStatus: Doctor['status']) => {
    try {
      const response = await updateDoctorStatus(id, newStatus);
      if (response) {
        toast.info(response.message);
        setDoctors((prev) =>
          prev.map((doc) =>
            doc.doctorId === id ? { ...doc, status: newStatus } : doc
          )
        );
        return true;
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
      return false;
    }
    return false;
  };

  return {
    doctors,
    loading,
    updateStatus,
    refreshDoctors: loadDoctors,
  };
};
