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
const LoggedInHomepage = () => {
  const auth = useContext(AuthContext);
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
      } catch (err) { }
    };
    const fetchQuiz = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/quiz/randQuiz"
        );
        console.log(responseData.quiz);
        setLoadedQuiz(responseData.quiz);
      } catch (err) { }
    };
    fetchDocumentation();
    fetchQuiz();
  }, [sendRequest]);

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
        // <div className="row">
        //   {!isLoading && loadedDocumentation && (
        //     <div className="col-lg-6 first-col">
        //       <div className="card featured-doc-card text-center">
        //         <img
        //           src={HtmlDocumentationCode}
        //           className="card-img doc-card-img"
        //           alt="..."
        //         />
        //         <div className="card-img-overlay h-100 d-flex flex-column justify-content-end">
        //           <h3 className="card-title">
        //             HTML {loadedDocumentation.title}
        //           </h3>
        //         </div>
        //       </div>
        //       <div className="featured-button-container">
        //         <Link
        //           to={`/documentation/${loadedDocumentation.id}`}
        //           className="btn rounded-pill mt-2"
        //           style={{ width: "20%" }}
        //         >
        //           Go to {loadedDocumentation.title} documentation
        //         </Link>
        //       </div>
        //     </div>
        //   )}
        //   {!isLoading && loadedQuiz && (
        //     <div className="col-lg-6">
        //       <div className="card featured-quiz-card text-center">
        //         <img src={QuizCode} className="card-img quiz-card-img" alt="..." />
        //         <div className="card-img-overlay h-100 d-flex flex-column justify-content-end">
        //           <h3 className="card-title">{loadedQuiz.title}</h3>
        //         </div>
        //       </div>
        //       <div className="featured-button-container">
        //         <Link
        //           to={`/quiz/${loadedQuiz.id}`}
        //           className="btn rounded-pill mt-2"
        //           style={{ width: "20%" }}
        //         >
        //           Go to {loadedQuiz.title} quiz
        //         </Link>
        //       </div>
        //     </div>
        //   )}
        // </div>
        <React.Fragment>
          <header className="logged-in-homepage-header">
            <div className="row welcome-user float-start mt-4 ms-4">
              <h3>Welcome {auth.username}</h3>
            </div>
            <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
              <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="10000">
                  <img src={HtmlCarouselDoc} class="d-block w-100 bg-image" alt="..." />
                  <div class="carousel-caption d-none d-md-block bg-text">
                    <h2 style={{ backgroundColor: 'transparent' }}>HTML Documentation</h2>
                    <p>Discover the core HTML elements through our dedicated documentation...</p>
                  </div>
                </div>
                <div class="carousel-item" data-bs-interval="2000">
                  <img src={HtmlCarouselForumImg} class="d-block w-100 bg-image" alt="..." />
                  <div class="carousel-caption d-none d-md-block bg-text">
                    <h2 style={{ backgroundColor: 'transparent' }}>User Forum</h2>
                    <p>Ask and respond interatively on the go on the user forum...</p>
                  </div>
                </div>
                <div class="carousel-item">
                  <img src={HtmlCarouselQuizImg} class="d-block w-100 bg-image" alt="..." />
                  <div class="carousel-caption d-none d-md-block bg-text">
                    <h2 style={{ backgroundColor: 'transparent' }}>Quiz</h2>
                    <p>Test your HTML knowledge and track your learning progress by undertaking a range of quizzes...</p>
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </header>
          <main>
            <ul id="cards">
              {!isLoading && loadedDocumentation && (<li class="homepage-card" id="card_1">
                <div class="card__content">
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
                    <img src={HtmlDocumentationCode} alt="Image description" />
                  </figure>
                </div>
              </li>)}
              {!isLoading && loadedQuiz && (
                <li class="homepage-card" id="card_3">
                  <div class="card__content">
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
                      <img src={QuizCode} alt="Image description" />
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
              <li class="homepage-card" id="card_1">
                <div class="card__content">
                  <div>
                    <h2>HTML Documentation</h2>
                    <p>Discover the core HTML elements through our dedicated documentation...</p>
                    <p><Link to="/documentation" class="btn btn--accent rounded-pill">View</Link></p>
                  </div>
                  <figure>
                    <img src={HtmlDocumentationCode} alt="Image description" />
                  </figure>
                </div>
              </li>
              <li class="homepage-card" id="card_2">
                <div class="card__content">
                  <div>
                    <h2>User Forum</h2>
                    <p>Ask and respond interatively on the go on the user forum...</p>
                    <p><Link to="/forum" class="btn btn--accent rounded-pill">View</Link></p>
                  </div>
                  <figure>
                    <img src={UserForumCode} alt="Image description" />
                  </figure>
                </div>
              </li>
              <li class="homepage-card" id="card_3">
                <div class="card__content">
                  <div>
                    <h2>Quiz</h2>
                    <p>Test your HTML knowledge and track your learning progress by undertaking a range of quizzes...</p>
                    <p><Link to="/auth" class="btn btn--accent rounded-pill">Sign up</Link></p>
                  </div>
                  <figure>
                    <img src={QuizCode} alt="Image description" />
                  </figure>
                </div>
              </li>
            </ul>
          </main>
          <aside>
          </aside>
        </React.Fragment>
      )}
    </>
  );
};

export default LoggedInHomepage;
