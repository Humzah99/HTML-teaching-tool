import React, { useState, useContext/*, useRef*/ } from "react";
import Input from "../../shared/components/FormValidation/Input";
import { Modal } from "react-bootstrap";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/components/FormValidation/validators";
import { useForm } from "../../shared/hooks/forms-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "../../shared/components/Style.css";
import WebsiteIcon from "../../shared/images/website-logo.png";
import { AuthContext } from "../../shared/components/context/auth-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;

const EyeSlash = <FontAwesomeIcon className="icon" icon={faEyeSlash} />;

const Auth = () => {
  const auth = useContext(AuthContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //const pass = useRef();

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

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const switchModeHandler = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          firstname: undefined,
          surname: undefined,
          username: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          firstname: {
            value: "",
            isValid: false
          },
          surname: {
            value: "",
            isValid: false
          },
          username: {
            value: "",
            isValid: false
          }
        },
        false
      );
    }
    setPasswordShown(false);
    setIsLogin(prevMode => !prevMode);
  };
  const authSubmitHandler = async event => {
    event.preventDefault();

    console.log(formState.inputs)
    if (isLogin) {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/user/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          })
        auth.login(responseData.user.username, responseData.user.id);
      } catch (err) {

      }

    } else {
      try {
        const responseData = await sendRequest(
          'http://localhost:5000/api/user/signup',
          'POST',
          JSON.stringify({
            username: formState.inputs.username.value,
            firstname: formState.inputs.firstname.value,
            surname: formState.inputs.surname.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          })
        auth.login(responseData.user.username, responseData.user.id);
      } catch (err) {
      };
    }
  };
  return (
    <React.Fragment>
      <Modal show={!!error} onCancel={clearError}>
        <Modal.Header className="modal-header">
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {error}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={clearError}>
            Ok
          </button>
        </Modal.Footer>
      </Modal>
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
          {isLoading && <div className="overlay">
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>}
          <div className="sign-up-link ms-auto">
            <button
              className="anchor-link"
              onClick={switchModeHandler}
              style={{ fontWeight: "bolder" }}
            >
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
                {passwordShown ? (
                  <span className="eye-icon" onClick={togglePassword}>
                    {Eye}
                  </span>
                ) : (
                  <span className="eye-icon" onClick={togglePassword}>
                    {EyeSlash}
                  </span>
                )}
                <Input
                  //ref={pass}
                  element="input"
                  id="password"
                  type={passwordShown ? "text" : "password"}
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
          {isLogin && (
            <a
              href="/forgottenDetails"
              className="mx-auto mt-3"
              style={{ color: "black" }}
            >
              Forgotten password?
            </a>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auth;
