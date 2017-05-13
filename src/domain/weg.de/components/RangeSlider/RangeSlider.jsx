import React, {Component} from "react";
import InputRange from "react-input-range";

export default class RangeSlider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: props.initialValue
    }
  }

  _onChange = (value) => this.setState({value});

  render() {
    const {maxValue, minValue, step, onChangeCompleteFN} = this.props;

    return <InputRange
      className="range-slider"
      maxValue={maxValue}
      minValue={minValue}
      step={step}
      value={this.state.value}
      onChange={this._onChange}
      onChangeComplete={onChangeCompleteFN}
    />
  }
}