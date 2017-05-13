import expect from "must";
import React from "react";
import WegDeComponent from "./wegDeRequest";

import {shallow} from "enzyme";

describe("wegDeRequest", () => {

  it("should get correct props", () => {
    const properties = {
      channel: "package",
      limit: 10
    }

    const wegDeComponent = shallow(
      <WegDeComponent properties={properties} />
    );
    // const channel = ReactDOM.findDOMNode(item.channel);
    console.log(wegDeComponent.props());
    expect(wegDeComponent.props().properties.channel).to.equal(properties.channel);
    // const limit = ReactDOM.findDOMNode(item.limit);
    expect(wegDeComponent.props().properties.limit).to.equal(properties.limit);
  });
});

