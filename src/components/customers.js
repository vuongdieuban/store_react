import React, { Component } from "react";
import { getAllCustomers } from "../services/customerService";

class Customers extends Component {
  state = {
    customers: []
  };

  async componentDidMount() {
    const customers = await getAllCustomers();
    this.setState({ customers });
  }

  render() {
    return (
      <div className="container">
        <h1>Customers</h1>
      </div>
    );
  }
}

export default Customers;
