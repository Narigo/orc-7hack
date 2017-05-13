export const createFinder = (
  {
    filters = []
  }
) => {

  return Promise
    .resolve({
      filters: filters.map(filter => ({
        ...filter,
        rating: 0.5
      }))
    });

};

export const ask = (apiParams) => {
  if (!apiParams || Object.keys(apiParams).length === 0) {
    throw new Error("ask() needs an object of ApiParams.");
  }

  return ({question, answer}) => {
    const params = {
      ...apiParams,
      filters: apiParams.filters.map(filter => {
        const updateFn = question.filters[filter.name];
        const rating = answer[filter.name] === (void 0) ? filter.rating : updateFn(filter.rating, answer[filter.name]);
        return {
          ...filter,
          rating
        };
      })
    };
    return Promise.resolve(params);
  }
};

export const result = (apiParams) => {
  throw new Error("result() needs an object of ApiParams.");
};
