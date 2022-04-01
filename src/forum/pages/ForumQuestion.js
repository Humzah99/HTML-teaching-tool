/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Input from "../../shared/components/FormValidation/Input";
import { VALIDATOR_REQUIRE } from "../../shared/components/FormValidation/validators";
import { useForm } from "../../shared/hooks/forms-hooks";
import "../../shared/components/Style.css";
import { AuthContext } from "../../shared/components/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ForumAnswersList from "../components/ForumAnswersList";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Footer from "../../shared/components/Footer/Footer";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const ForumQuestion = () => {
  var beautify_html = require('js-beautify').html
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [viewQuestion, setViewQuestion] = useState();
  const [viewAnswers, setViewAnswers] = useState();
  const questionId = useParams().questionId;
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      answerText: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/answers/forum/${questionId}`);
        const responseData2 = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/forum/${questionId}`)
        setViewAnswers(responseData.answers);
        setViewQuestion(responseData2.forumQuestion);
      }
      catch (err) { }
    }
    fetchQuestionAndAnswers();
  }, [sendRequest, questionId])

  const history = useHistory();
  const submitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(process.env.REACT_APP_BACKEND_URL + '/answers/', 'POST', JSON.stringify({
        text: formState.inputs.answerText.value,
        question: questionId,
        user: auth.userId
      }),
        { 'Content-Type': 'application/json' }
      )
      alert("Your answer has been submitted")
      history.go(`/forum/${questionId}`);
    }
    catch (err) {

    };
  };

  const answerDeletedHandler = deletedAnswerId => {
    setViewAnswers(prevAnswers => prevAnswers.filter(answer => answer.id !== deletedAnswerId));
  };

  if (isLoading) {
    return (
      <LoadingSpinner />
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
      {!isLoading && viewQuestion && viewAnswers &&
        <>
          <div className="container alignment-container">
            <div className="row">
              <div className="col-md">
                <h3>{viewQuestion.heading}</h3>
              </div>
            </div>
            <div className="col-md">
              <div className="card show-question-container">
                <div className="card-body">
                  <p className="card-text">{viewQuestion.text}</p>
                </div>
                <div class="card-footer">
                  <strong><p className="float-end text-muted"> Asked {viewQuestion.createdAt} by {viewQuestion.user.username}</p></strong>
                </div>
              </div>
              {!isLoading && viewAnswers && (<ForumAnswersList items={viewAnswers} onDeleteAnswer={answerDeletedHandler} />)}

              {auth.isLoggedIn && (
                <React.Fragment>
                  <h4>Your answer</h4>
                  <div className="card form-container mt-3 mb-5">
                    <div className="card-body">
                      <form onSubmit={submitHandler}>
                        <Input
                          id="answerText"
                          className="form-control"
                          rows="10"
                          placeholder="Enter answer here"
                          validators={[VALIDATOR_REQUIRE()]}
                          errorText="An answer is required."
                          onInput={inputHandler}
                        />
                        <button
                          className="btn mt-3"
                          type="submit"
                          disabled={!formState.isValid}
                        >
                          Post answer
                        </button>
                      </form>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
          <Footer />
        </>
      }
    </React.Fragment>
  );
};

export default ForumQuestion;
