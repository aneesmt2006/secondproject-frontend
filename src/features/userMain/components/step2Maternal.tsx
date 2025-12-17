import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup,RadioGroupItem } from "@/components/ui/radio-group";
import { pregnantProfile } from '@/types/profile.type';

interface Step2Props {
  profileData: pregnantProfile;
  setProfileData: React.Dispatch<React.SetStateAction<pregnantProfile>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function Step2Medical({
  profileData,
  setProfileData,
  handleChange,
}: Step2Props) {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      {/* --- Medical Conditions Section --- */}
      <div className="space-y-4">
        <h2 className="text-2xl font-sans font-medium text-wine mb-2">
          Medical Conditions
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Please indicate any relevant medical conditions by toggling the switches
        </p>

        {/* 🔹 Gestational Diabetes */}
        <div className="p-4 bg-cream/50 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-cocoa font-medium">
              Gestational Diabetes
            </Label>
            <Switch
              checked={profileData.gestationalDiabetes}
              onCheckedChange={(checked) =>
                setProfileData((prev) => ({
                  ...prev,
                  gestationalDiabetes: checked,
                  gestationalSugar: checked ? prev.gestationalSugar : "",
                }))
              }
              className="data-[state=checked]:bg-periwinkle"
            />
          </div>

          <AnimatePresence>
            {profileData.gestationalDiabetes && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Label className="text-cocoa text-sm block mb-1">
                  Enter your blood sugar level (mg/dL)
                </Label>
                <Input
                  type="number"
                  name="gestationalSugar"
                  placeholder="e.g., 95"
                  value={profileData.gestationalSugar || ""}
                  onChange={handleChange}
                  className="border-periwinkle/30 focus:border-periwinkle"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 🔹 Blood Pressure */}
        <div className="p-4 bg-cream/50 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-cocoa font-medium">Blood Pressure</Label>
            <Switch
              checked={profileData.bloodPressure}
              onCheckedChange={(checked) =>
                setProfileData((prev) => ({
                  ...prev,
                  bloodPressure: checked,
                  bpReading: checked ? prev.bpReading : "",
                }))
              }
              className="data-[state=checked]:bg-periwinkle"
            />
          </div>

          <AnimatePresence>
            {profileData.bloodPressure && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Label className="text-cocoa text-sm block mb-1">
                  Enter your BP reading (mmHg)
                </Label>
                <Input
                  type="text"
                  name="bpReading"
                  placeholder="e.g., 120/80"
                  value={profileData.bpReading || ""}
                  onChange={handleChange}
                  className="border-periwinkle/30 focus:border-periwinkle"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 🔹 Thyroid Problems */}
        <div className="flex items-center justify-between p-4 bg-cream/50 rounded-xl">
          <Label className="text-cocoa font-medium">Thyroid Problems</Label>
          <Switch
            checked={profileData.thyroidProblems}
            onCheckedChange={(checked) =>
              setProfileData((prev) => ({
                ...prev,
                thyroidProblems: checked,
              }))
            }
            className="data-[state=checked]:bg-periwinkle"
          />
        </div>

        {/* 🔹 PCOS/PCOD */}
        <div className="flex items-center justify-between p-4 bg-cream/50 rounded-xl">
          <Label className="text-cocoa font-medium">PCOS / PCOD</Label>
          <Switch
            checked={profileData.pcosPcod}
            onCheckedChange={(checked) =>
              setProfileData((prev) => ({
                ...prev,
                pcosPcod: checked,
              }))
            }
            className="data-[state=checked]:bg-periwinkle"
          />
        </div>
      </div>

      {/* --- Additional Questions Section --- */}
      <div className="space-y-6">
        {/* Supplements / Medications */}
        <div className="space-y-3">
          <Label className="text-cocoa font-medium">
            Are you currently taking any supplements or medications?
          </Label>
          <RadioGroup
            name="takingSupplements"
            value={profileData.takingSupplements}
            onValueChange={(value) =>
              setProfileData((prev) => ({ ...prev, takingSupplements: value }))
            }
          >
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="no"
                  id="supplements-no"
                  className="border-periwinkle text-periwinkle"
                />
                <Label
                  htmlFor="supplements-no"
                  className="text-cocoa font-normal cursor-pointer"
                >
                  No
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id="supplements-yes"
                  className="border-periwinkle text-periwinkle"
                />
                <Label
                  htmlFor="supplements-yes"
                  className="text-cocoa font-normal cursor-pointer"
                >
                  Yes
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Allergies */}
        <div className="space-y-3">
          <Label className="text-cocoa font-medium">
            Do you have any known allergies?
          </Label>
          <RadioGroup
            value={profileData.knownAllergies}
            onValueChange={(value) =>
              setProfileData((prev) => ({ ...prev, knownAllergies: value }))
            }
          >
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="no"
                  id="allergies-no"
                  className="border-periwinkle text-periwinkle"
                />
                <Label
                  htmlFor="allergies-no"
                  className="text-cocoa font-normal cursor-pointer"
                >
                  No
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id="allergies-yes"
                  className="border-periwinkle text-periwinkle"
                />
                <Label
                  htmlFor="allergies-yes"
                  className="text-cocoa font-normal cursor-pointer"
                >
                  Yes
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Family Relation */}
        <div className="space-y-3">
          <Label className="text-cocoa font-medium">
            Is your family related to your spouse's family?
          </Label>
          <RadioGroup
            value={profileData.familyRelated}
            onValueChange={(value) =>
              setProfileData((prev) => ({ ...prev, familyRelated: value }))
            }
          >
            <div className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="no"
                  id="family-no"
                  className="border-periwinkle text-periwinkle"
                />
                <Label
                  htmlFor="family-no"
                  className="text-cocoa font-normal cursor-pointer"
                >
                  No
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id="family-yes"
                  className="border-periwinkle text-periwinkle"
                />
                <Label
                  htmlFor="family-yes"
                  className="text-cocoa font-normal cursor-pointer"
                >
                  Yes
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Other Health Issues */}
        <div className="space-y-3">
          <Label htmlFor="otherHealthIssues" className="text-cocoa font-medium">
            Other Health Issues (Optional)
          </Label>
          <Textarea
            id="otherHealthIssues"
            name="otherHealthIssues"
            placeholder="e.g., Diabetes, previous surgeries, mental health concerns, etc."
            value={profileData.otherHealthIssues}
            onChange={handleChange}
            className="min-h-[120px] border-periwinkle/30 focus:border-periwinkle resize-none"
          />
        </div>
      </div>
    </motion.div>
  );
}
