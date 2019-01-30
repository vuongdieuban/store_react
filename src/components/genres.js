import React, { Component } from "react";
import _ from "lodash";

class Genres extends Component {
  displayGenres = () => {
    const { genres, selectedGenre, onSelectGenre } = this.props;
    return genres.map(genre => {
      return (
        <li
          className={
            genre === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          key={genre._id}
          onClick={() => onSelectGenre(genre)}
        >
          {genre.name}
        </li>
      );
    });
  };
  render() {
    const { selectedGenre, onSelectGenre } = this.props;
    return (
      <div>
        <ul className="list-group">
          <li
            className={
              _.isEmpty(selectedGenre)
                ? "list-group-item active"
                : "list-group-item "
            }
            onClick={() => onSelectGenre({})}
          >
            All Genres
          </li>
          {this.displayGenres()}
        </ul>
      </div>
    );
  }
}

export default Genres;
