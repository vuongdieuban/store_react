import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Table from "./common/table";

const RentalTable = props => {
  // process the return of a movie (return rental order)
  const processReturns = rental => {
    if (!rental.dateReturned)
      return (
        <Link
          to={{
            pathname: `/returns`,
            state: { rental }
          }}
        >
          Return
        </Link>
      );
    return moment(rental.dateReturned).format("MMMM Do YYYY, h:mm:ss a");
  };

  const formatDateRented = rental => {
    return moment(rental.dateRented).format("MMMM Do YYYY, h:mm:ss a");
  };

  const generateColumns = () => {
    const columns = [
      { label: "Customer", path: "customer.name" },
      { label: "Movie", path: "movie.name" },
      {
        label: "Date Rented",
        path: "dateRented",
        content: rental => formatDateRented(rental)
      },
      {
        label: "Date Returned",
        path: "dateReturned",
        content: rental => processReturns(rental)
      },
      { label: "Rental Fee", path: "rentalFee" }
    ];
    return columns;
  };

  const { rentals, sortColumn, onSort } = props;
  return (
    <Table
      data={rentals}
      columns={generateColumns()}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
};

export default RentalTable;
