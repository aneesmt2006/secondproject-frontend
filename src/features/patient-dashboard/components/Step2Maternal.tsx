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
        <h2 className="text-2xl font-sans font-medium text-patient-primary mb-2 transition-colors">
          Medical Conditions
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Please indicate any relevant medical conditions by toggling the switches
        </p>

        {/* 🔹 Gestational Diabetes */}
        <div className="p-4 bg-white/50 rounded-xl space-y-3 transition-colors">
          <div className="flex items-center justify-between">
            <Label className="text-[color:var(--foreground)] font-medium transition-colors">
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
              className="data-[state=checked]:bg-[color:var(--patient-primary)] transition-colors shadow-sm"
            />
          </div>

          <AnimatePresence>
            {profileData.gestationalDiabetes && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Label className="text-[color:var(--foreground)] text-sm block mb-1 transition-colors">
                  Enter your blood sugar level (mg/dL)
                </Label>
                <Input
                  type="number"
                  name="gestationalSugar"
                  placeholder="e.g., 95"
                  value={profileData.gestationalSugar || ""}
                  onChange={handleChange}
                  className="bg-white/50 border-white/60 focus:bg-white/80 focus:border-[color:var(--patient-primary)] focus:ring-1 focus:ring-[color:var(--patient-primary)] transition-all duration-300"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 🔹 Blood Pressure */}
        <div className="p-4 bg-white/50 rounded-xl space-y-3 transition-colors">
          <div className="flex items-center justify-between">
            <Label className="text-[color:var(--foreground)] font-medium transition-colors">Blood Pressure</Label>
            <Switch
              checked={profileData.bloodPressure}
              onCheckedChange={(checked) =>
                setProfileData((prev) => ({
                  ...prev,
                  bloodPressure: checked,
                  bpReading: checked ? prev.bpReading : "",
                }))
              }
              className="data-[state=checked]:bg-[color:var(--patient-primary)] transition-colors shadow-sm"
            />
          </div>

          <AnimatePresence>
            {profileData.bloodPressure && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Label className="text-[color:var(--foreground)] text-sm block mb-1 transition-colors">
                  Enter your BP reading (mmHg)
                </Label>
                <Input
                  type="text"
                  name="bpReading"
                  placeholder="e.g., 120/80"
                  value={profileData.bpReading || ""}
                  onChange={handleChange}
                  className="bg-white/50 border-white/60 focus:bg-white/80 focus:border-[color:var(--patient-primary)] focus:ring-1 focus:ring-[color:var(--patient-primary)] transition-all duration-300"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 🔹 Thyroid Problems */}
        <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl transition-colors">
          <Label className="text-[color:var(--foreground)] font-medium transition-colors">Thyroid Problems</Label>
          <Switch
            checked={profileData.thyroidProblems}
            onCheckedChange={(checked) =>
              setProfileData((prev) => ({
                ...prev,
                thyroidProblems: checked,
              }))
            }
            className="data-[state=checked]:bg-[color:var(--patient-primary)] transition-colors shadow-sm"
          />
        </div>

        {/* 🔹 PCOS/PCOD */}
        <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl transition-colors">
          <Label className="text-[color:var(--foreground)] font-medium transition-colors">PCOS / PCOD</Label>
          <Switch
            checked={profileData.pcosPcod}
            onCheckedChange={(checked) =>
              setProfileData((prev) => ({
                ...prev,
                pcosPcod: checked,
              }))
            }
            className="data-[state=checked]:bg-[color:var(--patient-primary)] transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* --- Additional Questions Section --- */}
      <div className="space-y-6">
        {/* Supplements / Medications */}
        <div className="space-y-3">
          <Label className="text-[color:var(--foreground)] font-medium transition-colors">
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
                  className="border-[color:var(--patient-primary)] text-[color:var(--patient-primary)] transition-colors"
                />
                <Label
                  htmlFor="supplements-no"
                  className="text-[color:var(--foreground)] font-normal cursor-pointer transition-colors"
                >
                  No
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id="supplements-yes"
                  className="border-[color:var(--patient-primary)] text-[color:var(--patient-primary)] transition-colors"
                />
                <Label
                  htmlFor="supplements-yes"
                  className="text-[color:var(--foreground)] font-normal cursor-pointer transition-colors"
                >
                  Yes
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Allergies */}
        <div className="space-y-3">
          <Label className="text-[color:var(--foreground)] font-medium transition-colors">
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
                  className="border-[color:var(--patient-primary)] text-[color:var(--patient-primary)] transition-colors"
                />
                <Label
                  htmlFor="allergies-no"
                  className="text-[color:var(--foreground)] font-normal cursor-pointer transition-colors"
                >
                  No
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id="allergies-yes"
                  className="border-[color:var(--patient-primary)] text-[color:var(--patient-primary)] transition-colors"
                />
                <Label
                  htmlFor="allergies-yes"
                  className="text-[color:var(--foreground)] font-normal cursor-pointer transition-colors"
                >
                  Yes
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Family Relation */}
        <div className="space-y-3">
          <Label className="text-[color:var(--foreground)] font-medium transition-colors">
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
                  className="border-[color:var(--patient-primary)] text-[color:var(--patient-primary)] transition-colors"
                />
                <Label
                  htmlFor="family-no"
                  className="text-[color:var(--foreground)] font-normal cursor-pointer transition-colors"
                >
                  No
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="yes"
                  id="family-yes"
                  className="border-[color:var(--patient-primary)] text-[color:var(--patient-primary)] transition-colors"
                />
                <Label
                  htmlFor="family-yes"
                  className="text-[color:var(--foreground)] font-normal cursor-pointer transition-colors"
                >
                  Yes
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Other Health Issues */}
        <div className="space-y-3">
          <Label htmlFor="otherHealthIssues" className="text-[color:var(--foreground)] font-medium transition-colors">
            Other Health Issues (Optional)
          </Label>
          <Textarea
            id="otherHealthIssues"
            name="otherHealthIssues"
            placeholder="e.g., Diabetes, previous surgeries, mental health concerns, etc."
            value={profileData.otherHealthIssues}
            onChange={handleChange}
            className="min-h-[120px] bg-white/50 border-white/60 focus:bg-white/80 focus:border-[color:var(--patient-primary)] focus:ring-1 focus:ring-[color:var(--patient-primary)] resize-none transition-all duration-300"
          />
        </div>
      </div>
    </motion.div>
  );
}
