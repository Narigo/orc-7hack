import expect from "must";
import {finder} from "./finder";

describe("The finder", () => {

  it("needs a filter configuration object", () => {
    return expect(finder({})).to.reject.with.error(/filter/);
  });

  it("needs a questions configuration object", () => {
    return expect(finder({})).to.reject.with.error(/questions/);
  });

});

