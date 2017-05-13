import React, {Component} from "react";
import {questions} from "../";

export default class App extends Component {

  render() {
    return <div className="app">
      {questions.map(question => {
        return (
          <Question
            title={question.title}
            description={question.description}
          />
        );
      })}
    </div>
  }
}