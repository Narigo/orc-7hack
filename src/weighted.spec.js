import expect from "must";
import {inverseWeighted, weighted} from "./weighted";

describe("weighted", () => {

  it("results in the current rating, if weight is 0", () => {
    const fn = weighted(0);
    expect(fn(0.5, 1)).to.eql(0.5);
    expect(fn(0.5, 0)).to.eql(0.5);
    expect(fn(0.7, 1)).to.eql(0.7);
    expect(fn(0.3, 0)).to.eql(0.3);
  });

  it("results in a higher rating, if weight is > 0 and answer is > rating", () => {
    const fn = weighted(0.5);
    expect(fn(0.5, 1)).to.be.gt(0.5);
    expect(fn(0.5, 1)).to.be.lte(1);
  });

  it("results in same rating, if weight is > 0 and answer equal to rating", () => {
    const fn = weighted(0.5);
    expect(fn(0.5, 0.5)).to.eql(0.5);
    expect(fn(0.75, 0.75)).to.eql(0.75);
    expect(fn(0.25, 0.25)).to.eql(0.25);
  });

  it("results in lower rating, if weight is > 0 and answer < rating", () => {
    const fn = weighted(0.5);
    expect(fn(1, 0.5)).to.gt(0.5);
    expect(fn(1, 0.5)).to.lt(1);
    expect(fn(0.75, 0.5)).to.lt(0.75);
    expect(fn(0.75, 0.5)).to.gt(0.5);
    expect(fn(0.5, 0.25)).to.lt(0.5);
    expect(fn(0.5, 0.25)).to.gt(0.25);
    expect(fn(0.5, 0.49)).to.lt(0.5);
    expect(fn(0.5, 0.49)).to.gt(0.49);
  });

  it("results in different rating, if weight is different", () => {
    const fnA = weighted(0.5);
    const fnB = weighted(1);
    const a1 = fnA(0.5, 1);
    const b1 = fnB(0.5, 1);
    const a2 = fnA(0.5, 0);
    const b2 = fnB(0.5, 0);

    expect(a1).to.be.gt(0.5);
    expect(a1).to.be.lt(b1);
    expect(b1).to.be.lt(1);

    expect(a2).to.be.lt(0.5);
    expect(a2).to.be.gt(b2);
    expect(b2).to.be.gt(0);
  });

});

describe("inverseWeighted", () => {

  it("results in the current rating, if weight is 0", () => {
    const fn = inverseWeighted(0);
    expect(fn(0.5, 1)).to.eql(0.5);
    expect(fn(0.5, 0)).to.eql(0.5);
    expect(fn(0.7, 1)).to.eql(0.7);
    expect(fn(0.3, 0)).to.eql(0.3);
  });

  it("results in a lower rating, if weight is > 0 and answer is > rating", () => {
    const fn = inverseWeighted(0.5);
    expect(fn(0.5, 1)).to.be.lt(0.5);
    expect(fn(0.5, 1)).to.be.gte(0);
  });

  it("results in same rating, if weight is > 0 and answer equal to rating", () => {
    const fn = inverseWeighted(0.5);
    expect(fn(0.5, 0.5)).to.eql(0.5);
    expect(fn(0.75, 0.75)).to.eql(0.75);
    expect(fn(0.25, 0.25)).to.eql(0.25);
  });

  it("results in higher rating, if weight is > 0 and answer < rating", () => {
    const fn = inverseWeighted(0.5);
    expect(fn(0.5, 0)).to.gt(0.5);
    expect(fn(0.5, 0)).to.lt(1);
    expect(fn(0.75, 0.5)).to.gt(0.75);
    expect(fn(0.75, 0.5)).to.lt(1);
    expect(fn(0.5, 0.25)).to.gt(0.5);
    expect(fn(0.5, 0.25)).to.lt(1);
    expect(fn(0.5, 0.49)).to.gt(0.5);
    expect(fn(0.5, 0.49)).to.lt(0.51);
  });

  it("results in different rating, if weight is different", () => {
    const fnA = inverseWeighted(0.5);
    const fnB = inverseWeighted(1);
    const a1 = fnA(0.5, 1);
    const b1 = fnB(0.5, 1);
    const a2 = fnA(0.5, 0);
    const b2 = fnB(0.5, 0);

    expect(a1).to.be.lt(0.5);
    expect(a1).to.be.gt(b1);
    expect(b1).to.be.gt(0);

    expect(a2).to.be.gt(0.5);
    expect(a2).to.be.lt(b2);
    expect(b2).to.be.lt(1);
  });

});
