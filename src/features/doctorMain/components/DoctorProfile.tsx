// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import { Button } from "@/components/ui/button";
// import { User, Calendar } from "lucide-react";

// import HeaderSection from "./ProfileHeaderSection";
// import ProfileForm from "./ProfileForm";
// import SlotTabs from "./SlotTabs";

// const DoctorProfile = () => {
//   const navigate = useNavigate();
//   const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
//   const [offlineUnavailableDates, setOfflineUnavailableDates] = useState<Date[]>([]);

//   return (
//     <div className="min-h-screen pb-20 lg:pb-8">
//       <HeaderSection
//         title="Doctor Profile & Slot Management"
//         onBack={() => navigate("/")}
//       />

//       <div className="mx-4 lg:mx-8">
//         <Tabs defaultValue="profile" className="w-full">
//           <TabsList className="glass-strong w-full justify-start mb-6 p-1.5 h-auto">
//             <TabsTrigger value="profile" className="rounded-xl">
//               <User className="w-4 h-4 mr-2" /> Profile Updation
//             </TabsTrigger>
//             <TabsTrigger value="slots" className="rounded-xl">
//               <Calendar className="w-4 h-4 mr-2" /> Slot Management
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="profile">
//             <ProfileForm />
//           </TabsContent>

//           <TabsContent value="slots">
//             <SlotTabs
//               unavailableDates={unavailableDates}
//               setUnavailableDates={setUnavailableDates}
//               offlineUnavailableDates={offlineUnavailableDates}
//               setOfflineUnavailableDates={setOfflineUnavailableDates}
//             />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default DoctorProfile;
