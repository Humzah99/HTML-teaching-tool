import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "../../shared/components/Style.css";
import DocContent from './DocContent';
const DocumentationItem = (props) => {
  const [showDocumentationModal, setShowDocumentationModal] = useState(false);

  const showDocumentationHandler = () => {
    setShowDocumentationModal(true);
  };

  const cancelDocumentationHandler = () => {
    setShowDocumentationModal(false);
  };

  const confirmDeleteHandler = () => {
    console.log("DELETING...");
  };
  return (
    <React.Fragment>
      <Modal show={showDocumentationModal} onCancel={cancelDocumentationHandler}>
        <Modal.Header className="modal-header">
          <Modal.Title>HTML {props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <DocContent language={"xml"} content={props}/>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <button className="btn btn-secondary" onClick={cancelDocumentationHandler}>
            Close
          </button>
          <button className="btn btn-danger" onClick={confirmDeleteHandler}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>

      <div className="col-md-6 mt-5">
        <a onClick={showDocumentationHandler}>
          <div className="card doc-card">
            <div className="card-body">
              <h5 className="card-title">{props.title}</h5>
              <p className="card-text">{props.description}</p>
            </div>
          </div>
        </a>
      </div>
    </React.Fragment>
  );
};

export default DocumentationItem;
