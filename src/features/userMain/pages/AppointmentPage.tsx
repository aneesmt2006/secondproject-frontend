import { motion, AnimatePresence } from "framer-motion";
import { DesktopNavbar } from '@/features/userMain/components/DesktopNavbar';
import { useAppointmentLogic } from "../hooks/useAppointmentLogic";
import { AppointmentHero } from '@/features/userMain/components/appointments/AppointmentHero';
import { DateSelector } from '@/features/userMain/components/appointments/DateSelector';
import { CategoryFilter } from '@/features/userMain/components/appointments/CategoryFilter';
import { DoctorList } from '@/features/userMain/components/appointments/DoctorList';
import { BookingModal } from '@/features/userMain/components/appointments/BookingModal';

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
    selectedTimeDate,
    setSelectedTimeDate,
    handleBooking,
    selectedDoctorSlots,
    isBookingLoading,
    isRecurring,
    setIsRecurring
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
          flex flex-col md:flex-row items-center 
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

        {/* Content Area with smooth transitions and min-height */}
        <div className=" mt-8">
           <AnimatePresence mode="wait">
             {loading ? (
                <motion.div 
                  key="loader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-center items-center h-[300px] md:h-[400px]"
                >
                   <div className="animate-spin rounded-full h-10 w-10 md:h-14 md:w-14 border-b-4 border-cocoa border-t-transparent shadow-lg shadow-orange-500/20"></div>
                </motion.div>
             ) : (
                <motion.div
                  key="list"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <DoctorList
                    filteredDoctors={filteredDoctors}
                    setSelectedDoctor={setSelectedDoctor}
                    setIsModalOpen={setIsModalOpen}
                  />
                </motion.div>
             )}
           </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
            className="px-4 py-2 rounded-lg bg-white/50 hover:bg-white/80 disabled:opacity-50 transition-colors text-sm font-medium text-gray-700"
          >
            Previous
          </button>
          {/* <span className="text-sm font-medium text-gray-600">Page {page + 1}</span> */}
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={loading || filteredDoctors.length <= totalPage-filteredDoctors.length}
            className="px-4 py-2 rounded-lg bg-white/50 hover:bg-white/80 disabled:opacity-50 transition-colors text-sm font-medium text-gray-700"
          >
            Next
          </button>
        </div>

        <BookingModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedDoctor={selectedDoctor||null}
          slots={selectedDoctorSlots}
          selectTime={selectedTimeDate}
          setSelectTime={setSelectedTimeDate}
          onConfirm={handleBooking}
          loading={isBookingLoading}
          isRecurring={isRecurring}
          setIsRecurring={setIsRecurring}
        />
      </motion.div>
    </div>
  );
};

export default AppointmentPage;
