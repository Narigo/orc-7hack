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

    handleRequest(fullUri);
  }



  render() {
  }
  ;
}

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
};

export const properties = (comfort, countries, channel) => {
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

export const createParametersForUri = (properties) => {
  const keys = Object.keys(properties);
  return _.map(keys, key => {
    return `&${key}=${properties[key]}`;
  });
};

<WegDeComponent properties={properties} />
