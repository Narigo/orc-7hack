/**
 * Created by danielhilpoltsteiner on 13.05.17.
 */

import {Component} from "react";
import handleRequest from "./domain/weg.de/components/helperComponents/handleRequests";
const _ = require("lodash");

@handleRequest
export default class WegDeComponent extends Component {
  webDeResponse;
  properties;
  constructor(props) {
    super(props);

    const {properties} = props;
    this.properties = properties;
  }

  componentDidMount() {
    const baseUri = "http://7hack.comvel.net/weg.de/v1/products?";
    const apikey = "apikey=7Hack%212017";
    const fullUri = baseUri + apikey + this.createParametersForUri(this.properties);
    handleRequest(fullUri);
  }

  createParametersForUri = (properties) => {
    const keys = Object.keys(properties);
    return _.map(keys, key => {
      return `&${key}=${properties[key]}`;
    });
  };

  render() {
  }
  ;
}
;
//
// const wegDeComponent = new WegDeComponent();
// wegDeComponent.doWegDeRequest({
//   channel: "PACKAGE",
//   exactDate: "false",
//   limit: 10
// }).then(response => console.log(response));
