import React, {Component} from "react";
import {questions, filters} from "../data/configuration";
import {createFinder, ask, result} from "./../../../finder";
import {Question} from "./../components"

export default class App extends Component {

  constructor() {
    super();
    this.state = {apiParams: []};
  }

  componentDidMount() {
    createFinder({filters})
      .then(state => {
        this.setState({apiParams: [state]});
      });
  }

  updateState(newState) {
    this.setState({
      apiParams: [...this.state.apiParams, newState]
    });
  }

  render() {
    if (this.state.apiParams === null) {
      return <div>Loading</div>;
    } else {
      return (
        <div className="app">{
          this.state.apiParams.map((state, idx) => {
            console.log("state=", state);
            if (idx === questions.length) {
              return (
                <div key={idx}>{`Products should be array: ${state}`}</div>
              );
            } else {
              const question = questions[idx];
              return (
                <Question
                  key={idx}
                  title={question.title}
                  description={question.description}>{
                  question.kind({
                    minValue: question.minValue,
                    maxValue: question.maxValue,
                    step: question.step,
                    initialValue: question.initialValue,
                    onChangeCompleteFN: (answer) => {
                      ask(state)({
                        question,
                        answer
                      })
                        .then(state => {
                          if (idx >= questions.length - 1) {
                            return result(state);
                          } else {
                            return state;
                          }
                        })
                        .then(state => this.updateState(state));
                    }
                  })
                }</Question>
              );
            }
          })
        }</div>
      );
    }
  }
}