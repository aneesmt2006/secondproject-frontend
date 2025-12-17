import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProfileData, ProfileErrors } from '@/types/profile.type';

interface PersonalInfoSectionProps {
  formData: ProfileData;
  errors: ProfileErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PersonalInfoSection = ({ formData, errors, handleChange }: PersonalInfoSectionProps) => {
  return (
    <div className="glass-card rounded-3xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="space-y-2">
          <Label htmlFor="specialization">Specialization </Label>
          <Input
            id="specialization"
            type="string"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="eg: Gynecologist | Nutirionist "
            className="glass-card"
          />
          {errors.specialization && (
            <p className="text-red-500 text-xs">{errors.specialization}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="experience">Experience (Years)</Label>
          <Input
            id="experience"
            type="number"
            value={formData.experience}
            onChange={handleChange}
            placeholder="eg: 15"
            className="glass-card"
          />
          {errors.experience && (
            <p className="text-red-500 text-xs">{errors.experience}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Your main Role </Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="eg: Pregnancy /  childbirth / prenatal / Surgeon"
            className="glass-card min-h-[80px]"
          />
          {errors.address && (
            <p className="text-red-500 text-xs">{errors.address}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
