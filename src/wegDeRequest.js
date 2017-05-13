/**
 * Created by danielhilpoltsteiner on 13.05.17.
 */

import {Component} from "react";
const requestPromise = require("request-promise");
const _ = require("lodash");

export default class WegDeComponent extends Component {

  webDeResponse;

  constructor() {
    super();
    const {properties} = this.props;
    this.webDeResponse = this.doWegDeRequest(properties);
  };

  createParametersForUri = (properties) => {
    const keys = Object.keys(properties);
    return _.map(keys, key => {
      return `&${key}=${properties[key]}`;
    });
  };

  doWegDeRequest = (properties) => {
    const baseUri = "http://7hack.comvel.net/weg.de/v1/products?";
    const apikey = "apikey=7Hack%212017";
    console.log(baseUri);
    const fullUri = baseUri + apikey + this.createParametersForUri(properties);
    console.log(fullUri);
    return requestPromise(fullUri)
      .then((html) => JSON.parse(html).response);
  };

  render() {
  };
};
const wegDeComponent = new WegDeComponent();
wegDeComponent.doWegDeRequest({
  channel: "PACKAGE",
  exactDate: "false"
}).then(response => console.log(response));
