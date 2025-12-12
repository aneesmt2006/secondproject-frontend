import { motion } from "framer-motion";
import { Star, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { doctors } from "../../lib/mockData";

interface DoctorListProps {
  filteredDoctors: typeof doctors;
  setSelectedDoctor: (doctor: (typeof doctors)[0]) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const DoctorList = ({ filteredDoctors, setSelectedDoctor, setIsModalOpen }: DoctorListProps) => {
  return (
      <div className="mt-8 md:mt-10 px-4 lg:px-8 max-w-6xl mx-auto grid grid-cols-2 gap-3 md:gap-6">
        {filteredDoctors.length ? filteredDoctors?.map((doctor, i) => (
          <motion.div
            key={doctor.doctorId || i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white/60 backdrop-blur-xl border border-white/80 rounded-[20px] md:rounded-[24px] p-2.5 md:p-5
            shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-4px_rgba(0,0,0,0.1)]
            transition-all duration-300 hover:-translate-y-1 flex flex-col sm:flex-row gap-3 md:gap-6 items-start text-center sm:text-left"
          >
            {/* Doctor Image Container */}
            <div className="relative shrink-0 self-center sm:self-start">
              <div className="w-16 h-16 md:w-28 md:h-28 rounded-[14px] md:rounded-[18px] overflow-hidden shadow-sm group-hover:border-[#E0825C]/20 transition-colors">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Rating badge */}
              <div className="absolute -bottom-2 md:-bottom-3 left-1/2 -translate-x-1/2 bg-white/95 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full shadow-sm 
              flex items-center gap-1 border border-gray-100 min-w-max">
                <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] md:text-[11px] font-bold text-gray-700">{doctor.rating}</span>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex-1 w-full space-y-1.5 md:space-y-3 flex flex-col min-h-0 md:min-h-[110px]">
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-1">
                <div className="w-full">
                  <h3 className="text-sm md:text-lg font-bold text-[#4B2E05] leading-tight md:leading-snug group-hover:text-[#d07550] transition-colors truncate">
                    {doctor.name}
                  </h3>
                  <p className="text-[11px] md:text-sm text-[#d99a5b] font-semibold mt-0.5 truncate">
                    {doctor.specialty}
                  </p>
                </div>

                {/* Status Badge */}
                <span className={`inline-flex text-[10px] uppercase tracking-wider px-2 py-0.5 md:px-2.5 md:py-1 rounded-full font-bold whitespace-nowrap border 
                  ${doctor.availability.includes('Slots Available') 
                    ? 'bg-[#A7F3D0] text-[#065F46] border-[#065F46]/20' 
                    : 'bg-red-50 text-red-600 border-red-100'}`}>
                  {doctor.availability.includes('Slots Available') ? 'Available Today' : 'Unavailable'}
                </span>
              </div>

              {/* Location */}
              <div className="hidden md:flex items-center gap-1.5 text-xs text-[#7a6f66] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#7a6f66]" />
                <span className="line-clamp-1">{doctor.location || 'Online Consultation'}</span>
              </div>

              {/* Tags Section */}
              {doctor.tags && doctor.tags.length > 0 && (
                <div className="hidden md:flex flex-wrap gap-1.5 mt-1">
                  {doctor.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-[#f4ebe5] text-[#7a6f66] text-[10px] rounded-md border border-[#eaddd5] font-medium truncate max-w-[100px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer: Fee + Button */}
              <div className="pt-2 md:pt-3 mt-auto flex flex-col sm:flex-row items-center sm:justify-between border-t border-dashed border-[#e6d0c2] gap-2 sm:gap-0 w-full">
                <div className="flex flex-col items-center sm:items-start leading-none">
                  <span className="hidden md:block text-[10px] text-[#7a6f66] font-bold uppercase tracking-wider mb-0.5">Consultation Fee</span>
                  <span className="text-sm md:text-lg font-bold text-[#4B2E05]">
                    ₹{doctor.consultationFee}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setIsModalOpen(true);
                  }}
                  className="w-full sm:w-auto bg-[#E0825C] text-white hover:bg-[#d07550] px-3 py-1.5 md:px-5 md:py-2 rounded-lg md:rounded-xl
                  text-xs md:text-sm font-semibold shadow-md shadow-[#E0825C]/20 hover:shadow-[#d07550]/30 
                  transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2 group/btn"
                >
                  <span className="hidden sm:inline">Book Visit</span>
                  <span className="sm:hidden">Book</span>
                  <CalendarIcon className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )):<p>No doctors ava</p>}
      </div>
  );
};
