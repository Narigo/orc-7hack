export default [
  {
    id: "safety",
    rating: 0.6,
    apply: (rating, filters) => {
      return {
        ...filters,
        countries: filters.countries.filter(country => country !== "AF")
      }
    }
  }
];
