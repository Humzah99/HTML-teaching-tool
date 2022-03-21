import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "../components/NewQuiz.css";
import "../../shared/components/Style.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Modal } from "react-bootstrap";
import { AuthContext } from "../../shared/components/context/auth-context";

const NewQuiz = () => {
  const quizId = useParams().quizId;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [restart, setRestart] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedQuiz, setLoadedQuiz] = useState();
  const auth = useContext(AuthContext);


  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/quiz/${quizId}`);
        setLoadedQuiz(responseData.quiz);
      }
      catch (err) { }
    }
    fetchQuiz();
  }, [sendRequest, quizId])

  const answerButtonClickHandler = async (isCorrect) => {
    if (isCorrect === true) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < loadedQuiz.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      try {
        await sendRequest('http://localhost:5000/api/scores/', 'POST', JSON.stringify({
          score: score,
          quiz: quizId,
          user: auth.userId
        }),
          { 'Content-Type': 'application/json' }
        )
      }
      //Redirect user to different page
      catch (err) {

      };
      setShowScore(true);
    }
  };

  const restartButtonHandler = () => {
    setRestart(true);
    setScore(score * 0);
    console.log(restart);
    setShowScore(false);
    setCurrentQuestion(0);
  };

  if (isLoading) {
    return (
      <div className="overlay">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

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

      {!isLoading && loadedQuiz && <>
        <div className="row">
          <div className="col-md">
            <h3 className="quiz-title">{loadedQuiz.title}</h3>
          </div>
        </div>
        <div className="container new-quiz-container">
          {showScore ? (
            <>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="final-score col-md-4 text-center">
                  <h3>
                    You scored {score} out of {loadedQuiz.questions.length}
                  </h3>
                </div>
                <div className="col-md-4"></div>
              </div>
              <div className="row quiz-button-container">
                <div className="col-sm-4 text-center">
                  <button
                    className="btn final-score-options"
                    onClick={restartButtonHandler}
                  >
                    Restart
                  </button>
                </div>
                <div className="col-sm-4 text-center">
                  <Link to="/documentation" className="btn final-score-options">
                    See {loadedQuiz.title} documentation
                  </Link>
                </div>
                <div className="col-sm-4 text-center">
                  <Link to="/quiz" className="btn final-score-options">
                    Return to All quiz page
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentQuestion + 1}</span>/
                  {loadedQuiz.questions.length}
                </div>
                <div className="question-text">
                  <p>{loadedQuiz.questions[currentQuestion].questionText}</p>
                </div>
                <div className="answer-section">
                  {loadedQuiz.questions[currentQuestion].answerOptions.map(
                    (answerOption) => (
                      <div className="mt-4">
                        <button
                          className="answer-option"
                          onClick={() =>
                            answerButtonClickHandler(answerOption.isCorrect)
                          }
                        >
                          {answerOption.answerText}
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </>}
    </React.Fragment>
  );
};

export default NewQuiz;
