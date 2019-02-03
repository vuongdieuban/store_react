import React, { Component } from "react";
import _ from "lodash";

class Genres extends Component {
  displayData = () => {
    const { data, selectedItem, onSelectItem } = this.props;
    return data.map(item => {
      return (
        <li
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          key={item._id}
          onClick={() => onSelectItem(item)}
        >
          {item.name}
        </li>
      );
    });
  };
  render() {
    const { selectedItem, onSelectItem } = this.props;
    return (
      <div>
        <ul className="list-group">
          <li
            className={
              _.isEmpty(selectedItem)
                ? "list-group-item active"
                : "list-group-item "
            }
            onClick={() => onSelectItem({})}
          >
            All Genres
          </li>
          {this.displayData()}
        </ul>
      </div>
    );
  }
}

export default Genres;
