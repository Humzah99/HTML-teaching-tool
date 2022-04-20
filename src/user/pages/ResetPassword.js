import React, { useEffect, useState } from "react";
import Input from "../../shared/components/FormValidation/Input";
import { useForm } from "../../shared/hooks/forms-hooks";
import "../../shared/components/Style.css";
import WebsiteIcon from "../../shared/images/website-logo.PNG";
import { VALIDATOR_MINLENGTH } from "../../shared/components/FormValidation/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt_decode from 'jwt-decode';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;

const EyeSlash = <FontAwesomeIcon className="icon" icon={faEyeSlash} />;

const ResetPassword = () => {
    const token = useParams().token;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [passwordShown, setPasswordShown] = useState(false);
    const history = useHistory();
    const [formState, inputHandler] = useForm(
        {
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

    useEffect(() => {
        const fetchForgottenPassword = async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/user/verifyToken/${token}`);
            }
            catch (err) { }
        }
        fetchForgottenPassword();
    }, [sendRequest, token])

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        const {email} = jwt_decode(token);
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + "/user/resetPassword",
                "POST",
                JSON.stringify({
                    email: email,
                    password: formState.inputs.password.value
                }),
                {
                    "Content-Type": "application/json"
                }
            );
            alert("Password successfully resetted");
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
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ResetPassword;
