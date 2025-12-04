export const calculatePregnancyWeek = (current: Date, lmpString: string) => {
  const lmpDate = new Date(lmpString);

  // Due date = LMP + 280 days
  const dueDate = new Date(lmpDate);
  dueDate.setDate(lmpDate.getDate() + 280);

  const diff = current.getTime() - lmpDate.getTime();

  if (diff < 0) {
    return { week: 0, day: 0, dueDate }; // user entered future LMP
  }

  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  const week = Math.floor(diffDays / 7);
  const day = diffDays % 7;

  return { week, day, dueDate };
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
