import React from "react";
import {remove, eq} from "lodash/fp";

const withAbortableXhrRequests = (Component) => class extends React.Component {

  addAbortableXhrRequest(xhr) {
    if (xhr.abort && typeof xhr.abort !== "function") {
      throw new Error("parameter xhr must have a function property called abort");
    }
    this.xhrObjects = [...(this.xhrObjects || []), xhr];
    xhr.addEventListener("load",
      () => {
        this.xhrObjects = remove(eq(xhr), this.xhrObjects);
      }, false);
  }

  componentWillUnmount() {
    (this.xhrObjects || []).forEach((xhr) => xhr.abort());
  }

  render() {
    const props = this.props;
    return <Component {...props} addAbortableXhrRequest={this.addAbortableXhrRequest.bind(this)} />;
  }
};

export default withAbortableXhrRequests;

