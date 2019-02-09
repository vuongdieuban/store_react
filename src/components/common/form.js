import React, { Component } from "react";
import Joi from "joi-browser";
import FormInput from "./formInput";
import FormSelect from "./formSelect";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    // console.log("Error in validate\n", errors);
    return errors;
  };

  validateField = input => {
    const { name, value } = input; // name and value property of the current html element
    const obj = { [name]: value }; // es6 computed property, this is a short hand for obj[name] = value
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    if (!error) return null;
    // console.log("Error validate Field\n", error);
    return error.details[0].message;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.doSubmit();
  };

  handleChange = e => {
    const errors = { ...this.state.errors };
    // currentTarget is the current input element/field/property of the form
    const { currentTarget } = e;
    const errorMessage = this.validateField(currentTarget);
    if (errorMessage) errors[currentTarget.name] = errorMessage;
    else delete errors[currentTarget.name];

    const data = { ...this.state.data };
    data[currentTarget.name] = currentTarget.value;
    this.setState({ data, errors });
  };

  renderButton = label => {
    return (
      <button disabled={this.validate()} className="btn btn-primary ">
        {label}
      </button>
    );
  };

  renderFormInput = (name, label, placeholder, type) => {
    const { data, errors } = this.state;
    return (
      <FormInput
        name={name}
        value={data[name]}
        error={errors[name]}
        label={label}
        placeholder={placeholder}
        type={type}
        onChange={this.handleChange}
      />
    );
  };

  renderFormSelect = (name, label, options) => {
    const { data, errors } = this.state;
    return (
      <FormSelect
        name={name}
        value={data[name]}
        error={errors[name]}
        options={options}
        label={label}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
