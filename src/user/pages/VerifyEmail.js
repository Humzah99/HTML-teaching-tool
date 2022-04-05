import React, { useEffect } from "react";
import "../../shared/components/Style.css";
import WebsiteIcon from "../../shared/images/website-logo.png";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const VerifyEmail = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const token = useParams().token;

    useEffect(() => {
        const fetchVerifyEmail = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/user/verify/${token}`);
            }
            catch (err) { }
        }
        fetchVerifyEmail();
    }, [sendRequest, token])
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
                            className="nav-icon shadow-lg"
                            src={WebsiteIcon}
                            alt="Website-Logo"
                        />
                    </a>
                </div>
                <div className="container">
                    <div className="card no-questions-card mt-5">
                        <div className="card-body text-center">
                            <h5>Email verified</h5>
                            <Link to="/auth" className="btn mt-3">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default VerifyEmail;
