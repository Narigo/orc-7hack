import React, {Component} from "react";
import {questions, filters} from "../data/configuration";
import {createFinder, ask, result} from "./../../../finder";
import {Question} from "./../components"

export default class App extends Component {

  componentDidMount() {
  }

  render() {

    return <div className="app">
      {questions.reduce((statePromise, question, idx) => {
        return (
          <Question
            key={idx}
            title={question.title}
            description={question.description}
          >
            {ask({filters})(
              {
                question,
                value
              }).then((result) => {
              question.kind({
                minValue: question.minValue,
                maxValue: question.maxValue,
                step: question.step,
                initialValue: question.initialValue,
                onChangeCompleteFN: (value) => {

                  result({filters}).then((result) => {
                    console.log("result: ", result);
                  });

                }
              })
            })}
          </Question>
        );
      }, Promise.resolve(createFinder({filters})))}
    </div>
  }
}