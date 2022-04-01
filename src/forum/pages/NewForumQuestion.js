import { Modal } from "react-bootstrap";
import React, { useContext } from "react";
import { AuthContext } from "../../shared/components/context/auth-context";
import Input from "../../shared/components/FormValidation/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/components/FormValidation/validators";
import { useForm } from '../../shared/hooks/forms-hooks';
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom";


const NewForumQuestion = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm({
    questionTitle: {
      value: "",
      isValid: false
    },
    questionDescription: {
      value: "",
      isValid: false
    }
  }, false);

  const history = useHistory();
  const submitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest('http://localhost:5000/api/forum/', 'POST', JSON.stringify({
        heading: formState.inputs.questionTitle.value,
        text: formState.inputs.questionDescription.value,
        // image: null,
        // codeString: formState.inputs.codeString.value,
      }),
        { 'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token }
      );
      
      alert("Question successfully posted.")
      history.push('/forum');
    }
    //Redirect user to different page
    catch (err) {

    };
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
      <div className="container alignment-container">
        <div className="row">
          <div className="col-md">
            <h3>Ask a Question</h3>
          </div>
        </div>
        <div className="col-md">
          <div className="card ask-question-container">
            {isLoading && <div className="overlay">
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>}
            <div className="card-body">
              <form onSubmit={submitHandler}>
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
                />
                <button className="btn mt-3" type="submit" disabled={!formState.isValid}>
                  Post question
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewForumQuestion;
