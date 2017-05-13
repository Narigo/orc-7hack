export const weighted = weight => (rating, answer) => {
  const diff = answer - rating;
  return rating + (weight * diff / 2);
};
