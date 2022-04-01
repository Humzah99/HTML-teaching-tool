import React, { useState } from "react";
import "../../shared/components/Style.css";
import Input from "../../shared/components/FormValidation/Input";
import ImageUpload from "../../shared/components/ImageUpload/ImageUpload";
import { Modal } from "react-bootstrap";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/components/FormValidation/validators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "../../shared/hooks/forms-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";

const SignUpForm = () => {
  // const auth = useContext(AuthContext);
  const history = useHistory();
  const [formState, inputHandler] = useForm(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [passwordShown, setPasswordShown] = useState(false);

  const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;

  const EyeSlash = <FontAwesomeIcon className="icon" icon={faEyeSlash} />;

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstname", formState.inputs.firstname.value);
      formData.append("surname", formState.inputs.surname.value);
      formData.append("username", formState.inputs.username.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("password", formState.inputs.password.value);
      formData.append("image", formState.inputs.image.value);
      const responseData = await sendRequest(
        "http://localhost:5000/api/user/signup",
        "POST",
        formData
      );
      alert("Signed up successfully, please verify your email.");
      history.push("/");
    } catch (err) {}
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

  return (
    <React.Fragment>
      <Modal show={!!error} onCancel={clearError}>
        <Modal.Header className="modal-header">
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">{error}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={clearError}>
            Ok
          </button>
        </Modal.Footer>
      </Modal>
      <form onSubmit={authSubmitHandler} className="mb-5 auth-form">
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
        <ImageUpload center id="image" onInput={inputHandler} />
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
          Sign up
        </button>
      </form>
    </React.Fragment>
  );
};

export default SignUpForm;
