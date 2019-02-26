import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

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

  doSubmit = async () => {
    try {
      // data holds JWT token returned from server
      await auth.loginUser(this.state.data);

      // redirect to home page or previous page that require login, full-reload
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // if user is already logged in, redirect to homepage
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderFormInput("email", "Email", "MyEmail@gmail.com", "text")}
          {this.renderFormInput(
            "password",
            "Password",
            "enter valid password",
            "password"
          )}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
