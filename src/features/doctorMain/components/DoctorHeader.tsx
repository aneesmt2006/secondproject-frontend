// import { Bell, User } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// // import { Badge } from "@/components/ui/badge";

// interface DoctorHeaderProps {
//   doctorName: string;
//   avatarUrl?: string;
//   rating?: number;
//   patientCount?: number;
// }

// export const DoctorHeader = ({ doctorName, avatarUrl, rating = 4.9, patientCount = 850 }: DoctorHeaderProps) => {
//   return (
//     <div className="glass-strong rounded-3xl p-4 mx-4 lg:mx-8 mt-6 mb-6">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <Avatar className="h-12 w-12 ring-2 ring-primary/20 relative">
//             <AvatarImage src={avatarUrl} alt={doctorName} />
//             <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
//               {doctorName.split(' ').map(n => n[0]).join('').slice(0, 3).toUpperCase()}
//             </AvatarFallback>
//             <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-medical-success border-2 border-white"></span>
//           </Avatar>
//           <div>
//             <h1 className="text-xl font-bold text-foreground">
//               Hello, {doctorName}!
//             </h1>
//             <button className="text-xs text-primary hover:underline font-medium">
//               View Your Profile & Settings →
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center gap-6">
//           <div className="hidden sm:flex items-center gap-4">
//             <div className="text-right">
//               <p className="text-2xl font-bold text-foreground">{rating}</p>
//               <p className="text-xs text-muted-foreground">Rating</p>
//             </div>
//             <div className="text-right">
//               <p className="text-2xl font-bold text-foreground">{patientCount}+</p>
//               <p className="text-xs text-muted-foreground">Patients</p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-2">
//             <button className="glass-card p-2 rounded-xl glass-hover relative">
//               <Bell className="w-4 h-4 text-foreground" />
//               <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-white text-[10px] flex items-center justify-center font-bold">
//                 3
//               </span>
//             </button>
//             <button className="glass-card p-2 rounded-xl glass-hover">
//               <User className="w-4 h-4 text-foreground" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from "@/components/ui/badge";

interface DoctorHeaderProps {
  doctorName: string;
  avatarUrl?: string;
  rating?: number;
  patientCount?: number;
}

export const DoctorHeader = ({ doctorName, avatarUrl, rating = 4.9, patientCount = 850 }: DoctorHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="glass-strong rounded-3xl p-4 mx-4 lg:mx-8 mt-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 ring-2 ring-primary/20 relative">
            <AvatarImage src={avatarUrl} alt={doctorName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
              {doctorName.split(' ').map(n => n[0]).join('').slice(0, 3).toUpperCase()}
            </AvatarFallback>
            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-medical-success border-2 border-white"></span>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              Hello, {doctorName}!
            </h1>
            <button 
              onClick={() => navigate("/doctor/profile")}
              className="text-xs text-primary hover:underline font-medium"
            >
              View Your Profile & Settings →
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{rating}</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">{patientCount}+</p>
              <p className="text-xs text-muted-foreground">Patients</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="glass-card p-2 rounded-xl glass-hover relative">
              <Bell className="w-4 h-4 text-foreground" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-white text-[10px] flex items-center justify-center font-bold">
                3
              </span>
            </button>
            <button 
              onClick={() => navigate("/doctor/profile")}
              className="glass-card p-2 rounded-xl glass-hover"
            >
              <User className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

