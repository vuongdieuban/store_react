import React from "react";

const FormSelect = props => {
  const { name, value, label, options, error, onChange } = props;

  const renderOptions = () => {
    return (
      options &&
      options.map(option => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))
    );
  };

  return (
    <div className="form-group row">
      <label htmlFor={name} className="col-sm-2 col-form-label">
        {label}
      </label>
      <div className="col-sm-5">
        <select
          className="form-control"
          name={name}
          id={name}
          onChange={onChange}
          value={value}
        >
          {renderOptions()}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default FormSelect;
