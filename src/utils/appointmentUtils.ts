/* eslint-disable @typescript-eslint/no-unused-vars */
export const getAppointmentDateTime = (dateStr: string, timeStr: string): Date | null => {
  try {
    const parsedDate = new Date(dateStr);
    if (isNaN(parsedDate.getTime())) return null;

    const cleanTimeStr = timeStr.replace(/slot,?\s*/i, "").trim();
    const timeMatch = cleanTimeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!timeMatch) return null;

    const [_, hoursStr, minutesStr, ampm] = timeMatch;
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (ampm.toUpperCase() === "PM" && hours < 12) {
      hours += 12;
    } else if (ampm.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }

    parsedDate.setHours(hours, minutes, 0, 0);
    return parsedDate;
  } catch (error) {
    console.error("Error parsing appointment date/time:", error);
    return null;
  }
};

export const getTimeDisplayParts = (timeStr: string) => {
  const cleanTime = timeStr.replace(/slot,?\s*/i, "").trim();
  const parts = cleanTime.split(' ');
  return {
    time: parts[0] || "",
    ampm: parts[1] || ""
  };
};
