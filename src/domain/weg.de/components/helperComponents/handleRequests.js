import React from "react";
import superagent from "superagent";
import _ from "lodash";
import {formatUrl} from "../../helpers/ApiClient.js";
import withAbortableXhrRequests from "../HelperComponents/withAbortableXhrRequests";

const handleRequests = (Component) => {

  class HandleRequest extends React.Component {

    cachedResult = [];

    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        error: null,
        success: false
      };
    }

    setLoadingState = () => {
      const {loading} = this.state;

      if (!loading) {

        this.cachedResult = [];

        this.setState({
          loading: true,
          error: null,
          success: false
        });
      }
    };

    setErrorState = (errMsg, cb) => {
      const {error} = this.state;

      if (!_.isNil(error)) {

        this.cachedResult = [];

        if (_.isFunction(cb)) {
          cb(errMsg, []);
        }
        this.setState({
          loading: false,
          success: false,
          error: errMsg
        });

      }
    };

    setSuccessState = (result, cb) => {
      const {success} = this.state;

      if (!success) {

        this.cachedResult = result;

        if (_.isFunction(cb)) {
          cb(false, result);
        }

        this.setState({
          loading: false,
          success: true,
          error: null
        });

      }
    };

    _handleRequest = (url, cb) => {
      const {addAbortableXhrRequest} = this.props;
      this.setLoadingState();

      const request = superagent
        .get(formatUrl(url))
        .end((err, {body = []}) => {
          if (err) {
            this.setErrorState(err, cb);
          } else {
            this.setSuccessState(body, cb);
          }
        });

      addAbortableXhrRequest(request);
    };

    _getResult = () => {
      return this.cachedResult;
    };

    render() {
      const props = _.omit(this.props, "addAbortableXhrRequest");

      return <Component
        {...props}
        getResult={this._getResult}
        handleRequest={this._handleRequest}
        handleRequestState={this.state}
      />;
    }
  }

  return withAbortableXhrRequests(HandleRequest);
};

export default handleRequests;
