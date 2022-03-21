/* eslint-disable react/react-in-jsx-scope */
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HtmlDocumentationCode from "../../images/blurred-html-code.png";
import QuizCode from "../../images/quiz-ss.png";
import UserForumCode from "../../images/user-forum-ss.png";
import { AuthContext } from "../context/auth-context";
import SignUpForm from "../../../user/components/SignUpForm";
import Input from "../FormValidation/Input";
import { useHttpClient } from "../../hooks/http-hook";
import { Modal } from "react-bootstrap";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../FormValidation/validators";
import "./Homepage.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "../../hooks/forms-hooks";

// const Eye = <FontAwesomeIcon className="icon" icon={faEye} />;

// const EyeSlash = <FontAwesomeIcon className="icon" icon={faEyeSlash} />;
const LoggedInHomepage = () => {
  const auth = useContext(AuthContext);
  // const [passwordShown, setPasswordShown] = useState(false);
  //const pass = useRef();
  //const [formState, inputHandler] = useForm(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDocumentation, setLoadedDocumentation] = useState();
  const [loadedQuiz, setLoadedQuiz] = useState();

  useEffect(() => {
    const fetchDocumentation = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/documentation/randDoc"
        );
        console.log(responseData.documentation);
        setLoadedDocumentation(responseData.documentation);
      } catch (err) {}
    };
    const fetchQuiz = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/quiz/randQuiz"
        );
        console.log(responseData.quiz);
        setLoadedQuiz(responseData.quiz);
      } catch (err) {}
    };
    fetchDocumentation();
    fetchQuiz();
  }, [sendRequest]);

  console.log(auth);
  // const togglePassword = () => {
  //   setPasswordShown(!passwordShown);
  // };

  // const authSubmitHandler = async event => {
  //   event.preventDefault();
  //   console.log(formState.inputs);
  //   try {
  //     await sendRequest(
  //       "http://localhost:5000/api/user/signup",
  //       "POST",
  //       JSON.stringify({
  //         username: formState.inputs.username.value,
  //         firstname: formState.inputs.firstname.value,
  //         surname: formState.inputs.surname.value,
  //         email: formState.inputs.email.value,
  //         password: formState.inputs.password.value
  //       }),
  //       {
  //         "Content-Type": "application/json"
  //       }
  //     );
  //     auth.login();
  //   } catch (err) {}
  // };

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
    <>
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
      {auth.isLoggedIn ? (
        <div className="row">
          {!isLoading && loadedDocumentation && (
            <div className="col-lg-6 first-col">
              <div className="card featured-doc-card text-center">
                <img
                  src={HtmlDocumentationCode}
                  className="card-img"
                  alt="..."
                />
                <div className="card-img-overlay h-100 d-flex flex-column justify-content-end">
                  <h3 className="card-title">
                    HTML {loadedDocumentation.title}
                  </h3>
                </div>
              </div>
              <div className="featured-button-container">
                <Link
                  to={`/documentation/${loadedDocumentation.id}`}
                  className="btn rounded-pill mt-2"
                  style={{ width: "20%" }}
                >
                  Go to {loadedDocumentation.title} documentation
                </Link>
              </div>
            </div>
          )}
          {!isLoading && loadedQuiz && (
            <div className="col-lg-6">
              <div className="card featured-quiz-card text-center">
                <img src={QuizCode} className="card-img" alt="..." />
                <div className="card-img-overlay h-100 d-flex flex-column justify-content-end">
                  <h3 className="card-title">{loadedQuiz.title}</h3>
                </div>
              </div>
              <div className="featured-button-container">
                <Link
                  to={`/quiz/${loadedQuiz.id}`}
                  className="btn rounded-pill mt-2"
                  style={{ width: "20%" }}
                >
                  Go to {loadedQuiz.title} quiz
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-6 first-col">
            <div className="loh-container">
              <Link to="/documentation" className="loh-carousel-link">
                <div className="card loh-info-card">
                  <img
                    src={HtmlDocumentationCode}
                    className="loh-card-img"
                    alt="..."
                  />
                  <div className="card-img-overlay">
                    <div className="bar">
                      <div className="emptybar"></div>
                      <div className="filledbar"></div>
                    </div>
                    <div className="circle">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <circle className="stroke" cx="60" cy="60" r="50" />
                      </svg>
                    </div>
                    <h3 className="card-title text-center">
                      Discover each HTML element through our documentation...
                    </h3>
                  </div>
                </div>
              </Link>
              <Link to="/forum" className="loh-carousel-link">
                <div className="card loh-info-card">
                  <img src={UserForumCode} className="loh-card-img" alt="..." />
                  <div className="card-img-overlay">
                    <div className="bar">
                      <div className="emptybar"></div>
                      <div className="filledbar"></div>
                    </div>
                    <div className="circle">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <circle className="stroke" cx="60" cy="60" r="50" />
                      </svg>
                    </div>
                    <h3 className="card-title text-center">
                      Visit our dedicated user forum to view and ask
                      questions...
                    </h3>
                  </div>
                </div>
              </Link>
              <Link to="/quiz" className="loh-carousel-link">
                <div className="card loh-info-card">
                  <img src={QuizCode} className="loh-card-img" alt="..." />
                  <div className="card-img-overlay">
                    <div className="bar">
                      <div className="emptybar"></div>
                      <div className="filledbar"></div>
                    </div>
                    <div className="circle">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <circle className="stroke" cx="60" cy="60" r="50" />
                      </svg>
                    </div>
                    <h3 className="card-title text-center">
                      Test your HTML knowledge by undertaking a range of
                      quizzes...
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            {" "}
            <div className="container" style={{ marginTop: "25%" }}>
              <div className="card mx-auto login-card">
                {" "}
                {isLoading && (
                  <div class="overlay">
                    {/* <div class="d-flex justify-content-center"> */}
                    <div class="spinner-border" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    {/* </div> */}
                  </div>
                )}
                <h2 className="mb-5">
                  Join the ever-growing HTML learning tool for free today!
                </h2>
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoggedInHomepage;
