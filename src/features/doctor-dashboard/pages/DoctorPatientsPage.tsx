import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { DoctorHeader } from "../components/DoctorHeader";
import { GlassyNavigation } from "../components/GlassyNavigation";
import { BottomNavigation } from "../components/BottomNavigation";
import { useAppSelector } from "../../../store/hooks";
import { doctorSelector } from "../../doctor-auth/slice/doctorSlice";
import { DoctorAppointmentsLoader } from "../components/DoctorAppointmentsLoader";
import { useDoctorPatients } from "../hooks/useDoctorPatients";
import { DoctorPatientCard } from "../components/DoctorPatientCard";
import { EmptyPatients } from "../components/EmptyPatients";
import "../../../theme/doctor.css";

const DoctorPatientsPage = () => {
  const { fullName } = useAppSelector(doctorSelector);
  const { patients, isLoading, searchQuery, setSearchQuery, handlePatientClick } = useDoctorPatients();

  return (
    <div className="doctor-theme min-h-screen pb-48 md:pb-8">
      <DoctorHeader
        doctorName={fullName ? `Dr. ${fullName}` : "Sarah"}
        avatarUrl="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
        rating={4.9}
        patientCount={850}
      />

      <GlassyNavigation />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 mt-10 space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-semibold text-slate-900 tracking-tight leading-none">
              My Patients
            </h1>
            <p className="text-[14px] font-bold text-slate-400 mt-3">
              View and manage patient medical records
            </p>
          </div>

          <div className="relative group w-full md:w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
            <input
              type="text"
              placeholder="Search patients by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 bg-white border border-slate-200 rounded-[1.2rem] text-[13px] font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-sm hover:border-primary/40"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-40"
              >
                <DoctorAppointmentsLoader />
              </motion.div>
            ) : patients.length > 0 ? (
              <motion.div 
                key="content"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {patients.map((patient) => (
                  <DoctorPatientCard 
                    key={patient.id} 
                    patient={patient} 
                    onClick={handlePatientClick} 
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col items-center justify-center py-32 bg-white/40 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[3rem]"
              >
                <EmptyPatients hasSearchQuery={!!searchQuery} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default DoctorPatientsPage;
