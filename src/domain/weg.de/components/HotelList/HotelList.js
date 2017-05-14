import React, {Component} from "react";

export default class HotelList extends Component {
  render() {
    const {hotels} = this.props;
    return (
      <div className="hotel-list">{
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
      <div className="hotel">
        <div className="hotel-wrapper">
          <h2>{comvelHotel.hotelName}</h2>
          <h4>{comvelHotel.country.name}</h4>
          <img src={comvelHotel.image.url} />
        </div>
      </div>
    )
  }
}
