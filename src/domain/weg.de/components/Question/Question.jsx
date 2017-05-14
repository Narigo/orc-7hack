import React, {Component} from "react";

export default class Question extends Component {

  render() {
    const {children, title, description} = this.props;

    return (
      <div className="question">
        <div className="title">{title}</div>
        <div className="description">{description}</div>
        {children}
      </div>
    );
  }
}