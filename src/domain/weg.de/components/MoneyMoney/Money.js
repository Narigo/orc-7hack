import React, {Component} from "react";

export default class Money extends Component {

  constructor() {
    super();
    this.state = {
      money: 0,
      count: 0,
      moneyBag: ["💰"]
    };
  }

  handleClick = (value) => {
    if (this.state.count < 8) {
      this.state.moneyBag.push("💰");
    }
    this.setState({
      money: value,
      count: this.state.count + 1,
      moneyBag: this.state.moneyBag
    });
    if (this.state.count > 9) {
      this.setState(
        {
          moneyBag: ["💰"],
          count: 1
        });
    }
  }

  render() {
    // const {children, title, description} = this.props;
    console.log("moneybag: ", this.state.moneyBag);

    return (
      // 9
      <div className="money" onClick={() => this.handleClick(this.state.money + 5)}>
        { this.state.moneyBag.map(() => {
          if (this.state.count < 8) {
            return <img src="https://emojipedia-us.s3.amazonaws.com/cache/9e/de/9ede0ba323807d2bf1e06ebfecfcdff8.png" />
          } else {
            return <img src="https://emojipedia-us.s3.amazonaws.com/cache/ae/f6/aef6f2d4c9b96d79b69a2350a92da8ba.png" />
          }
        })
        }
      </div>
    )
      ;
  };
}