import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Modal } from "react-bootstrap";
import QuizList from "../components/QuizList";
function Quizzes() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedQuizzes, setLoadedQuizzes] = useState();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const responseData = await sendRequest('http://localhost:5000/api/quiz');
        console.log(responseData.quizzes);
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
        <div className="overlay">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      )}
      {!isLoading && loadedQuizzes &&
        <QuizList items={loadedQuizzes} />}
    </React.Fragment>
  );
};

export default Quizzes;