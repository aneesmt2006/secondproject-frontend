import { Input } from "../../../shared/components/input";
import { Label } from "../../../shared/components/label";
import { ProfileData } from "../../types/profile.type";

interface FeeSectionProps {
  formData: ProfileData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FeeSection = ({ formData, handleChange }: FeeSectionProps) => {
  return (
    <div className="glass-card rounded-3xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Consultation Fees
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="online_fee">Online Consultation Fee (₹)</Label>
          <Input
            id="online_fee"
            type="number"
            value={formData.online_fee}
            onChange={handleChange}
            placeholder="eg: 500"
            min="0"
            className="glass-card"
          />
        </div>
      </div>
    </div>
  );
};

export default FeeSection;
