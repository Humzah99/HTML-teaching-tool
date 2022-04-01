import React, { useContext, useState } from "react";
import "../../shared/components/Style.css";
import { AuthContext } from "../../shared/components/context/auth-context";
import { VALIDATOR_REQUIRE } from "../../shared/components/FormValidation/validators";
import { Modal } from "react-bootstrap";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Input from "../../shared/components/FormValidation/Input";
import { useForm } from "../../shared/hooks/forms-hooks";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const ForumAnswersItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [updatedAnswer, setUpdatedAnswer] = useState(props.text);
  const [update, setUpdate] = useState(false);
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [formState, inputHandler] = useForm(
    {
      answerText: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const showUpdateTextArea = () => {
    setUpdate(true);
  };
  const cancelUpdateTextArea = () => {
    setUpdate(false);
  };
  const showDeleteWarningHandler = () => {
    setShowConfirmationModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmationModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmationModal(false);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/answers/${props.id}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      props.onDelete(props.id);
      history.push(`/forum/view/${props.question}`);
    } catch (err) {}
  };

  const updateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/answers/${props.id}`,
        "PATCH",
        JSON.stringify({
          text: formState.inputs.answerText.value
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token
        }
      );
      setUpdatedAnswer(formState.inputs.answerText.value);
      setUpdate(false);
      history.push(`/forum/view/${props.question}`);
    } catch (err) {}
  };
  return (
    <React.Fragment>
      <Modal show={!!error} onCancel={clearError}>
        <Modal.Header className="modal-header">
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">{error}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={clearError}>
            Ok
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={showConfirmationModal} onCancel={cancelDeleteHandler}>
        <Modal.Header className="modal-header">
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          Do you want to proceed and delete this answer? Please note that this
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
      {!update ? (
        <div className="card show-answer-container mt-4">
          {isLoading && (
            <LoadingSpinner />
          )}
          <div className="card-body">
            {props != null && <p className="card-text">{updatedAnswer}</p>}
          </div>
          <div class="card-footer">
            {auth.userId === props.user.id && (
              <div className="p-2 flex-fill bd-highlight float-start">
                <button
                  onClick={showUpdateTextArea}
                  className="btn btn-warning me-2"
                >
                  Edit
                </button>

                <button
                  onClick={showDeleteWarningHandler}
                  className="btn btn-danger me-2"
                >
                  Delete
                </button>
              </div>
            )}
            <strong>
              <p className="float-end text-muted">
                {" "}
                answered {props.createdAt} by {props.user.username}
              </p>
            </strong>
          </div>
        </div>
      ) : (
        <div className="card form-container mt-3 mb-5">
            <div className="card-header update-response-title">
                <h5 className="mt-2">Update your response</h5>
            </div>
          <div className="card-body">
            <form onSubmit={updateSubmitHandler}>
              <Input
                id="answerText"
                className="form-control"
                rows="10"
                value={updatedAnswer}
                validators={[VALIDATOR_REQUIRE()]}
                errorText="An answer is required."
                onInput={inputHandler}
              />
              <div className="p-2 flex-fill bd-highlight float-start">
                <button
                  className="btn me-2"
                  type="submit"
                  disabled={!formState.isValid}
                >
                  Update answer
                </button>
                <button
                  className="btn btn-secondary "
                  onClick={cancelUpdateTextArea}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="hr-line"></div>
    </React.Fragment>
  );
};

export default ForumAnswersItem;
