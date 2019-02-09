import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { username: "", email: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .alphanum()
      .min(5)
      .max(50)
      .required()
      .label("Username"),

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

  fields = [
    {
      name: "username",
      label: "Username",
      placeholder: "bdvuong",
      type: "text"
    },
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

  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderFormInput("username", "Username", "bdvuong", "text")}
          {this.renderFormInput("email", "Email", "MyEmail@gmail.com", "text")}
          {this.renderFormInput(
            "password",
            "Password",
            "enter valid password",
            "password"
          )}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
