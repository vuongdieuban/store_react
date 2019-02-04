import React, { Component } from "react";

class MovieForm extends Component {
  // history.replace redirect back to /movies and does not allow "back" button on the browser to come back to this page(usually used after sending a form or logged in). Whereas history.push after redirect back to /movies still allow the back button to come back to this page
  handleSave = () => this.props.history.replace("/movies");
  render() {
    return (
      <div>
        <h1>Movie: {this.props.match.params.id}</h1>
        <button className="btn btn-primary" onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
