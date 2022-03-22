/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Editor from "../../documentation/components/Editor";
import Input from "../../shared/components/FormValidation/Input";
import { VALIDATOR_REQUIRE } from "../../shared/components/FormValidation/validators";
import { useForm } from "../../shared/hooks/forms-hooks";
import "../../shared/components/Style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../shared/components/context/auth-context";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneForest } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ForumAnswersList from "../components/ForumAnswersList";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ForumQuestion = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [viewQuestion, setViewQuestion] = useState();
  const [viewAnswers, setViewAnswers] = useState();
  const questionId = useParams().questionId;
  const auth = useContext(AuthContext);
  const [codeEditor, setCodeEditor] = useState(false);
  const [html, setHtml] = useState("");
  const [formState, inputHandler] = useForm(
    {
      answerText: {
        value: "",
        isValid: false,
      },
      // answerCode: {
      //   value: "",
      //   isValid: false,
      // },
    },
    false
  );

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/answers/forum/${questionId}`);
        const responseData2 = await sendRequest(`http://localhost:5000/api/forum/${questionId}`)
        console.log(responseData);
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
    console.log(formState.inputs)
    try {
      await sendRequest('http://localhost:5000/api/answers/', 'POST', JSON.stringify({
        text: formState.inputs.answerText.value,
        //code: formState.inputs.questionDescription.value,
        question: questionId,
        user: auth.userId
      }),
        { 'Content-Type': 'application/json' }
      )
      history.push(`/`);
    }
    //Redirect user to different page
    catch (err) {

    };
  };

  const answerDeletedHandler = deletedAnswerId => {
    setViewAnswers(prevAnswers=> prevAnswers.filter(answer => answer.id !== deletedAnswerId));
};

  // for (let codeResponse of identifiedQuestion.codeResponses) {
  //   const card = (
  //     <React.Fragment>
  //       <div className="card show-answer-container mt-5">
  //         <div className="card-body">
  //           {identifiedQuestion.codeResponses != null && (
  //             // <div className="pane">
  //             //   <Editor language="xml" value={codeResponse} />
  //             // </div>
  //              <SyntaxHighlighter
  //              language="javascript"
  //              style={duotoneForest}
  //              key={identifiedQuestion.id}
  //            >
  //              {codeResponse}
  //            </SyntaxHighlighter>
  //           )}
  //         </div>
  //       </div>
  //       <div className="hr-line"></div>
  //     </React.Fragment>
  //   );
  //   allAnswers.push(card);
  // }

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
      {!isLoading && viewQuestion && viewAnswers && <div className="container alignment-container">
        <div className="row">
          <div className="col-md">
            <h3>{viewQuestion.heading}</h3>
          </div>
        </div>
        <div className="col-md">
          <div className="card show-question-container">
            <div className="card-body">
              <p className="card-text">{viewQuestion.text}</p>
              {/* {identifiedQuestion.codeString != null && (
              // <div className="pane">
              //   <Editor language="xml" value={identifiedQuestion.codeString} />
              // </div>
              <SyntaxHighlighter
                language="javascript"
                style={duotoneForest}
                key={identifiedQuestion.id}
              >
                {identifiedQuestion.codeString}
              </SyntaxHighlighter>
            )} */}
            </div>
            <div class="card-footer">
              <strong><p className="float-end text-muted"> Asked {viewQuestion.createdAt} by {viewQuestion.user.username}</p></strong>
            </div>
          </div>
          {!isLoading && viewAnswers && (<ForumAnswersList items={viewAnswers} onDeleteAnswer={answerDeletedHandler}/>)}

          {auth.isLoggedIn && (
            <React.Fragment>
              <h5>Your answer</h5>
              <div className="card form-container mt-3 mb-5">
                <div className="card-body">
                  {/* <a
                    onClick={() =>
                      setCodeEditor((prevCodeEditor) => !prevCodeEditor)
                    }
                    class={`card-link${codeEditor ? "active code-editor-active code-editor-link" : ""
                      }`}
                    title="code editor"
                  >
                    <FontAwesomeIcon icon={faCode} size="2x" />
                  </a> */}
                  <form onSubmit={submitHandler}>
                    {/* {codeEditor ? (
                      <React.Fragment>
                        <div className="pane top-pane">
                          <Editor
                            id="answerCode"
                            language="xml"
                            displayName="HTML"
                            value={html}
                            onChange={setHtml}
                            onInput={inputHandler}
                          />
                        </div>

                        <Input
                          id="answerText"
                          className="form-control"
                          rows="10"
                          placeholder="Enter answer here"
                          validators={[VALIDATOR_REQUIRE()]}
                          errorText="An answer is required."
                          onInput={inputHandler}
                        />
                      </React.Fragment>
                    ) : ( */}
                      <Input
                        id="answerText"
                        className="form-control"
                        rows="10"
                        placeholder="Enter answer here"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="An answer is required."
                        onInput={inputHandler}
                      />
                    {/* ) */}

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
      </div>}
    </React.Fragment>
  );
};

export default ForumQuestion;
