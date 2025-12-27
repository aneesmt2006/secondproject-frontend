import { useState, useEffect } from "react";
import { useAppSelector } from "../../../store/hooks";
import { userSelector } from "../../registration/slice/userSlice";
import { calculatePregnancyWeek } from "../../../utils/pregnancyUtils";
import { weekSymptoms, logDailySymptoms } from "@/services/api/tracking.service";
import { toast } from "sonner";

interface UseSymptomsDataProps {
  onLogSuccess?: () => void;
}

export const useSymptomsData = ({ onLogSuccess }: UseSymptomsDataProps = {}) => {
  const [normalSymptoms, setNormalSymptoms] = useState<string[]>([]);
  const [abnormalSymptoms, setAbnormalSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedAbnormal, setSelectedAbnormal] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const { lmp } = useAppSelector(userSelector);
  const hasLmp = !!(lmp && lmp.trim() !== "");
  const currentDate = new Date();
  
  const { week: currentWeek } = hasLmp 
    ? calculatePregnancyWeek(currentDate, lmp!) 
    : { week: 1 };

  useEffect(() => {
    const fetchSymptoms = async () => {
      if (!currentWeek) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await weekSymptoms(currentWeek);
        if (response.data) {
          // API returns array of strings directly now
          setNormalSymptoms(response.data.normalSymptoms || []);
          setAbnormalSymptoms(response.data.abnormalSymptoms || []);
        }
      } catch (error) {
        console.error("Failed to fetch symptoms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSymptoms();
  }, [currentWeek]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((item) => item !== symptom) : [...prev, symptom]
    );
  };

  const toggleAbnormal = (symptom: string) => {
    setSelectedAbnormal((prev) =>
      prev.includes(symptom) ? prev.filter((item) => item !== symptom) : [...prev, symptom]
    );
  };

  const handleSaveLog = async () => {
    if (selectedSymptoms.length === 0 && selectedAbnormal.length === 0) {
      toast.error("Please select at least one symptom to log");
      return;
    }

    setSubmitting(true);
    try {
      await logDailySymptoms({
        week: currentWeek,
        selectedNormalSymptoms: selectedSymptoms,
        selectedAbnormalSymptoms: selectedAbnormal
      });
      toast.success("Symptoms logged successfully!");
      if (onLogSuccess) {
        onLogSuccess();
      }
    } catch (error) {
      console.error("Failed to log symptoms", error);
      toast.error("Failed to log symptoms. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    normalSymptoms,
    abnormalSymptoms,
    loading,
    currentWeek,
    selectedSymptoms,
    selectedAbnormal,
    submitting,
    toggleSymptom,
    toggleAbnormal,
    handleSaveLog
  };
};
