import React, { Component } from "react";
import _ from "lodash";

class Pagination extends Component {
  renderMovies = () => {
    const { movies, moviesPerPage, currentPage } = this.props;
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const pages = _.range(1, totalPages + 1);
    return pages.map(page => {
      return (
        <li
          className={page === currentPage ? "page-item active" : "page-item"}
          key={page}
        >
          <div
            className="page-link"
            onClick={() => this.props.onPageChange(page)}
          >
            {/* Display page number starting from 1 (page start from 0) */}
            {page}
          </div>
        </li>
      );
    });
  };
  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">{this.renderMovies()}</ul>
      </nav>
    );
  }
}

export default Pagination;
