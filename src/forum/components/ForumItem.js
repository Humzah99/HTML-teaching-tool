import React, { useState, useContext } from "react";
import "../../shared/components/Style.css";
import { Modal } from "react-bootstrap";
import { AuthContext } from "../../shared/components/context/auth-context";
import { Link } from "react-router-dom";

const ForumItem = props => {
  const auth = useContext(AuthContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmationModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmationModal(false);
  };

  const confirmDeleteHandler = () => {
    console.log("DELETING...");
  };
  return (
    <div>
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
        <div className="card-body">
          <h5 className="card-title">{props.heading}</h5>
          <p className="card-text">{props.text}</p>
          <div className="d-flex bd-highlight">
            {auth.isLoggedIn && (
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
              <Link to={`forum/view/${props.id}`} className="btn btn-success">
                View question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumItem;
