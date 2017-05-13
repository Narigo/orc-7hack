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
    map: (value, filters) => {
      return {
        ...filters,
        categories: filters.categories.filter((category, idx) => {
          return (value > 0.5 || idx < (filters.categories.length / 2));
        })
      }
    }
  },
  {
    id: "nightlife",
    map: (value, filters) => {
      return {
        ...filters,

      }
    }
  },
  {
    id: "cities",
    map: (value, filters) => {
      return {
        ...filters,

      }
    }
  },
  {
    id: "comfort",
    map: (value, filters) => {
      return {
        ...filters,

      }
    }
  },
  {
    id: "distance",
    map: (value, filters) => {
      return {
        ...filters,

      }
    }
  }
];

export const questions = [
  {
    kind: (props) => <RangeSlider {...props} />,
    title: "Wie sportlich bist Du?",
    description: "",
    filters: {
      safety: weighted(0.2),
      activities: weighted(1),
      nightlife: weighted(0.5),
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
    kind: (props) => <RangeSlider {...props} />,
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
  },
  {
    kind: (props) => <RangeSlider {...props} />,
    title: "Darf es auch mal lauter werden?",
    description: "",
    filters: {
      safety: weighted(0.2),
      activities: weighted(0.8),
      nightlife: weighted(1)
    },
    minValue: 0,
    maxValue: 1,
    initialValue: 0.5,
    step: 0.01,
    minLabel: value => (
      <div className={value < 0.2 ? "unsure" : value > 0.8 ? "confident" : ""}>
        Ich mag es lieber ruhig.
      </div>
    ),
    maxLabel: value => (
      <div className={value < 0.2 ? "unsure" : value > 0.8 ? "confident" : ""}>
        Ich tanze auf jeder Party.
      </div>
    ),
    footer: value => (value < 0.2) ? <div>Streber!</div> : (value > 0.8) ? <div>Partytiger!</div> : null
  },
  {
    kind: (props) => <RangeSlider {...props} />,
    title: "Gefallen Dir ausgedehnte Shopping-Touren?",
    description: "",
    filters: {
      safety: weighted(0.1),
      nightlife: weighted(0.6),
      cities: weighted(1),
      comfort: (rating, answer) => weighted(0.5)(rating, 1 - answer) // inverse answer
    },
    minValue: 0,
    maxValue: 1,
    initialValue: 0.5,
    step: 0.01,
    minLabel: value => (
      <div className={value < 0.2 ? "unsure" : value > 0.8 ? "confident" : ""}>
        Ich hasse einkaufen.
      </div>
    ),
    maxLabel: value => (
      <div className={value < 0.2 ? "unsure" : value > 0.8 ? "confident" : ""}>
        Ich liebe einkaufen!
      </div>
    ),
    footer: value => (value < 0.2)
      ? <div>Amazonbesteller</div>
      : (value > 0.8)
        ? <div>Wieso suchst Du dann online...?</div>
        : null
  },
  {
    kind: (props) => <RangeSlider {...props} />,
    title: "Lernst Du gerne fremde Kulturen kennen?",
    description: "",
    filters: {
      safety: weighted(0.2),
      cities: weighted(1),
      comfort: (rating, answer) => weighted(0.8)(rating, 1 - answer),
      distance: (rating, answer) => weighted(1)(rating, 1 - answer) // TODO inverseWeighted function
    },
    minValue: 0,
    maxValue: 1,
    initialValue: 0.5,
    step: 0.01,
    minLabel: value => (
      <div className={value < 0.2 ? "unsure" : value > 0.8 ? "confident" : ""}>
        Das Bekannte gefällt mir.
      </div>
    ),
    maxLabel: value => (
      <div className={value < 0.2 ? "unsure" : value > 0.8 ? "confident" : ""}>
        Jeden Tag was Neues!
      </div>
    ),
    footer: () => <div>...</div>
  }
];
