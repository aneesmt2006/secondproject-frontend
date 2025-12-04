import { useState, useMemo } from 'react';
import { Doctor } from '../types';
import { useDoctors } from '../hooks/useDoctors';
import { useDoctorFilters } from '../hooks/useDoctorFilters';
import DoctorStats from '../components/DoctorStats';
import DoctorFilters from '../components/DoctorFilters';
import DoctorsTable from '../components/DoctorsTable';
import DoctorDetailModal from '../components/DoctorDetailModal';

const DoctorManagement = () => {
  const { doctors, updateStatus } = useDoctors();
  const {
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
  } = useDoctorFilters(doctors);

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const specializations = useMemo(
    () => Array.from(new Set(doctors.map((d) => d.specialization))),
    [doctors]
  );

  const handleUpdateStatus = async (
    id: string,
    newStatus: Doctor['status'],
    selectedDR: Doctor
  ) => {
    const success = await updateStatus(id, newStatus);
    if (success && selectedDoctor?.id === selectedDR.id) {
      setSelectedDoctor({ ...selectedDR, status: newStatus });
    }
  };

  const viewDoctorProfile = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-cocoa mb-8">Doctor Management</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-cocoa mb-4">
          Doctor Applications Overview
        </h2>
        <DoctorStats doctors={doctors} />
      </div>

      <DoctorFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        specializationFilter={specializationFilter}
        setSpecializationFilter={setSpecializationFilter}
        locationFilter={locationFilter}
        setLocationFilter={setLocationFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        specializations={specializations}
        onApply={() => {}} // Filters are applied reactively in the hook
        onReset={resetFilters}
      />

      <DoctorsTable
        doctors={filteredDoctors}
        onViewProfile={viewDoctorProfile}
        onUpdateStatus={handleUpdateStatus}
      />

      <DoctorDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctor={selectedDoctor}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default DoctorManagement;
