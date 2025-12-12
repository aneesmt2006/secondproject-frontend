import { DesktopNavbar } from "../components/DesktopNavbar";
import { motion } from "framer-motion";
import { useAppointmentLogic } from "../hooks/useAppointmentLogic";
import { AppointmentHero } from "../components/appointments/AppointmentHero";
import { DateSelector } from "../components/appointments/DateSelector";
import { CategoryFilter } from "../components/appointments/CategoryFilter";
import { DoctorList } from "../components/appointments/DoctorList";
import { BookingModal } from "../components/appointments/BookingModal";

const AppointmentPage = () => {
  const {
    viewStartDate,
    setViewStartDate,
    selectedDate,
    setSelectedDate,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedDoctor,
    setSelectedDoctor,
    isModalOpen,
    setIsModalOpen,
    isCalendarOpen,
    setIsCalendarOpen,
    visibleDates,
    handleNextDatePage,
    handlePrevDatePage,
    categories,
    filteredDoctors,
    loading,
    page,
    setPage,
    totalPage,
    selectedTime,
    setSelectedTime,
    drBasicDet
  } = useAppointmentLogic();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,hsl(24_100%_93%)_0%,hsl(22_95%_82%)_40%,hsl(18_80%_70%)_100%)] font-outfit pb-32">
      <DesktopNavbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="origin-top mx-auto" 
        style={{ transformOrigin: 'top center' }}
      >
        
        <AppointmentHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Date + Filter Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-1 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 
          flex flex-col md:flex-row items-center md:items-center 
          gap-4 md:gap-8"
        >
          
          <DateSelector
            viewStartDate={viewStartDate}
            setViewStartDate={setViewStartDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            isCalendarOpen={isCalendarOpen}
            setIsCalendarOpen={setIsCalendarOpen}
            visibleDates={visibleDates}
            handleNextDatePage={handleNextDatePage}
            handlePrevDatePage={handlePrevDatePage}
          />

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.4, duration: 0.5 }}
        >
          {!loading && (
            <DoctorList
              filteredDoctors={filteredDoctors}
              setSelectedDoctor={setSelectedDoctor}
              setIsModalOpen={setIsModalOpen}
            />
          )}
        </motion.div>
        
        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0 || loading}
            className="px-4 py-2 rounded-lg bg-white/50 hover:bg-white/80 disabled:opacity-50 transition-colors text-sm font-medium text-gray-700"
          >
            Previous
          </button>
          {/* <span className="text-sm font-medium text-gray-600">Page {page + 1}</span> */}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={loading || filteredDoctors.length >= totalPage}
            className="px-4 py-2 rounded-lg bg-white/50 hover:bg-white/80 disabled:opacity-50 transition-colors text-sm font-medium text-gray-700"
          >
            Next
          </button>
        </div>

        <BookingModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedDoctor={selectedDoctor||null}
          slots={selectedDoctor?.slots}
          selectTime={selectedTime}
          setSelectTime={setSelectedTime}
          drbasicData={drBasicDet}
        />
      </motion.div>
    </div>
  );
};

export default AppointmentPage;
