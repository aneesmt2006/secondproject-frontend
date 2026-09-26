import {
  Calendar,
  Clock,
  AlertCircle,
  MessageSquare,
  Video,
  Settings,
  CalendarCheck,
  Users,
} from "lucide-react";
import { DoctorHeader } from "../components/DoctorHeader";
import { GlassyNavigation } from "../components/GlassyNavigation";
import { StatsCard } from "../components/StatsCard";
import { QuickActionCard } from "../components/QuickActionCard";
import { BottomNavigation } from "../components/BottomNavigation";
import "../../../theme/doctor.css";
import { useAppSelector } from "../../../store/hooks";
import { doctorSelector } from "../../doctor-auth/slice/doctorSlice";
import { useEffect } from "react";
import { animate } from "framer-motion";
import { useDoctorDashboardStats } from "../hooks/useDoctorDashboardStats";
// import { useToast } from "@/hooks/use-toast";

const DoctorDashPage = () => {
  const {fullName} = useAppSelector(doctorSelector)
  const { stats, isLoading } = useDoctorDashboardStats();
  //   const { toast } = useToast();

  const handleAction = (action: string) => {
    // toast({
    //   title: "Action Triggered",
    //   description: `You clicked on ${action}`,
    // });
  };

  useEffect(() => {
    const controls = animate(window.scrollY, 0, {
    duration: 0.5,   // ?? 1 seconds slow scroll
    ease: "easeInOut",
    onUpdate: (latest) => window.scrollTo(0, latest),
  });
  return () => controls.stop();
  });
  return (
    <>
      <div className="doctor-theme min-h-screen pb-48 md:pb-8">
        <DoctorHeader
          doctorName={fullName?`Dr. ${fullName}`:`Pls update profile`}
          avatarUrl="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
          rating={4.9}
          patientCount={850}
        />

        <GlassyNavigation />

        <main className="max-w-7xl mx-auto px-4 lg:px-8 space-y-6">
          {/* Daily Overview Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">
                Your Daily Overview
              </h2>
              <button className="text-xs text-primary font-medium hover:underline">
                View All
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <StatsCard
                icon={Calendar}
                title="Today's Appointments"
                value={stats?.todayAppointments || 0}
                subtitle="Scheduled for today"
                iconColor="bg-primary/10 text-primary"
              />
              <StatsCard
                icon={Clock}
                title="Upcoming Appointments"
                value={stats?.upcomingAppointments || 0}
                subtitle="Appointments ahead"
                iconColor="bg-medical-info/10 text-medical-info"
              />
              <StatsCard
                icon={Users}
                title="Total Patients"
                value={stats?.totalPatients || 0}
                subtitle="Active under your care"
                iconColor="bg-indigo-100 text-indigo-600"
              />
            </div>
          </section>

          {/* Quick Actions Section */}
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <QuickActionCard
                icon={CalendarCheck}
                title="Manage Appointments"
                description="Access all your scheduled and past appointments to view and update."
                buttonText="View Appointments"
                onAction={() => handleAction("Manage Appointments")}
                iconBgColor="bg-primary"
              />
              <QuickActionCard
                icon={Video}
                title="Initiate Consultation"
                description="Start a live video call with an active patient appointment."
                buttonText="Start Video Call"
                onAction={() => handleAction("Initiate Consultation")}
                iconBgColor="bg-medical-info"
              />
              <QuickActionCard
                icon={Settings}
                title="Customize Profile"
                description="Manage your personal details, consultation fees, and availability slots."
                buttonText="Update Profile"
                onAction={() => handleAction("Customize Profile")}
                iconBgColor="bg-medical-success"
              />
            </div>
          </section>


        </main>

        <BottomNavigation />
      </div>
    </>
  );
};

export default DoctorDashPage;

