import React from "react";
import {RangeSlider} from "../components/index";
import {weighted} from "../../../weighted";

const FILTERS = {
  countries: [],

};

export const filters = [
  {
    id: "safety",
    map: (value, filters) => {
      return {
        ...filters,
        countries: filters.countries.filter(country => {
          return (value > 0.8 && country !== "DE");
        })
      };
    }
  },
  {
    id: "activities",
    map: (value) => {
      return {
        ...filters
      }
    }
  }
];

export const questions = [
  {
    kind: (props) => <RangeSlider {...props}/>,
    title: "Wie sportlich bist Du?",
    description: "",
    filters: {
      safety: weighted(0.3),
      activities: weighted(1)
    },
    minValue: 0,
    maxValue: 1,
    initialValue: 0.5,
    step: 0.01,
    minLabel: value => (
      <div className={value < 0.2 ? "unsure" : value > 0.8 ? "confident" : ""}>
        Ich bin eher ein ruhiger Typ.
      </div>
    ),
    maxLabel: value => (
      <div className={value < 0.2 ? "unsure" : value > 0.8 ? "confident" : ""}>
        Ich beantworte die Frage gerade auf dem Laufband.
      </div>
    ),
    footer: value => (value < 0.2) ? <div>Faultier!</div> : (value > 0.8) ? <div>Jaroslav!</div> : null
  },
  {
    kind: (props) => <RangeSlider {...props}/>,
    title: "Wie risikobereit bist Du?",
    description: "",
    filters: {
      safety: (rating, answer) => weighted(1)(rating, 1 - answer),
      activities: weighted(0.5)
    },
    minValue: 0,
    maxValue: 1,
    initialValue: 0.5,
    step: 0.01,
    minLabel: value => <div className={value < 0.2 ? "unsure" : value > 0.8 ? "confident" : ""}>Hasenfuß</div>,
    maxLabel: value => <div className={value < 0.2 ? "unsure" : value > 0.8 ? "confident" : ""}>Rambo</div>,
    footer: value => (value < 0.2) ? <div>Angsthase!</div> : null
  }
];
