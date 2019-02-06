import React from "react";

const FormInput = props => {
  const { name, label, value, onChange, type, placeholder, error } = props;
  return (
    <div className="form-group row">
      <label htmlFor={name} className="col-sm-2 col-form-label">
        {label}
      </label>
      <div className="col-sm-5">
        <input
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          placeholder={placeholder}
          type={type}
          className="form-control"
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default FormInput;
