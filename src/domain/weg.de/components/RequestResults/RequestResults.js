import React, {Component} from "react";
import {requestParams} from "./../../../../finder";
import {FILTERS} from "./../../data/configuration";
import {HotelList} from "./../index";

export default class RequestResults extends Component {

  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const {state} = this.props;
    const params = requestParams(state.filters)(FILTERS);
    const urlParams = Object.keys(params).map(key => {
      const value = expandValue(params[key]);
      if (value !== "" && value !== void 0) {
        return `&${key}=${value}`;
      } else {
        return "";
      }
    }).join("");
    const baseUri = "https://cors-anywhere.herokuapp.com/http://7hack.comvel.net/weg.de/v1/products?";
    const apikey = "apikey=7Hack%212017&channel=HOTEL";
    const url = `${baseUri}${apikey}${urlParams}&sort=stars&limit=30`;

    console.log("url to request=", url);

    return fetch(url,
      {
        mode: "cors",
        redirect: "follow",
        cache: "no-cache"
      })
      .then(response => {
        console.log("response=", response);
        console.log("response.status=", response.status);
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response.json());
        } else {
          return Promise.reject(new Error(response.statusText));
        }
      })
      .then(json => {
        this.setState({
          loading: false,
          result: json.response
        })
      })
      .catch(error => console.log("Result failed!", error));

    function expandValue(value) {
      if (!!value.length) {
        return value.join(",");
      }
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <div>Loading results</div>
      );
    } else {
      return (
        <HotelList hotels={this.state.result.offerList} />
      );
    }
  }

}
