import React, { Component } from "react";
import _ from "lodash";
import RentalTable from "./rentalsTable";
import { getAllRentals } from "../services/rentalService";

class Rentals extends Component {
  state = {
    rentals: [],
    sortColumn: { path: "customer.name", order: "asc" }
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { rentals, sortColumn } = this.state;
    const sortedRentals = _.orderBy(
      rentals,
      [sortColumn.path],
      [sortColumn.order]
    );
    return sortedRentals;
  };

  async componentDidMount() {
    const rentals = await getAllRentals();
    this.setState({ rentals });
  }

  render() {
    const { sortColumn } = this.state;
    const rentals = this.getPagedData();
    return (
      <div className="container">
        <h1>Rentals</h1>
        <RentalTable
          rentals={rentals}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        />
      </div>
    );
  }
}

export default Rentals;
