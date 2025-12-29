import { AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Download, 
  CheckCircle2,
  FileText,
  History,
  FlaskConical,
  Pill,
  LayoutDashboard
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMedicalRecord } from "../hooks/useMedicalRecord";
import { PatientHeader } from "../components/medical-record/PatientHeader";
import { VitalsGrid } from "../components/medical-record/VitalsGrid";
import { OverviewTab } from "../components/medical-record/OverviewTab";
import { ClinicalHistory } from "../components/medical-record/ClinicalHistory";
import { LabResults } from "../components/medical-record/LabResults";
import { PrescriptionNotebook } from "../components/medical-record/PrescriptionNotebook";
import "../../../theme/doctor.css";

const MedicalRecordPage = () => {
  const navigate = useNavigate();
  const { 
    activeTab, 
    setActiveTab, 
    patient 
  } = useMedicalRecord();

  // Show loading state while patient data is being fetched
  if (!patient) {
    return (
      <div className="doctor-theme min-h-screen pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-slate-600 font-medium">Loading patient data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="doctor-theme min-h-screen pb-20">
      {/* Background handled by .doctor-theme::before */}
      
      {/* Floating Top Elements - Scrollable */}
      <div className="w-full py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)}
                className="rounded-full bg-white/90 hover:bg-white shadow-lg border border-slate-200/50 backdrop-blur-sm transition-all hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </Button>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-slate-200/50">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">Medical Dashboard</h1>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1.5">Digital Health Folder</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" className="rounded-xl border-slate-200 bg-white/90 backdrop-blur-sm shadow-lg h-10 text-xs font-bold gap-2 hover:bg-white transition-all hover:scale-105">
                <Download className="w-4 h-4" /> Export All
             </Button>
             <Button className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 h-10 text-xs font-bold gap-2 hover:scale-105 transition-all">
                <CheckCircle2 className="w-4 h-4" /> Finalize Record
             </Button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        <div className="space-y-10">
          <PatientHeader patient={patient} />
          
          <VitalsGrid vitals={patient.vitals} />
        </div>

        {/* Navigation Tabs Area */}
        <div className="space-y-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-8 overflow-x-auto pb-4 scrollbar-hide">
              <TabsList className="bg-white/40 glass-card p-1.5 rounded-2xl border-slate-200/50 w-fit shrink-0">
                {[
                  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                  { id: 'clinical', label: 'Clinical History', icon: History },
                  { id: 'lab', label: 'Lab Results', icon: FlaskConical },
                  { id: 'prescriptions', label: 'Prescription & Notes', icon: Pill },
                ].map((tab) => (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="rounded-xl px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg gap-2"
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              <TabsContent value="overview" className="mt-0">
                <OverviewTab patient={patient} onNavigateToTab={setActiveTab} />
              </TabsContent>

              <TabsContent value="clinical" className="mt-0">
                <ClinicalHistory />
              </TabsContent>

              <TabsContent value="lab" className="mt-0">
                <LabResults />
              </TabsContent>

              <TabsContent value="prescriptions" className="mt-0">
                <PrescriptionNotebook patient={patient} />
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MedicalRecordPage;
