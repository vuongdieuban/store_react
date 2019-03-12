import React, { Component } from "react";
import _ from "lodash";
import RentalTable from "./rentalsTable";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import { getAllRentals } from "../services/rentalService";

class Rentals extends Component {
  state = {
    rentals: [],
    pageSize: 3, // number of rentals per page
    currentPage: 1,

    sortColumn: { path: "customer.name", order: "asc" },

    searchQuery: ""
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: {}, currentPage: 1 });
  };

  paginate = (rentals, pageSize, currentPage) => {
    const startIndex = (currentPage - 1) * pageSize;
    const currentRentals = _(rentals)
      .slice(startIndex)
      .take(pageSize)
      .value();
    return currentRentals;
  };

  getPagedData = () => {
    const {
      rentals: allRentals,
      pageSize,
      currentPage,
      sortColumn,
      searchQuery
    } = this.state;

    // filter by searchQuery
    let filteredRentals = allRentals;
    if (searchQuery) {
      filteredRentals = allRentals.filter(rental =>
        rental.customer.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    const sortedRentals = _.orderBy(
      filteredRentals,
      [sortColumn.path],
      [sortColumn.order]
    );

    const rentals = this.paginate(sortedRentals, pageSize, currentPage);
    return { rentals, itemCount: filteredRentals.length };
  };

  async componentDidMount() {
    const rentals = await getAllRentals();
    this.setState({ rentals });
  }

  render() {
    const {
      rentals: allRentals,
      pageSize,
      currentPage,
      sortColumn
    } = this.state;

    const { rentals, itemCount } = this.getPagedData();

    return (
      <div className="container">
        <h1>Rentals</h1>
        <div className="row">
          <div className="col-md-8">
            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
              placeholder="Search Customer"
            />
          </div>
        </div>

        <RentalTable
          rentals={rentals}
          onSort={this.handleSort}
          sortColumn={sortColumn}
        />

        <Pagination
          itemCount={itemCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Rentals;
