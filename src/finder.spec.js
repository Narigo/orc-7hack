import expect from "must";
import {ask, createFinder, result} from "./finder";
import createFinderSimpleFixture from "./__test__/createFinderSimpleFixture.json";
import apiParamsMultipleFilters from "./__test__/apiParamsMultipleFilters.json";

describe("createFinder", () => {

  it("creates a state object", () => {
    return createFinder({})
      .then(apiParams => {
        expect(apiParams).to.be.an.object();
      });
  });

  it("can create simple apiParams from a config", () => {
    return createFinder({
      filters: [
        {
          "id": "safety"
        }
      ]
    })
      .then(apiParams => {
        expect(apiParams).to.eql(createFinderSimpleFixture);
      });
  });

});

describe("ask", () => {

  it("needs a state object", () => {
    return expect(() => ask()).to.throw(/ApiParams/i);
  });

  it("can be used to increment a rating with a question/answer", () => {
    const apiParams = apiParamsMultipleFilters;
    const question = {
      filters: {
        safety: (currentRating, answerValue) => answerValue
      }
    };
    const answer = {
      safety: 1
    };
    return ask(apiParams)({
      question,
      answer
    })
      .then(resultApiParams => {
        const safetyFilter = resultApiParams.filters.find(filter => filter.id === "safety");
        expect(safetyFilter.rating).to.eql(1);
      });
  });

  it("can be used to decrement a rating with a question/answer", () => {
    const apiParams = apiParamsMultipleFilters;
    const question = {
      filters: {
        activities: (currentRating, answerValue) => answerValue
      }
    };
    const answer = {
      activities: 0
    };
    return ask(apiParams)({
      question,
      answer
    })
      .then(resultApiParams => {
        const activitiesFilter = resultApiParams.filters.find(filter => filter.id === "activities");
        expect(activitiesFilter.rating).to.eql(0);
      });
  });

  it("can be used to manipulate a rating with a question/answer function", () => {
    const apiParams = apiParamsMultipleFilters;
    const question = {
      filters: {
        activities: (currentRating, answerValue) => currentRating * answerValue
      }
    };
    const answer = {
      activities: 0.5
    };
    return ask(apiParams)({
      question,
      answer
    })
      .then(resultApiParams => {
        const activitiesFilter = resultApiParams.filters.find(filter => filter.id === "activities");
        expect(activitiesFilter.rating).to.eql(0.25);
      });
  });

});

describe("result", () => {

  it("needs a state object", () => {
    return expect(() => result()).to.throw(/ApiParams/i);
  });

  it("can generate an api call", () => {
    const apiParams = apiParamsMultipleFilters;
    return result(apiParams)
      .then(products => {
        expect(products).to.be.an.array();
      });
  });

});
