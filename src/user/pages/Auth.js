import React, { useState, useContext } from "react";
import Input from "../../shared/components/FormValidation/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/components/FormValidation/validators";
import { useForm } from "../../shared/hooks/forms-hooks";
import "../../shared/components/Style.css";
import WebsiteIcon from "../../shared/images/website-logo.png";
import { AuthContext } from "../../shared/components/context/auth-context";

const Auth = () => {
    const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
      if(!isLogin) {
          setFormData({
              ...formState.inputs,
              firstname: undefined,
              surname: undefined,
              username: undefined
          }, formState.inputs.email.isValid && formState.inputs.password.isValid)
      } else {
          setFormData({
            ...formState.inputs,
            firstname: {
                value: '',
                isValid: false
            },
            surname: {
                value: '',
                isValid: false
            },
            username: {
                value: '',
                isValid: false
            }
          }, false)
      }
    setIsLogin(prevMode => !prevMode);
  };
  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
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
        <div className="sign-up-link ms-auto">
          <button className="anchor-link" onClick={switchModeHandler} style={{ fontWeight: "bolder" }}>
            {isLogin ? "Sign up" : "Login"}
          </button>
        </div>
        <form onSubmit={authSubmitHandler} style={{ width: "121%" }}>
          {!isLogin && (
            <div>
              <div className="row mb-3">
                <div className="col-sm-5">
                  <Input
                    element="input"
                    id="firstname"
                    type="text"
                    label="First Name"
                    className="form-control rounded-3"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid first name."
                    onInput={inputHandler}
                  />
                </div>
                <div className="col-sm-5">
                  <Input
                    element="input"
                    id="surname"
                    type="text"
                    label="Surname"
                    className="form-control rounded-3"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid surname."
                    onInput={inputHandler}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-10">
                  <Input
                    element="input"
                    id="username"
                    type="text"
                    label="Username"
                    className="form-control rounded-3"
                    validators={[VALIDATOR_MINLENGTH(8)]}
                    errorText="Please enter a valid username."
                    onInput={inputHandler}
                  />
                </div>
              </div>
            </div>
          )}
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
          <div className="row mb-3">
            <div className="col-sm-10">
              <Input
                element="input"
                id="password"
                type="password"
                label="Password"
                className="form-control rounded-3"
                validators={[VALIDATOR_MINLENGTH(8)]}
                errorText="Please enter a valid password, at least 8 characters long."
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
            {isLogin ? "Login" : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
