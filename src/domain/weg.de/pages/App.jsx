import React, {Component} from "react";
import * as _ from "lodash";
import {questions, filters} from "../data/configuration";
import {createFinder, ask, requestParams} from "./../../../finder";
import {Question, Result} from "./../components"
import handleRequest from "./../components/helperComponents/handleRequests";
import {properties, createParametersForUri} from "./../../../wegDeRequest";
import WegDeComponent from "../../../wegDeRequest";

@handleRequest
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
    const {handleRequest, getResult} = this.props;
    if (this.state.apiParams === null) {
      return <div>Loading</div>;
    } else {
      return (
        <div className="app">{
          this.state.apiParams.map((state, idx) => {
            if (idx === questions.length) {
              return (
                <Result result={getResult()} />
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
                            const baseUri = "http://7hack.comvel.net/weg.de/v1/products?";
                            const apikey = "apikey=7Hack%212017";
                            const requestParamsObject = requestParams(state.filters);
                            const apiParamsFilterObject = requestParamsObject(state);

                            console.log("apiParamsFilterObject: ", apiParamsFilterObject);

                            const fullUri = baseUri + apikey + createParametersForUri(apiParamsFilterObject);
                            return handleRequest(fullUri);
                          } else {

                            console.log("updateState");
                            return this.updateState(state);
                          }
                        })
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