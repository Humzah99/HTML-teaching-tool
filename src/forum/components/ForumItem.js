import React, { useState, useContext } from "react";
import "../../shared/components/Style.css";
import { Modal } from "react-bootstrap";
import { AuthContext } from "../../shared/components/context/auth-context";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";

const ForumItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const history = useHistory();
  console.log(props);
  const showDeleteWarningHandler = () => {
    setShowConfirmationModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmationModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmationModal(false);
    try {
      await sendRequest(`http://localhost:5000/api/forum/${props.id}`, 'DELETE', null, {Authorization: 'Bearer ' + auth.token});
      props.onDelete(props.id)
      history.push(`/forum`);
    }
    catch (err) { }
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
      <Modal show={showConfirmationModal} onCancel={cancelDeleteHandler}>
        <Modal.Header className="modal-header">
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          Do you want to proceed and delete this question? Please note that this
          cannot be undone.{" "}
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <button className="btn btn-secondary" onClick={cancelDeleteHandler}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={confirmDeleteHandler}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>

      <div className="card forum-list-card mt-3">
        {isLoading && (
          <div className="overlay">
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
        <div className="card-body">
          <h4 className="card-title">{props.heading}</h4>
          <p className="card-text">{props.text}</p>
          <div className="d-flex bd-highlight">
            {auth.userId === props.user.id && (
              <div className="p-2 flex-fill bd-highlight">
                <Link to={`/forum/update/${props.id}`} className="btn btn-warning me-2">
                  Edit
                </Link>

                <button
                  onClick={showDeleteWarningHandler}
                  className="btn btn-danger me-2"
                >
                  Delete
                </button>
              </div>
            )}
            <div className="p-2 flex-fill bd-highlight"></div>
            <div className="p-2 flex-fill bd-highlight text-end">
              <Link to={`/forum/view/${props.id}`} className="btn btn-success">
                View question
              </Link>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <strong><p className="float-end text-muted"> {props.user.username} asked {props.createdAt}</p></strong>
        </div>
      </div>
    </React.Fragment >
  );
};

export default ForumItem;
