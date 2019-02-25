import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { registerUser } from "../services/userService";
import auth from "../services/authService";

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

  doSubmit = async () => {
    try {
      const response = await registerUser(this.state.data);

      // Loggin User upon successful register
      const jwt = response.headers["x-auth-token"];
      auth.loginWithJwt(jwt);

      // redirect to home page, full reload so App component can re-mount and re-render, allow NavBar to display current user
      window.location = "/";
    } catch (ex) {
      // expected error (error made by user)
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

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
