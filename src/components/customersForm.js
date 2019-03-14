import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { saveCustomer } from "../services/customerService";

class CustomerForm extends Form {
  state = {
    data: { name: "", email: "", phone: "" },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
      .label("Name"),

    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .min(5)
      .max(255)
      .required()
      .label("Email"),

    phone: Joi.string()
      .min(5)
      .max(10)
      .required()
      .label("Phone")
  };

  doSubmit = async () => {
    try {
      await saveCustomer(this.state.data);
      this.props.history.replace("/movies");
    } catch (ex) {
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
        <h1>Customer</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderFormInput("name", "Name", "Ban Vuong", "text")}
          {this.renderFormInput("email", "Email", "MyEmail@gmail.com", "text")}
          {this.renderFormInput("phone", "Phone", "123456789", "text")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default CustomerForm;
