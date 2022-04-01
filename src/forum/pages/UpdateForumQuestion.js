import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormValidation/Input";
import { Modal } from "react-bootstrap";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/components/FormValidation/validators";
import { useForm } from "../../shared/hooks/forms-hooks";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../shared/components/context/auth-context";
import Footer from "../../shared/components/Footer/Footer";

const UpdateForumQuestion = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedQuestion, setLoadedQuestion] = useState();
  const questionId = useParams().questionId;
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      questionTitle: {
        value: "",
        isValid: false
      },
      questionDescription: {
        value: "",
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/forum/${questionId}`);
        setLoadedQuestion(responseData.forumQuestion);
        setFormData(
          {
            questionTitle: {
              value: responseData.forumQuestion.heading,
              isValid: true
            },
            questionDescription: {
              value: responseData.forumQuestion.text,
              isValid: true
            }
          },
          true
        );
      }
      catch (err) { }
    }
    fetchQuestion();
  }, [sendRequest, questionId])

  const updateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(`http://localhost:5000/api/forum/${questionId}`, 'PATCH', JSON.stringify({
        heading: formState.inputs.questionTitle.value,
        text: formState.inputs.questionDescription.value
      }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push(`/forum`);
    } catch (err) { }
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

  if (!loadedQuestion && !error) {
    return (
      (
        <div className="container">
          <h3 className="mt-5 text-center">Could not identify the question.</h3>
        </div>
      )
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
      <div className="container alignment-container">
        <div className="row">
          <div className="col-md">
            <h3>Update question</h3>
          </div>
        </div>
        <div className="col-md">
          <div className="card ask-question-container">
            <div className="card-body">
              {!isLoading && loadedQuestion && <form onSubmit={updateSubmitHandler}>
                <h4 className="card-title">Heading</h4>
                <Input
                  id="questionTitle"
                  className="form-control"
                  element="input"
                  type="text"
                  placeholder="Enter question title"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Enter a suitable question heading."
                  onInput={inputHandler}
                  value={loadedQuestion.heading}
                  valid={true}
                />
                <h4 className="card-title mt-3">Body</h4>
                <Input
                  id="questionDescription"
                  className="form-control"
                  rows="10"
                  placeholder="Enter question description..."
                  validators={[VALIDATOR_MINLENGTH(10)]}
                  errorText="Enter a suitable question description (at least 10 characters long)."
                  onInput={inputHandler}
                  value={loadedQuestion.text}
                  valid={true}
                />
                <button
                  className="btn mt-3"
                  type="submit"
                  disabled={!formState.isValid}
                >
                  Update question
                </button>
              </form>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default UpdateForumQuestion;
