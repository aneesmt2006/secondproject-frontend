export const checkAge = (date: string): number => {
  const birthDate = new Date(date);
  const today = new Date();
  let Age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() - birthDate.getDate())
  ) {
    Age = Age - 1;
  }

  return Age;
};
