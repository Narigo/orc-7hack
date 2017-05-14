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
    this.state.moneyBag.push("💰");
    this.setState({
      money: value,
      count: this.state.count + 1,
      moneyBag: this.state.moneyBag
    });
  }

  render() {
    // const {children, title, description} = this.props;
    console.log("moneybag: ", this.state.moneyBag);

    return (
      <div className="money" onClick={() => this.handleClick(this.state.money + 5)}>
        {this.state.moneyBag.map(() => {
          return <img src="https://emojipedia-us.s3.amazonaws.com/cache/9e/de/9ede0ba323807d2bf1e06ebfecfcdff8.png" />
        })
        }
      </div>
    )
      ;
  };
}