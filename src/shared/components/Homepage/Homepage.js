/* eslint-disable react/react-in-jsx-scope */
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WebsiteLogo from "../../images/website-logo.png";
import HtmlDocumentationCode from "../../images/html-code.jpeg";
import QuizCode from "../../images/quiz-ss.png";
import UserForumCode from "../../images/user-forum-ss.png";
import HtmlCarouselDoc from "../../images/html-carousel-doc.jpg"
import HtmlCarouselQuizImg from "../../images/html-carousel-quiz.jpg"
import HtmlCarouselForumImg from "../../images/html-carousel-forum.jpg"
import { AuthContext } from "../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import { Modal } from "react-bootstrap";
import "./Homepage.css";
import Footer from "../Footer/Footer";
import LoadingSpinner from "../UIElements/LoadingSpinner";
const LoggedInHomepage = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedDocumentation, setLoadedDocumentation] = useState();
  const [loadedQuiz, setLoadedQuiz] = useState();

  useEffect(() => {
    const fetchDocumentation = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/documentation/randDoc"
        );
        setLoadedDocumentation(responseData.documentation);
      } catch (err) { }
    };
    const fetchQuiz = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/quiz/randQuiz"
        );
        setLoadedQuiz(responseData.quiz);
      } catch (err) { }
    };
    fetchDocumentation();
    fetchQuiz();
  }, [sendRequest]);

  if (isLoading) {
    return (
     <LoadingSpinner />
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
        <React.Fragment>
          <header className="logged-in-homepage-header">
            <div className="row welcome-user float-start mt-4 ms-4">
              <h3>Welcome {auth.username}</h3>
            </div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                  <img src={HtmlCarouselDoc} className="d-block w-100 bg-image" alt="..." />
                  <div className="carousel-caption d-none d-md-block bg-text">
                    <h2 style={{ backgroundColor: 'transparent' }}>HTML Documentation</h2>
                    <p>Discover the core HTML elements through our dedicated documentation...</p>
                  </div>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <img src={HtmlCarouselForumImg} className="d-block w-100 bg-image" alt="..." />
                  <div className="carousel-caption d-none d-md-block bg-text">
                    <h2 style={{ backgroundColor: 'transparent' }}>User Forum</h2>
                    <p>Ask and respond interatively on the go on the user forum...</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src={HtmlCarouselQuizImg} className="d-block w-100 bg-image" alt="..." />
                  <div className="carousel-caption d-none d-md-block bg-text">
                    <h2 style={{ backgroundColor: 'transparent' }}>Quiz</h2>
                    <p>Test your HTML knowledge and track your learning progress by undertaking a range of quizzes...</p>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </header>
          <main>
            <ul id="cards">
              {!isLoading && loadedDocumentation && (<li className="homepage-card" id="card_1">
                <div className="card__content">
                  <div>
                    <h2>Featured Documentation</h2>
                    <p>HTML {loadedDocumentation.title}</p>
                    <p><Link
                      to={`/documentation/${loadedDocumentation.id}`}
                      className="btn btn--accent rounded-pill"
                    >
                      Go to {loadedDocumentation.title} documentation
                    </Link></p>
                  </div>
                  <figure>
                    <img src={HtmlDocumentationCode} alt="" />
                  </figure>
                </div>
              </li>)}
              {!isLoading && loadedQuiz && (
                <li className="homepage-card" id="card_3">
                  <div className="card__content">
                    <div>
                      <h2>Featured Quiz</h2>
                      <p>{loadedQuiz.title}</p>
                      <p>
                        <Link
                          to={`/quiz/${loadedQuiz.id}`}
                          className="btn btn--accent rounded-pill"
                        >
                          Go to {loadedQuiz.title} quiz
                        </Link>
                      </p>
                    </div>
                    <figure>
                      <img src={QuizCode} alt="" />
                    </figure>
                  </div>
                </li>
              )}
            </ul>
          </main>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <header className="homepage-header">
            <div>
              <img src={WebsiteLogo} alt="Logo" className="htmlearning-logo me-4" />
              <h1>HTMLearning</h1>
              <p className="scroll-down-tag">👇 Scroll down.</p>
            </div>
          </header>
          <main>
            <ul id="cards">
              <li className="homepage-card" id="card_1">
                <div className="card__content">
                  <div>
                    <h2>HTML Documentation</h2>
                    <p>Discover the core HTML elements through our dedicated documentation...</p>
                    <p><Link to="/documentation" className="btn btn--accent rounded-pill">View</Link></p>
                  </div>
                  <figure>
                    <img src={HtmlDocumentationCode} alt="" />
                  </figure>
                </div>
              </li>
              <li className="homepage-card" id="card_2">
                <div className="card__content">
                  <div>
                    <h2>User Forum</h2>
                    <p>Ask and respond interatively on the go on the user forum...</p>
                    <p><Link to="/forum" className="btn btn--accent rounded-pill">View</Link></p>
                  </div>
                  <figure>
                    <img src={UserForumCode} alt="" />
                  </figure>
                </div>
              </li>
              <li className="homepage-card" id="card_3">
                <div className="card__content">
                  <div>
                    <h2>Quiz</h2>
                    <p>Test your HTML knowledge and track your learning progress by undertaking a range of quizzes...</p>
                    <p><Link to="/auth" className="btn btn--accent rounded-pill">Sign up</Link></p>
                  </div>
                  <figure>
                    <img src={QuizCode} alt="" />
                  </figure>
                </div>
              </li>
            </ul>
          </main>
          <aside>
          </aside>
        </React.Fragment>
      )}
      <Footer />
    </>
  );
};

export default LoggedInHomepage;
