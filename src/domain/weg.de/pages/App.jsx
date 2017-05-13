import React, {Component} from "react";
import {questions} from "../data/configuration";
import {Question} from "./../components"

export default class App extends Component {

  render() {

    return <div className="app">
      {questions.map((question, idx) => {
        return (
          <Question
            key={idx}
            title={question.title}
            description={question.description}
          >
            {question.kind({
              minValue: question.minValue,
              maxValue: question.maxValue,
              step: question.step,
              initialValue: question.initialValue
            })}
          </Question>
        );
      })}
    </div>
  }
}