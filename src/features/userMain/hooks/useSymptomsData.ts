import { useState, useEffect } from "react";
import { useAppSelector } from "../../../store/hooks";
import { userSelector } from "../../registration/slice/userSlice";
import { calculatePregnancyWeek } from "../../../utils/pregnancyUtils";
import { weekSymptoms } from "../../../services/api/users-management.service";

export const useSymptomsData = () => {
  const [normalSymptoms, setNormalSymptoms] = useState<string[]>([]);
  const [abnormalSymptoms, setAbnormalSymptoms] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { lmp } = useAppSelector(userSelector);
  const hasLmp = !!(lmp && lmp.trim() !== "");
  const currentDate = new Date();
  
  const { week: currentWeek } = hasLmp 
    ? calculatePregnancyWeek(currentDate, lmp!) 
    : { week: 1 };

  const parseHtmlToSymptoms = (htmlString: string): string[] => {
    if (!htmlString) return [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const paragraphs = doc.querySelectorAll("p");
    return Array.from(paragraphs).map((p) => p.textContent || "").filter(text => text.trim() !== "");
  };

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
          setNormalSymptoms(parseHtmlToSymptoms(response.data.normalSymptoms));
          setAbnormalSymptoms(parseHtmlToSymptoms(response.data.abnormalSymptoms));
        }
      } catch (error) {
        console.error("Failed to fetch symptoms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSymptoms();
  }, [currentWeek]);

  return {
    normalSymptoms,
    abnormalSymptoms,
    loading,
    currentWeek
  };
};
