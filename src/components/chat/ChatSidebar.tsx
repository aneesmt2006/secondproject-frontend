import { ChatContact } from "./types";

interface ChatSidebarProps {
  doctors: ChatContact[];
  selectedDoctorId: string | null;
  onSelectDoctor: (id: string) => void;
  isMobileSidebarOpen: boolean;
  isDoctor?: boolean;
}

export const ChatSidebar = ({
  doctors,
  selectedDoctorId,
  onSelectDoctor,
  isMobileSidebarOpen,
  isDoctor = false
}: ChatSidebarProps) => {

  const themeColorText = isDoctor ? "text-primary" : "text-[#E0825C]";
  const themeColorBorder = isDoctor ? "border-primary/20" : "border-[#E0825C]/20";
  const themeColorBorderSelected = isDoctor ? "border-primary ring-primary/20" : "border-[#E0825C] ring-[#E0825C]/20";
  const themeColorHoverBorder = isDoctor ? "hover:border-primary/30" : "hover:border-[#E0825C]/30";
  const themeColorGradient = isDoctor ? "from-primary/20" : "from-[#E0825C]/20";

  return (
    <div
      className={`
        w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col border-r ${themeColorBorder} 
        bg-white/40 backdrop-blur-xl h-full transition-all duration-300
        ${!isMobileSidebarOpen ? "hidden md:flex" : "flex"}
      `}
    >
      <div className={`p-4 border-b ${themeColorBorder} bg-white/50 backdrop-blur-md`}>
        <h2 className={`text-xl font-bold ${themeColorText}`}>{isDoctor ? "Patient Updates" : "Chat Support"}</h2>
        <p className={`text-xs ${isDoctor ? "text-gray-500" : "text-[#5A2D0C]/70"} mt-1`}>
          {isDoctor ? "Securely chat with your patients" : "Chat securely with our medical professionals"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-2 pb-24 md:pb-2 space-y-2">
        {doctors?.map((doctor) => {
          const isSelected = doctor.id === selectedDoctorId;

          return (
            <div
              key={doctor.id}
              onClick={() => onSelectDoctor(doctor.id)}
              className={`
                flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200
                hover:bg-white/80 active:scale-95 border
                ${isSelected 
                  ? `bg-white/90 shadow-sm ring-1 ${themeColorBorderSelected}` 
                  : `bg-white/40 border-transparent ${themeColorHoverBorder}`}
              `}
            >
              <div className="relative">
                <img
                  src={doctor.avatarUrl}
                  alt={doctor.name}
                  className={`w-12 h-12 rounded-full object-cover shadow-sm bg-gradient-to-tr ${themeColorGradient} to-transparent`}
                />
                <div
                  className={`
                    absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                    ${doctor.isOnline ? "bg-emerald-500" : "bg-gray-400"}
                  `}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className={`text-sm font-semibold truncate ${isSelected ? themeColorText : 'text-gray-800'}`}>
                    {doctor.name}
                  </h3>
                </div>
                {doctor.specialty && (
                   <p className="text-xs text-gray-500 truncate mt-0.5">{doctor.specialty}</p>
                )}
                {!doctor.isOnline && doctor.lastSeen && (
                  <p className="text-[10px] text-gray-400 mt-1">Last seen {doctor.lastSeen}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
