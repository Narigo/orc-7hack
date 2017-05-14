export default [
  {
    id: "safety",
    rating: 0.6,
    apply: (rating, filters) => {
      return {
        ...filters,
        categories: [...filters.categories, 5],
        countries: filters.countries.filter(country => country !== "AF")
      }
    }
  },
  {
    id: "activities",
    rating: 0.8,
    apply: (rating, filters) => {
      return {
        ...filters,
        categories: [...filters.categories, 6, 7]
      }
    }
  }
];
