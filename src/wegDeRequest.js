import React, {Component} from "react";
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

const calculateStars = (pricing) => {
  return Math.ceil(pricing * 6);
};

const calculatePrice = (pricing) => {
  return Math.ceil(pricing * 1000);
};

const calculateMeat = (pricing) => {
  return Math.ceil(pricing * 5);
};

const filterCountries = (countries, threshold) => {
  return _.filter(countries, country => country.safety > threshold);
}

const properties = (comfort, countries, channel) => {
  return {
    channel: channel,
    mealType: calculateMeat(comfort),
    price: calculatePrice(comfort),
    departureAirport: "MUC",
    stars: calculateStars(comfort),
    countries: filterCountries(countries),
    limit: 50
  };
};

<WegDeComponent properties={properties} />
