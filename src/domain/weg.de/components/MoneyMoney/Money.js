import React, {Component} from "react";

export default class Money extends Component {

  constructor() {
    super();
    this.state = {
      moneyBag: ["💰"]
    };
  }

  handleClick() {
    this.setState({
      moneyBag: [...this.state.moneyBag, "💰"]
    });
  }

  render() {
    return (
      <div className="money" onClick={() => this.handleClick()}>
        {(this.state.moneyBag.length > 8)
          ? <img src="https://emojipedia-us.s3.amazonaws.com/cache/ae/f6/aef6f2d4c9b96d79b69a2350a92da8ba.png" />
          : this.state.moneyBag.map(() =>
            <img src="https://emojipedia-us.s3.amazonaws.com/cache/9e/de/9ede0ba323807d2bf1e06ebfecfcdff8.png" />
          )}
      </div>
    )
      ;
  };
}