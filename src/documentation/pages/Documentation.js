import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Modal } from "react-bootstrap";
import DocumentationList from "../components/DocumentationList";
import Pagination from '../../shared/components/Pagination/Pagination';
import Footer from '../../shared/components/Footer/Footer';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

function Documentation() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDocumentation, setLoadedDocumentation] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeLink, setActiveLink] = useState(1);
  const [docPerPage] = useState(4);

  const indexOfLastDoc = currentPage * docPerPage;
  const indexOfFirstDoc = indexOfLastDoc - docPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    setActiveLink(pageNumber);
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const fetchDocumentation = async () => {
      try {
        const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/documentation');
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
        <LoadingSpinner />
      )}
      {!isLoading && loadedDocumentation && (
        <React.Fragment>
          <DocumentationList items={loadedDocumentation.slice(indexOfFirstDoc, indexOfLastDoc)} />
          <Pagination elementsPerPage={docPerPage} totalElements={loadedDocumentation.length} paginate={paginate} currentPage={currentPage} activeLink={activeLink} />
          <Footer />
        </React.Fragment>
      )};
    </React.Fragment>
  );
}

export default Documentation;
