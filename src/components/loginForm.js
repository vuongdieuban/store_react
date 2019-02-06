import React, { Component } from "react";
import Joi from "joi-browser";
import FormInput from "./common/formInput";

class LoginForm extends Component {
  state = {
    account: { email: "", password: "" },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .min(5)
      .max(255)
      .required()
      .label("Email"),

    password: Joi.string()
      .min(5)
      .max(255)
      .required()
      .label("Password")
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = input => {
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
    // else call backend service to login
  };

  handleChange = e => {
    const errors = { ...this.state.errors };
    // currentTarget is the current input field/property of the form
    const { currentTarget } = e;
    const errorMessage = this.validateProperty(currentTarget);
    if (errorMessage) errors[currentTarget.name] = errorMessage;
    else delete errors[currentTarget.name];

    const account = { ...this.state.account };
    account[currentTarget.name] = currentTarget.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            value={account.email}
            onChange={this.handleChange}
            name="email"
            label="Email"
            placeholder="MyEmail@gmail.com"
            error={errors.email}
            type="text"
          />
          <FormInput
            value={account.password}
            onChange={this.handleChange}
            name="password"
            label="Password"
            placeholder="enter your password"
            error={errors.password}
            type="password"
          />
          <button className="btn btn-primary ">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
