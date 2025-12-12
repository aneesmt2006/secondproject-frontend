import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../shared/components/tabs";
import { User, Calendar } from "lucide-react";

import HeaderSection from "../components/ProfileHeaderSection";
import ProfileForm from "../components/ProfileForm";
import SlotTabs from "../components/SlotTabs";
import { getDoctor } from "../../../services/api/users-management.service";
import useProfileData from "../hooks/useProfileData";
import { useDoctorProfileSubmit } from "../hooks/useDoctorProfileSubmit";

const DoctorProfilePage = () => {
  const { loading, handleSubmit } = useDoctorProfileSubmit();
  const navigate = useNavigate();

  const {
    formData,
    setFormData,
    errors,
    handleChange,
    handleImageUpload,
    handleCertificateUpload,
    handleRemoveCertificate,
    handleViewCertificate,
    handleSubmition,
  } = useProfileData({
    onSubmitCallback: handleSubmit,
  });

  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [offlineUnavailableDates, setOfflineUnavailableDates] = useState<Date[]>([]);

  useEffect(() => {
    const loadDoctorProfil = async () => {
      try {
        const response = await getDoctor();
        // console.log("Use effect dr data fetched OK-----> ", response);
        // setdrData(response.data);
        if (response.data) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Failed to load doctor profile", error);
      }
    };

    loadDoctorProfil();
  }, [setFormData]);

  return (
    <div className="doctor-theme min-h-screen pb-20 lg:pb-8">
      <HeaderSection
        title="Doctor Profile & Slot Management"
        onBack={() => navigate("/doctor/dashboard")}
      />

      <div className="mx-4 lg:mx-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="glass-strong w-full justify-start mb-6 p-1.5 h-auto">
            <TabsTrigger
              value="profile"
              className="rounded-xl data-[state=active]:bg-blue-500 data-[state=active]:text-white "
            >
              <User className="w-4 h-4 mr-2" /> Profile Updation
            </TabsTrigger>
            <TabsTrigger
              value="slots"
              className="rounded-xl data-[state=active]:bg-blue-500  data-[state=active]:text-white"
            >
              <Calendar className="w-4 h-4 mr-2" /> Slot Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleImageUpload={handleImageUpload}
              handleCertificateUpload={handleCertificateUpload}
              handleRemoveCertificate={handleRemoveCertificate}
              handleViewCertificate={handleViewCertificate}
              onSubmit={handleSubmition}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="slots">
            <SlotTabs
              unavailableDates={unavailableDates}
              setUnavailableDates={setUnavailableDates}
              offlineUnavailableDates={offlineUnavailableDates}
              setOfflineUnavailableDates={setOfflineUnavailableDates}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorProfilePage;
