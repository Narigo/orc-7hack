import React, {Component} from "react";
import {questions, filters} from "../data/configuration";
import {createFinder, ask} from "./../../../finder";
import {Question, RequestResults} from "./../components"

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

  updateState(newState, idx) {
    const newApiParams = this.state.apiParams;
    newApiParams[idx + 1] = newState;
    this.setState({
      apiParams: newApiParams
    });
  }

  render() {
    if (this.state.apiParams === null) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="app">{
          this.state.apiParams.map((state, idx) => {
            if (idx === questions.length) {
              return (
                <RequestResults key={idx} state={state} />
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
                        .then(state => this.updateState(state, idx))
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