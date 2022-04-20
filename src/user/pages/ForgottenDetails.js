import React from "react";
import Input from "../../shared/components/FormValidation/Input";
import { useForm } from "../../shared/hooks/forms-hooks";
import "../../shared/components/Style.css";
import WebsiteIcon from "../../shared/images/website-logo.PNG";
import { VALIDATOR_EMAIL } from "../../shared/components/FormValidation/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const ForgottenDetails = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const history = useHistory();
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/user/forgotPassword",
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
        }),
        {
          "Content-Type": "application/json"
        }
      );
      alert("Please check your email to reset the password");
      history.push("/");
    } catch (err) { }
  };
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
      <div className="container" style={{ marginTop: "15%" }}>
        {isLoading && (
          <LoadingSpinner />
        )}
        <div className="position-absolute top-0 start-0">
          <a href="/">
            <img
              className="nav-icon auth-icon"
              src={WebsiteIcon}
              alt="Website-Logo"
            />
          </a>
        </div>
        <div className="card mx-auto login-card">
          <form onSubmit={authSubmitHandler} className="auth-form">
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
    </React.Fragment>
  );
};

export default ForgottenDetails;
