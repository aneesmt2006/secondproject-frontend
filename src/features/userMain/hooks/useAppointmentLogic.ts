import { useState, useEffect } from "react";
import { startOfToday, addDays, subDays } from "date-fns";
import { doctorBooking } from "../lib/mockData";
import { getAllDoctorsSlots } from "../../../services/api/users-management.service";
import { getdrEssentialDet } from "../../../services/api/auth.service";

export const useAppointmentLogic = () => {
  const [viewStartDate, setViewStartDate] = useState(startOfToday());
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [totalPage,setTotalPage] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(7);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<
    doctorBooking
  >();
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [selectedTime,setSelectedTime] = useState<string|null>(null)
  const [drBasicDet,setDrBasicDet] = useState<{fullName:string,clinicName:string}>()
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        
        const categoryFilter = selectedCategory === "All" ? "" : selectedCategory;
        
        // Note: The API currently only supports filtering by date and specialization. 
        // Search query (name search) needs backend support to be effective with server-side pagination.
        
        const response = await getAllDoctorsSlots(
          selectedDate.toISOString(), 
          categoryFilter,
          page
        );

        if (response.data) {
          setTotalPage(response.data.pageCounts)
          // setPage(response.data.pageCounts)
          // Map API response to UI Doctor interface
          const mappedDoctors = response.data.doctorSlots.map((slotData) => ({
            doctorId: slotData.doctorId,
            name: slotData.doctorName || "Doctor", // Fallback if name is missing
            specialty: slotData.specialization,
            qualification: "MBBS", // Placeholder
            location: "Online", // Placeholder
            image: slotData.profileImageLink || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200",
            rating: 5.0, // Placeholder
            availability: slotData.slots?.length > 0 && !slotData.slots.every((s:any)=>s.status.toLowerCase().includes('past')) ? `${slotData.slots.length} Slots Available` : "Unavailable",
            tags: slotData.address.split(' '), // Placeholder
            consultationFee: Number(slotData.online_fee) || 0,
            slots:slotData.slots
          }));
          
          setFilteredDoctors(mappedDoctors);
        } else {
            setFilteredDoctors([]);
        }

      } catch (error) {
        console.error("Failed to fetch doctors:", error);
        // Optional: toast.error("Failed to load doctors");
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
          const response = await getdrEssentialDet(selectedDoctor?.doctorId)
           setDrBasicDet(response.data)
        } catch (error) {
          console.log(error)
        }
      }
      loadTheDoctor()
    }
  },[isModalOpen ,selectedDoctor?.doctorId])

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
    selectedTime,
    setSelectedTime,
    drBasicDet
  };
};
