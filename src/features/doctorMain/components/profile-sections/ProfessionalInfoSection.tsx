import { Input } from "../../../shared/components/input";
import { Label } from "../../../shared/components/label";
import { ProfileData, ProfileErrors } from "../../types/profile.type";

interface ProfessionalInfoSectionProps {
  formData: ProfileData;
  errors: ProfileErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfessionalInfoSection = ({ formData, errors, handleChange }: ProfessionalInfoSectionProps) => {
  return (
    <div className="glass-card rounded-3xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Professional Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="registration">Registration Number</Label>
          <Input
            id="registration"
            value={formData.registration}
            onChange={handleChange}
            placeholder="eg : MCI-12345-67890"
            className="glass-card"
          />
          {errors.registration && (
            <p className="text-red-500 text-xs">{errors.registration}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInfoSection;
