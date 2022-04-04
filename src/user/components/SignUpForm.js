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
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const SignUpForm = (props) => {
  const history = useHistory();
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
      formData.append("firstname", props.formState.inputs.firstname.value);
      formData.append("surname", props.formState.inputs.surname.value);
      formData.append("username", props.formState.inputs.username.value);
      formData.append("email", props.formState.inputs.email.value);
      formData.append("password", props.formState.inputs.password.value);
      formData.append("image", props.formState.inputs.image.value);
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/user/signup",
        "POST",
        formData
      );
      alert("Signed up successfully, please verify your email.");
      history.push("/");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <LoadingSpinner />
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
                onInput={props.inputHandler}
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
                onInput={props.inputHandler}
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
                onInput={props.inputHandler}
              />
            </div>
          </div>
        </div>
        <ImageUpload center id="image" onInput={props.inputHandler} />
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
              onInput={props.inputHandler}
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
              element="input"
              id="password"
              type={passwordShown ? "text" : "password"}
              label="Password"
              className="form-control rounded-3"
              validators={[VALIDATOR_MINLENGTH(8)]}
              errorText="Please enter a valid password, at least 8 characters long."
              onInput={props.inputHandler}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn rounded-pill mt-2"
          style={{ width: "82%" }}
          disabled={!props.formState.isValid}
        >
          Sign up
        </button>
      </form>
    </React.Fragment>
  );
};

export default SignUpForm;
