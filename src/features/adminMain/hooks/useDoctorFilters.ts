import { useState, useMemo } from 'react';
import { Doctor } from '../types';

export const useDoctorFilters = (doctors: Doctor[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDoctors = useMemo(() => {
    let filtered = doctors;

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.full_name.toLowerCase().includes(lowerTerm) ||
          d.email.toLowerCase().includes(lowerTerm)
      );
    }

    if (specializationFilter !== 'all') {
      filtered = filtered.filter((d) => d.specialization === specializationFilter);
    }

    if (locationFilter) {
      const lowerLoc = locationFilter.toLowerCase();
      filtered = filtered.filter((d) =>
        d.location.toLowerCase().includes(lowerLoc)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((d) => d.status === statusFilter);
    }

    return filtered;
  }, [doctors, searchTerm, specializationFilter, locationFilter, statusFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setSpecializationFilter('all');
    setLocationFilter('');
    setStatusFilter('all');
  };

  return {
    searchTerm,
    setSearchTerm,
    specializationFilter,
    setSpecializationFilter,
    locationFilter,
    setLocationFilter,
    statusFilter,
    setStatusFilter,
    filteredDoctors,
    resetFilters,
  };
};
