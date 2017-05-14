import React, {Component} from "react";

export default class HotelList extends Component {
  render() {
    const {hotels} = this.props;
    return (
      <div>{
        hotels.map((hotel, idx) => {
          return (
            <Hotel key={idx} {...hotel} />
          );
        })
      }</div>
    );
  }
}

class Hotel extends Component {
  render() {
    const {comvelHotel} = this.props;
    return (
      <div>
        <h2>{comvelHotel.hotelName}</h2>
        <img src={comvelHotel.image.url} />
      </div>
    )
  }
}
