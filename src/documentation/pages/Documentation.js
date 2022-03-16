import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Modal } from "react-bootstrap";
import DocumentationList from "../components/DocumentationList";

function Documentation() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDocumentation, setLoadedDocumentation] = useState();

  useEffect(() => {
    const fetchDocumentation = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/documentation');
        console.log(responseData.documentation);
        setLoadedDocumentation(responseData.documentation);
      } catch (err) { }
    };
    fetchDocumentation();
  }, [sendRequest]);
  return (
    <React.Fragment>
      <Modal show={!!error} onClear={clearError}>
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
      {isLoading && (
        <div className="overlay">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
      {!isLoading && loadedDocumentation &&
        <DocumentationList items={loadedDocumentation} />};
    </React.Fragment>
  );
}

export default Documentation;
