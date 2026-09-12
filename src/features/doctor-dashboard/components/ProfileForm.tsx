import { Button } from "@/components/ui/button";
import { ProfileFormProps } from '@/types/profile.type';
import ProfileImageSection from "./profile-sections/ProfileImageSection";
import PersonalInfoSection from "./profile-sections/PersonalInfoSection";
import ProfessionalInfoSection from "./profile-sections/ProfessionalInfoSection";
import CertificateSection from "./profile-sections/CertificateSection";
import FeeSection from "./profile-sections/FeeSection";

const ProfileForm = ({
  errors,
  formData,
  handleCertificateUpload,
  handleChange,
  handleImageUpload,
  handleRemoveCertificate,
  handleViewCertificate,
  onSubmit,
  loading,
  
}: ProfileFormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="glass-card rounded-3xl p-6 lg:p-8 space-y-8"
    >
      <h2 className="text-xl font-bold text-foreground mb-6">
        Update Your Profile |  You must fill all fields | This form is using for verification 
      </h2>

      <ProfileImageSection
        formData={formData}
        handleImageUpload={handleImageUpload}
      />

      <PersonalInfoSection
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <ProfessionalInfoSection
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <CertificateSection
        formData={formData}
        handleCertificateUpload={handleCertificateUpload}
        handleViewCertificate={handleViewCertificate}
        handleRemoveCertificate={handleRemoveCertificate}
      />


      <FeeSection formData={formData} handleChange={handleChange} />

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto rounded-xl px-8 !bg-blue-500"
        >
          {loading ? "Loading..." : "Save profile"}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
