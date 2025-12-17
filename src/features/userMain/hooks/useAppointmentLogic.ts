import { useState, useEffect } from "react";
import { startOfToday, addDays, subDays } from "date-fns";
import { doctorBooking, DoctorSlots } from '@/types/appointments.type';
import { getAllDoctorsApmntProfile } from "@/services/api/users-management.service";
import { getdrEssentialDet } from "../../../services/api/auth.service";
import { useAppSelector } from "@/store/hooks";
import { userSelector } from "@/features/registration/slice/userSlice";
import { appoinmentCreate, getDrAvailableSlots } from "@/services/api/appoinment.service";
import { displayRazorpay } from "../../../utils/displayRazorpay.utils";

export const useAppointmentLogic = () => {
  const userData = useAppSelector(userSelector)
  const [viewStartDate, setViewStartDate] = useState(startOfToday());
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [totalPage,setTotalPage] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(7);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<
    doctorBooking
  >();
  const [selectedDoctorSlots,setSelectedDoctorSlots] = useState<DoctorSlots[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Responsive items count
  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth < 768 ? 5 : 7);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleDates = Array.from({ length: itemsToShow }, (_, i) =>
    addDays(viewStartDate, i)
  );

  const handleNextDatePage = () => setViewStartDate((d) => addDays(d, itemsToShow));
  const handlePrevDatePage = () => setViewStartDate((d) => subDays(d, itemsToShow));

  const categories = ["All", "Obstetrician", "Gynecologist", "Nutritionist"];

  // State for doctors and pagination
  const [filteredDoctors, setFilteredDoctors] = useState<doctorBooking[]>([]);
  const [selectedTimeDate,setSelectedTimeDate] = useState<string|null>(null)
  const [drBasicDet,setDrBasicDet] = useState<{fullName:string,clinicName:string}>()
  const [loading, setLoading] = useState(true);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [page, setPage] = useState(1);
  

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        
        const categoryFilter = selectedCategory === "All" ? "" : selectedCategory;
        
        // Note: The API currently only supports filtering by date and specialization. 
        // Search query (name search) we needddddds backendd supsport to be effective with server-side pagination.
        
        const response = await getAllDoctorsApmntProfile(
          categoryFilter, 
          page
        );

        if (response.data) {
          console.log("data--->",response.data)
          setTotalPage(response.data.pageCounts)
         
          const mappedDoctors = response.data.profiles.map((dr) => ({
            doctorId: dr.doctorId,
            name: dr.doctorName || "Doctor", // Fallback if name is missing
            specialty: dr.specialization,
            qualification: "MBBS", // Placeholder
            location: "Online", // Placeholder
            image: dr.profileImageLink || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200",
            rating: 5.0, // Placeholder
            availability: dr.slots?.length > 0 && !dr.slots.every((s)=>s.status.toLowerCase().includes('past')) ? `${dr.slots.length} Slots Available` : "Unavailable",
            tags: dr.address.split(' '), // Placeholder
            consultationFee: Number(dr.online_fee) || 0,
            slots:dr.slots
          }));
          
          setFilteredDoctors(mappedDoctors);
        } else {
            setFilteredDoctors([]);
        }

      } catch (error) {
        console.log("Failed to fetch doctors:",error );
        
      } finally {
        setLoading(false);
      }
    };

    // Debounce the call if needed, or just call directly
    const timer = setTimeout(fetchDoctors, 300);
    return () => clearTimeout(timer);
  }, [page, selectedCategory, selectedDate, searchQuery]); // Re-fetch when filters change


  useEffect(()=>{
    if(isModalOpen && selectedDoctor?.doctorId){
      const loadTheDoctor=async()=>{
        try {
          const [basicDet,allslots] = await Promise.all([getdrEssentialDet(selectedDoctor?.doctorId),getDrAvailableSlots(selectedDoctor.doctorId,selectedDate)])
           setDrBasicDet(basicDet.data)
           console.log("Slots data,,-->",allslots.data)
           setSelectedDoctorSlots(allslots.data!.slots)
        } catch (error) {
          console.log(error)
        }
      }
      loadTheDoctor()
    }
  },[isModalOpen ,selectedDoctor?.doctorId])


  const handleBooking = async () => {
    if (!selectedTimeDate || !selectedDoctor || !userData.id) return;

    const userId = userData.id;
    const doctorId = selectedDoctor.doctorId as string;
    const [selectedDate, selectedTime] = selectedTimeDate.split(',');
    const amount = selectedDoctor.consultationFee;

    setIsBookingLoading(true);
    try {
      const response = await appoinmentCreate({
        userId,
        doctorId,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        amount
      });

      if (response && response.success) {
        await displayRazorpay({ userId, doctorId, amount });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsBookingLoading(false);
    }
  };
  return {
    viewStartDate,
    setViewStartDate,
    selectedDate,
    setSelectedDate,
    itemsToShow,
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
    loading, // Export loading state
    setPage, // Export pagination control
    page,
    totalPage,
    selectedTimeDate,
    setSelectedTimeDate,
    drBasicDet,
    handleBooking,
    selectedDoctorSlots,
    isBookingLoading
  };
};
