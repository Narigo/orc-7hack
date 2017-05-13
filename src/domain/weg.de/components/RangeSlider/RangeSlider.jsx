import React, {Component} from "react";
import InputRange from 'react-input-range';

export default class RangeSlider extends Component {

  constructor() {
    super();

    this.state = {
      value: 0
    }
  }

  render() {
    return <InputRange
      className="range-slider"
      maxValue={20}
      minValue={0}
      value={this.state.value}
      onChange={value => this.setState({value})}
    />
  }
}