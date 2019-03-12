import React, { Component } from "react";

class Returns extends Component {
  state = {
    rental: {}
  };
  render() {
    // obtain the rental from /rentals page. Will cause error if go here directly
    // console.log(this.props.location.state.rental);
    return <h1>Returns</h1>;
  }
}

export default Returns;
