import RangeSlider from "../components/RangeSlider/RangeSlider";
import {weighted} from "../../../weighted";

export const filters = [
  {
    id: "safety"
  },
  {
    id: "activities"
  },
  {
    id: ""
  },
  {
    id: ""
  }
];

export const questions = [
  {
    title: "Wie sportlich bist Du?",
    description: "",
    filters: {
      safety: weighted(0.3)
    },
    minValue: 0,
    maxValue: 1
  },
  {
    kind: RangeSlider,
    title: "Wie risikobereit bist Du?",
    description: "",
    filters: {
      safety: (currentRating, answer) => currentRating - (1 - answer),
      activities: (currentRating, answer) => currentRating + answer
    },
    minValue: 0,
    maxValue: 1,
    minLabel: value => <InputRangeLabel>Hasenfuß</InputRangeLabel>,
    maxLabel: value => <InputRangeLabel>Rambo</InputRangeLabel>,
    footer: value => (value < 0.2) ? <div>Angsthase!</div> : null
  }
];
