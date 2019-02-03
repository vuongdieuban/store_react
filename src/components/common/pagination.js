import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class Pagination extends Component {
  renderPages = () => {
    const { itemCount, pageSize, currentPage } = this.props;
    const totalPages = Math.ceil(itemCount / pageSize);
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
            {page}
          </div>
        </li>
      );
    });
  };
  render() {
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">{this.renderPages()}</ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
