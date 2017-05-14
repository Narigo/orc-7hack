import React from "react";
import {RangeSlider} from "../components/index";
import {inverseWeighted, weighted} from "../../../weighted";

export const FILTERS = {
  country: ["DE", "US", "RU", "TR", "EG"],
  categories: [1, 2, 3, 4, 5, 6, 7]
};

export const filters = [
  {
    id: "safety",
    apply: (value, filters) => {
      return {
        ...filters,
        country: FILTERS.country.filter(country => {
          const included = (value < 0.8 && country === "DE")
            || (value < 0.6 && ["DE", "US", "RU"].includes(country))
            || (value < 0.2 && ["DE", "US", "RU", "TR"].includes(country))
            || (value < 0.2 && ["DE", "US", "RU", "TR", "EG"].includes(country));
          console.log("including country", country, "?", included, "safety rating=", value);
          return included;
        })
      };
    }
  },
  {
    id: "activities",
    apply: (value, filters) => {
      return {
        ...filters,
        categories: FILTERS.categories.filter((category, idx) => {
          return (value > 0.5 || idx < (FILTERS.categories.length / 2));
        })
      }
    }
  },
  {
    id: "nightlife",
    apply: (value, filters) => {
      return {
        ...filters,

      }
    }
  },
  {
    id: "cities",
    apply: (value, filters) => {
      return {
        ...filters,

      }
    }
  },
  {
    id: "comfort",
    apply: (value, filters) => {
      return {
        ...filters,

      }
    }
  },
  {
    id: "distance",
    apply: (value, filters) => {
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
    formatLabel: (value) => {
      if (value < 0.2) {
        return <div className="custom-label unsure">Ich bin eher ein ruhiger Typ.</div>
      } else if (value < 0.4) {
        return <div className="custom-label bourgeois">Ich hab einen Fitnessvertrag, aber gehe eigentlich nie.</div>
      } else if (value < 0.6) {
        return <div className="custom-label bourgeois">Ich hab einen Fitnessvertrag.</div>
      } else if (value < 0.8) {
        return <div className="custom-label bourgeois">Ich trainiere regelmäßig.</div>
      } else {
        return <div className="custom-label confident">Ich beantworte die Frage gerade auf dem Laufband</div>
      }
    },
    footer: value => (value < 0.2) ? <div>Faultier!</div> : (value > 0.8) ? <div>Jaroslav!</div> : null
  },
  {
    kind: (props) => <RangeSlider {...props} />,
    title: "Wie risikobereit bist Du?",
    description: "",
    filters: {
      safety: inverseWeighted(1),
      activities: weighted(0.5)
    },
    minValue: 0,
    maxValue: 1,
    initialValue: 0.5,
    step: 0.01,
    formatLabel: (value) => {
      if (value < 0.2) {
        return <div className="custom-label unsure">Hasenfuß</div>
      } else if (value < 0.4) {
        return <div className="custom-label bourgeois">Spießer</div>
      } else if (value < 0.6) {
        return <div className="custom-label bourgeois">Normal</div>
      } else if (value < 0.8) {
        return <div className="custom-label bourgeois">Draufgänger</div>
      } else {
        return <div className="custom-label confident">Rambo</div>
      }
    },
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
    formatLabel: (value) => {
      if (value < 0.2) {
        return <div className="custom-label unsure">Ich hasse Kinder.</div>
      } else if (value < 0.4) {
        return <div className="custom-label bourgeois">Ich mag es ruhig</div>
      } else if (value < 0.6) {
        return <div className="custom-label bourgeois">Solange es nicht nervt</div>
      } else if (value < 0.8) {
        return <div className="custom-label bourgeois">Ich bin ja auch manchmal laut.</div>
      } else {
        return <div className="custom-label confident">Ich tanze auf jeder Party.</div>
      }
    },
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
    formatLabel: (value) => {
      if (value < 1 / 3) {
        return <div className="custom-label unsure">Ich hasse einkaufen.</div>
      } else if (value < 2 / 3) {
        return <div className="custom-label bourgeois">So ein paar Souvenirs kaufe ich schon...</div>
      } else {
        return <div className="custom-label confident">Ich liebe einkaufen!</div>
      }
    },
    footer: value => (value < 0.2)
      ? <div>Payback-Kunde?</div>
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
      comfort: inverseWeighted(0.8),
      distance: inverseWeighted(1)
    },
    minValue: 0,
    maxValue: 1,
    initialValue: 0.5,
    step: 0.01,
    formatLabel: (value) => {
      if (value < 1 / 3) {
        return <div className="custom-label unsure">Das Bekannte gefällt mir.</div>
      } else if (value < 2 / 3) {
        return <div className="custom-label bourgeois">Man lernt nicht aus</div>
      } else {
        return <div className="custom-label confident">Jeden Tag was Neues!</div>
      }
    },
    footer: () => <div>...</div>
  }
];
