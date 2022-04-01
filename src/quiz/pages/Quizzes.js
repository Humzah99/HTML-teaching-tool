import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Modal } from "react-bootstrap";
import QuizList from "../components/QuizList";
import Pagination from '../../shared/components/Pagination/Pagination';
import Footer from '../../shared/components/Footer/Footer';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
function Quizzes() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedQuizzes, setLoadedQuizzes] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeLink, setActiveLink] = useState(1);
  const [quizPerPage] = useState(12);

  const indexOfLastDoc = currentPage * quizPerPage;
  const indexOfFirstDoc = indexOfLastDoc - quizPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    setActiveLink(pageNumber)
    window.scrollTo(0, 0)
  }


  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + '/quiz');
        setLoadedQuizzes(responseData.quizzes);
      } catch (err) { }
    };
    fetchQuizzes();
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
      {!isLoading && loadedQuizzes &&
        <React.Fragment>
          <QuizList items={loadedQuizzes.slice(indexOfFirstDoc, indexOfLastDoc)} />
          <Pagination elementsPerPage={quizPerPage} totalElements={loadedQuizzes.length} paginate={paginate} currentPage={currentPage} activeLink={activeLink} />
          <Footer />
        </React.Fragment>}
    </React.Fragment>
  );
};

export default Quizzes;