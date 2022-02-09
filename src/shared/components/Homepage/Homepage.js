/* eslint-disable react/react-in-jsx-scope */
import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HtmlDocumentationCode from "../../images/blurred-html-code.png";
import QuizCode from "../../images/quiz-ss.png";
import { AuthContext } from "../context/auth-context";
import Input from "../FormValidation/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../FormValidation/validators";
import "./Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "../../hooks/forms-hooks";

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;

const EyeSlash = <FontAwesomeIcon className="icon" icon={faEyeSlash} />;
const LoggedInHomepage = () => {
  const auth = useContext(AuthContext);
  const [passwordShown, setPasswordShown] = useState(false);
  const pass = useRef();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  return (
    <>
      {auth.isLoggedIn ? (
        <div className="row">
          <div className="col-lg-6 first-col">
            <div className="card featured-doc-card text-center">
              <img src={HtmlDocumentationCode} className="card-img" alt="..." />
              <div className="card-img-overlay h-100 d-flex flex-column justify-content-end">
                <h3 className="card-title">HTML Headings</h3>
              </div>
            </div>
            <div className="featured-button-container">
              <Link
                to="/documentation"
                className="btn rounded-pill mt-2"
                style={{ width: "20%" }}
              >
                Go to featured topic
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card featured-quiz-card text-center">
              <img src={QuizCode} className="card-img" alt="..." />
              <div className="card-img-overlay h-100 d-flex flex-column justify-content-end">
                <h3 className="card-title">HTML Tables</h3>
              </div>
            </div>
            <div className="featured-button-container">
              <Link
                to="/quiz/1"
                className="btn rounded-pill mt-2"
                style={{ width: "20%" }}
              >
                Go to featured quiz
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-6 first-col"></div>
          <div className="col-lg-6">
            {" "}
            <div className="container" style={{ marginTop: "25%" }}>
              <div className="card mx-auto login-card">
                <h2 className="mb-5">
                  Join the ever-growing HTML learning tool for free today!
                </h2>
                <form onSubmit={authSubmitHandler} style={{ width: "121%" }}>
                  <div>
                    <div className="row mb-5">
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
                    <div className="row mb-5">
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
                  <div className="row mb-5">
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
                  <div className="row mb-5">
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
                        ref={pass}
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
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoggedInHomepage;
