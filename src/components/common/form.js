import React, { Component } from "react";
import Joi from "joi-browser";
import FormInput from "./formInput";

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
    return errors;
  };

  validateField = input => {
    const { name, value } = input;
    const obj = { [name]: value }; // es6 computed property, this is a short hand for obj[name] = value
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    if (!error) return null;
    return error.details[0].message;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = e => {
    const errors = { ...this.state.errors };
    // currentTarget is the current input field/property of the form
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

  renderFormInput = fields => {
    const { data, errors } = this.state;
    console.log(fields);
    return fields.map(field => (
      <FormInput
        key={field.name}
        value={data[field.name]}
        onChange={this.handleChange}
        name={field.name}
        label={field.label}
        placeholder={field.placeholder}
        error={errors[field.name]}
        type={field.type}
      />
    ));
  };
}

export default Form;
