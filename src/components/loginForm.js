import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
// import FormInput from "./common/formInput";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
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

  doSubmit = () => {
    // call backend service to login
    console.log("submitted");
  };

  renderFields = () => {
    // fields of  form
    const fields = [
      {
        name: "email",
        label: "Email",
        placeholder: "MyEmail@gmail.com",
        type: "text"
      },
      {
        name: "password",
        label: "Password",
        placeholder: "enter valid password",
        type: "password"
      }
    ];
    return this.renderFormInput(fields);
  };

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderFields()}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
