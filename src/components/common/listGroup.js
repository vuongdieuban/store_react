import React, { Component } from "react";

class ListGroup extends Component {
  displayData = () => {
    const { data, selectedItem, onSelectItem } = this.props;
    return data.map(item => {
      return (
        <li
          className={
            item === selectedItem
              ? "list-group-item active clickable"
              : "list-group-item clickable"
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
    return (
      <div>
        <ul className="list-group">{this.displayData()}</ul>
      </div>
    );
  }
}

export default ListGroup;
