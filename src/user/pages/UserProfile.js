import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Input from "../../shared/components/FormValidation/Input";
import { useForm } from "../../shared/hooks/forms-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Modal } from "react-bootstrap";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/components/FormValidation/validators";
import "../../shared/components/Style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/components/context/auth-context";

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;

const EyeSlash = <FontAwesomeIcon className="icon" icon={faEyeSlash} />;

const UserProfile = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const pass = useRef();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const userId = useParams().userId;
  const [loadedUser, setLoadedUser] = useState();

  console.log(auth);
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


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/user/${userId}`);
        console.log(responseData.user);
        setLoadedUser(responseData.user);
        setFormData(
          {
            firstName: {
              value: responseData.user.firstname,
              isValid: true
            },
            surname: {
              value: responseData.user.surname,
              isValid: true
            },
            username: {
              value: responseData.user.username,
              isValid: true
            },
            email: {
              value: responseData.user.email,
              isValid: true
            },
            password: {
              value: responseData.user.password,
              isValid: true
            },
          },
          true
        );
      } catch (err) {
      }
    };
    fetchUser();
  }, [sendRequest, userId]);


  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const updateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(`http://localhost:5000/api/user/${userId}`, 'PATCH', JSON.stringify({
        firstname: formState.inputs.firstName.value,
        surname: formState.inputs.surname.value,
        //username: formState.inputs.username.value,
        //email: formState.inputs.email.value,
        password: formState.inputs.password.value,
      }),
        {
          'Content-Type': 'application/json'
        }
      );
      alert("User profile updated.")
      history.push(`/`);
    } catch (err) { }
  };

  if (isLoading) {
    return (
      <div className="overlay">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!loadedUser && !error) {
    return (
      console.log("user id: " + userId),
      console.log(loadedUser),
      (
        <div className="container">
          <h3 className="mt-5 text-center">Could not find user information.</h3>
        </div>
      )
    );
  }


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
      <div className="container" style={{ marginTop: "10%" }}>
        <div className="card mx-auto login-card">
          {!isLoading && loadedUser && <form onSubmit={updateSubmitHandler} style={{ width: "121%" }}>
            <div>
              <div className="row mb-3">
                <div className="col-sm-5">
                  <Input
                    element="input"
                    id="firstName"
                    type="text"
                    label="First Name"
                    className="form-control rounded-3"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid first name."
                    onInput={inputHandler}
                    value={loadedUser.firstname}
                    valid={true}
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
                    value={loadedUser.surname}
                    valid={true}
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
                    disabled="true"
                    validators={[VALIDATOR_MINLENGTH(8)]}
                    errorText="Please enter a valid username."
                    onInput={inputHandler}
                    value={loadedUser.username}
                    valid={true}
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
                  disabled="true"
                  validators={[VALIDATOR_EMAIL()]}
                  errorText="Please enter a valid e-mail address."
                  onInput={inputHandler}
                  value={loadedUser.email}
                  valid={true}
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
                  value={loadedUser.password}
                  valid={true}
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-4" style={{ marginRight: "20%" }}>
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
          </form>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
