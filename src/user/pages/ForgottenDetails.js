import React, { useContext, useRef } from "react";
import Input from "../../shared/components/FormValidation/Input";
import { useForm } from "../../shared/hooks/forms-hooks";
import "../../shared/components/Style.css";
import WebsiteIcon from "../../shared/images/website-logo.png";
import { AuthContext } from "../../shared/components/context/auth-context";
import { VALIDATOR_EMAIL } from "../../shared/components/FormValidation/validators";

const ForgottenDetails = () => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <div className="container" style={{ marginTop: "15%" }}>
      <div className="position-absolute top-0 start-0">
        <a href="/">
          <img
            className="nav-icon shadow-lg"
            src={WebsiteIcon}
            alt="Website-Logo"
          />
        </a>
      </div>
      <div className="card mx-auto login-card">
        <form onSubmit={authSubmitHandler} style={{ width: "121%" }}>
          <div className="row mb-3">
            <div className="col-sm-10">
              <Input
                element="input"
                id="email"
                type="email"
                label="E-mail"
                className="form-control rounded-3"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid e-mail address."
                onInput={inputHandler}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn rounded-pill mt-2"
            style={{ width: "82%" }}
            disabled={!formState.isValid}
          >
            Reset Password
          </button>
        </form>
        <a href="./auth" className="mx-auto mt-3">
          Login
        </a>
      </div>
    </div>
  );
};

export default ForgottenDetails;
