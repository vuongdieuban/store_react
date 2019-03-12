import React from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

const RentalTable = props => {
  const generateColumns = () => {
    const columns = [
      { label: "Customer", path: "customer.name" },
      { label: "Movie", path: "movie.name" },
      { label: "Date Rented", path: "dateRented" },
      {
        label: "Date Returned",
        path: "dateReturned",
        content: rental => {
          if (!rental.dateReturned)
            return (
              <Link
                to={{
                  pathname: `/returns`
                }}
              >
                Return
              </Link>
            );
          return rental.dateReturned;
        }
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
