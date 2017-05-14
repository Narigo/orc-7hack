import React, {Component} from "react";

export default class Question extends Component {

  render() {
    const {children, title, description} = this.props;

    return (
      <div className="question">
        <h1 className="title">{title}</h1>
        <h3 className="description">{description}</h3>
        {children}
      </div>
    );
  }
}