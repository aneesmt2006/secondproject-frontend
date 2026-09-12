import { motion } from "framer-motion";
import { Calendar, User, Heart, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { profileError, pregnantProfile } from '@/types/profile.type';

interface Step1Props {
  profileData: pregnantProfile;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setProfileData: React.Dispatch<React.SetStateAction<pregnantProfile>>;
  errors?: profileError;
}

export default function Step1Maternal({
  profileData,
  handleChange,
  setProfileData,
  errors,
}: Step1Props) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Personal Information */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-sans font-medium text-wine flex items-center gap-2 mb-3 sm:mb-4">
          <User className="w-6 h-6" />
          Personal Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-cocoa">
              Full Name
            </Label>
            <Input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="e.g., Jane Doe"
              value={profileData.fullName}
              onChange={handleChange}
              className={`border-periwinkle/30 focus:border-periwinkle ${errors?.fullName ? 'border-destructive' : ''}`}
            />
            {errors?.fullName && (
              <p className="text-destructive text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-cocoa">
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              value={profileData.dateOfBirth}
              onChange={handleChange}
              className={`border-periwinkle/30 focus:border-periwinkle ${errors?.dateOfBirth ? 'border-destructive' : ''}`}
            />
            {errors?.dateOfBirth && (
              <p className="text-destructive text-xs mt-1">{errors.dateOfBirth}</p>
            )}
          </div>
        </div>
      </div>

      {/* Maternal Health Details */}
      <div className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-sans font-medium text-wine flex items-center gap-2 mb-3 sm:mb-4">
          <Calendar className="w-6 h-6" />
          Maternal Health Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="lmp" className="text-cocoa">
              Date of Last Menstrual Period (LMP)
            </Label>
            <Input
              id="lmp"
              type="date"
              name="lmp"
              value={profileData.lmp}
              onChange={handleChange}
              className="border-periwinkle/30 focus:border-periwinkle"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-cream/50 rounded-xl">
          <Label htmlFor="firstPregnancy" className="text-cocoa font-medium">
            First Pregnancy
          </Label>
          <Switch
            id="firstPregnancy"
            checked={profileData.isFirstPregnancy}
            onCheckedChange={(checked) =>
              setProfileData((prev) => ({ ...prev, isFirstPregnancy: checked }))
            }
            className="data-[state=checked]:bg-periwinkle"
          />
        </div>
      </div>

      {/* Physical Attributes */}
      <div className="space-y-4 pt-4 border-t border-lilac/10">
        <h2 className="text-xl sm:text-2xl font-sans font-medium text-wine flex items-center gap-2 mb-3 sm:mb-4">
          <Activity className="w-6 h-6" />
          Physical Attributes
        </h2>

        <div className="space-y-2">
          <Label htmlFor="bloodGroup" className="text-cocoa">
            Blood Group
          </Label>
          <Select
            value={profileData.bloodGroup}
            onValueChange={(value) =>
              setProfileData((prev) => ({ ...prev, bloodGroup: value }))
            }
          >
            <SelectTrigger className="border-periwinkle/30 focus:border-periwinkle">
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent className="bg-white border-periwinkle/30">
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="height" className="text-cocoa">
              Height (cm)
            </Label>
            <Input
              id="height"
              type="number"
              name="height"
              placeholder="e.g., 165"
              value={profileData.height}
              onChange={handleChange}
              className="border-periwinkle/30 focus:border-periwinkle"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="text-cocoa">
              Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              name="weight"
              placeholder="e.g., 60"
              value={profileData.weight}
              onChange={handleChange}
              className="border-periwinkle/30 focus:border-periwinkle"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
