export const weighted = weight => (rating, answer) => {
  const diff = answer - rating;
  return rating + (weight * diff / 2);
};

export const inverseWeighted = weight => (rating, answer) => {
  const diff = rating - answer;
  return rating + (weight * diff / 2);
};
