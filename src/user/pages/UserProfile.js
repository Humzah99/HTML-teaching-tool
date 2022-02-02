import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Input from "../../shared/components/FormValidation/Input";
import { useForm } from "../../shared/hooks/forms-hooks";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/components/FormValidation/validators";
import "../../shared/components/Style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;

const EyeSlash = <FontAwesomeIcon className="icon" icon={faEyeSlash} />;

const DUMMY_USERS = [
  {
    id: "1",
    firstname: "Humzah",
    surname: "Wasim",
    username: "Humzah99",
    email: "Humzah99@live.co.uk",
    password: "L1m7L1m1Jb"
  },
  {
    id: "2",
    firstname: "Andrew",
    surname: "Schofield",
    username: "ASch0field123",
    email: "andrew.schofield@mmu.ac.uk",
    password: "KingBest213"
  }
];

const UserProfile = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pass = useRef();
  const userId = useParams().userId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      firstName: {
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
      },
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

  const identifiedUser = DUMMY_USERS.find(u => u.id === userId);

  useEffect(() => {
    if (identifiedUser) {
      setFormData(
        {
          firstName: {
            value: identifiedUser.firstname,
            isValid: true
          },
          surname: {
            value: identifiedUser.surname,
            isValid: true
          },
          username: {
            value: identifiedUser.username,
            isValid: true
          },
          email: {
            value: identifiedUser.email,
            isValid: true
          },
          password: {
            value: identifiedUser.password,
            isValid: true
          }
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedUser]);

  const updateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedUser) {
    return (
      console.log("user id: "+userId),
      console.log(identifiedUser),
      (
        <div className="container">
          <h3 className="mt-5 text-center">Could not find user information.</h3>
        </div>
      )
    );
  }

  if (isLoading) {
    return (
      <div className="container">
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: "10%" }}>
      <div className="card mx-auto login-card">
        <form onSubmit={updateSubmitHandler} style={{ width: "121%" }}>
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
                  value={formState.inputs.firstName.value}
                  valid={formState.inputs.firstName.isValid}
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
                  value={formState.inputs.surname.value}
                  valid={formState.inputs.surname.isValid}
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
                  value={formState.inputs.username.value}
                  valid={formState.inputs.username.isValid}
                />
              </div>
            </div>
          </div>
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
                value={formState.inputs.email.value}
                valid={formState.inputs.email.isValid}
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
                ref={pass}
                element="input"
                id="password"
                type={passwordShown ? "text" : "password"}
                label="Password"
                className="form-control rounded-3"
                validators={[VALIDATOR_MINLENGTH(8)]}
                errorText="Please enter a valid password, at least 8 characters long."
                onInput={inputHandler}
                value={formState.inputs.password.value}
                valid={formState.inputs.password.isValid}
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-4" style={{marginRight: "20%"}}>
              <Link to="/" className="btn btn-secondary me-5">
                Cancel
              </Link>
            </div>
            <div className="col-md-4">
              <button
                type="submit"
                className="btn"
                disabled={!formState.isValid}
              >
                Save Changes
              </button>
            </div>
            <div className="col-md-4"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
