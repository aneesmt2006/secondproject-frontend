import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, ChevronLeft } from "lucide-react";
import appoinmentImage from "../../../../assets/images/appoinment1.png";

interface AppointmentHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const AppointmentHero = ({ searchQuery, setSearchQuery }: AppointmentHeroProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center bg-transparent">
        <div className="origin-top scale-[0.90] pt-28 pb-1 md:pb-14 lg:pb-16 px-4 md:px-6 lg:px-10 max-w-7xl mx-auto bg-transparent relative">
          
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-16 md:top-28 left-4 md:left-10 z-20 w-10 h-10 rounded-full bg-white/70 backdrop-blur-md shadow-sm border border-white/50 flex items-center justify-center text-[#5A3A2E] hover:bg-white transition-all lg:hidden"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-20">
            {/* Left */}
            <div className="flex-1 space-y-5 md:space-y-7 text-center md:text-left">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2 bg-white/70 backdrop-blur-xl rounded-full 
        border border-white/60 shadow-card transition-smooth"
              >
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#E0825C] animate-pulse" />
                <span className="text-[9px] md:text-[11px] font-semibold text-[#E0825C] tracking-[0.2em] uppercase">
                  Verified Specialists in Payyanur
                </span>
              </div>

              <h1 className="font-bold leading-tight tracking-tight text-[#5A3A2E] text-4xl md:text-5xl lg:text-[4.5rem]">
                Find the Perfect
                <br />
                <span className="text-[#E0825C] font-semibold">
                  Care Partner
                </span>
              </h1>

              <p className="text-sm md:text-[17px] text-[#7C6C64] max-w-md mx-auto md:mx-0 leading-relaxed font-normal opacity-90">
                Book appointments with top-rated gynecologists and obstetricians
                near you. Expert care for your beautiful journey.
              </p>

              {/* Desktop Search */}
              <div className="hidden md:block relative max-w-lg group pt-4">
                <div
                  className="absolute inset-0 bg-[#E0825C]/15 rounded-full blur-2xl 
        opacity-0 group-hover:opacity-100 transition-all"
                />
                <div
                  className="relative flex items-center bg-white rounded-full pl-6 pr-2 py-3
        shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-white/60"
                >
                  <Search className="w-5 h-5 text-[#979797]" />
                  <input
                    type="text"
                    placeholder="Search doctor, hospital or specialty..."
                    className="flex-1 bg-transparent outline-none ml-3 text-[15px] text-[#5A3A2E] 
            placeholder:text-[#B6AFA7]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="w-12 h-12 bg-[#E0825C] rounded-full text-white flex items-center justify-center shadow-card 
          hover:bg-[#CC7254] active:scale-95 transition-smooth"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="flex-1 flex justify-center relative w-full">
              <div className="rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.10)] w-full max-w-md md:max-w-full">
                <img
                  src={appoinmentImage}
                  alt="Doctor Consultation"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Mobile Search (Below Image) */}
            <div className="md:hidden w-full relative group">
                <div
                  className="relative flex items-center bg-white rounded-full pl-5 pr-1.5 py-2
        shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-white/60"
                >
                  <Search className="w-4 h-4 text-[#979797]" />
                  <input
                    type="text"
                    placeholder="Search doctor..."
                    className="flex-1 bg-transparent outline-none ml-3 text-sm text-[#5A3A2E] 
            placeholder:text-[#B6AFA7]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    className="w-9 h-9 bg-[#E0825C] rounded-full text-white flex items-center justify-center shadow-card 
          hover:bg-[#CC7254] active:scale-95 transition-smooth"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
  );
};
