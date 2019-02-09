import React from "react";

const SearchBox = props => {
  const { value, onChange } = props;
  return (
    <form>
      <div className="form-group">
        <input
          type="text"
          name="query"
          className="form-control"
          placeholder="Search Movies"
          value={value}
          onChange={e => onChange(e.currentTarget.value)}
        />
      </div>
    </form>
  );
};

export default SearchBox;
