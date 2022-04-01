import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "../components/NewQuiz.css";
import "../../shared/components/Style.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Modal } from "react-bootstrap";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Footer from "../../shared/components/Footer/Footer";

const GoldMedalIcon = (
    <FontAwesomeIcon className="icon gold-medal-icon" icon={faMedal} size="4x" />
);
const SilverMedalIcon = (
    <FontAwesomeIcon className="icon silver-medal-icon" icon={faMedal} size="4x" />
);
const BronzeMedalIcon = (
    <FontAwesomeIcon className="icon bronze-medal-icon" icon={faMedal} size="4x" />
);

const QuizLeaderboard = () => {
    const quizId = useParams().quizId;
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedQuiz, setLoadedQuiz] = useState();


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
                {loadedQuiz.scores.length > 0 &&
                    <div className="row">
                        <div className="col-md">
                            <h3 className="quiz-title">{loadedQuiz.title} Leaderboard</h3>
                        </div>
                    </div>
                }
                {loadedQuiz.scores.length ?
                    (<div className="container">
                        <div className="row mb-5 mt-5">
                            {loadedQuiz.scores.sort((a, b) => (a.score < b.score) ? 1 : -1).slice(0, (loadedQuiz.scores.length - (loadedQuiz.scores.length - 3))).map((score, index) => (
                                <div className="col-md-4">
                                    <div className="card high-scores-card">
                                        <div className="card-body text-center">
                                            <a class="position-relative image-container-btn">
                                                <img className="high-scores-user-image"
                                                    src={`http://localhost:5000/${score.user.image}`} alt={score.user.firstname + " " + score.user.surname}
                                                />{index === 0 && <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill">{GoldMedalIcon} <span class="visually-hidden">place</span></span>}
                                                {index === 1 && <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill">{SilverMedalIcon} <span class="visually-hidden">place</span></span>}
                                                {index === 2 && <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill">{BronzeMedalIcon} <span class="visually-hidden">place</span></span>}
                                            </a>
                                            <h3>{score.user.firstname + " " + score.user.surname}</h3>
                                            <h6 className="text-muted">{score.user.username}</h6>
                                        </div>
                                        <div className="card-footer">
                                            <div className="float-start">
                                                <h4>{score.score}/{loadedQuiz.questions.length}</h4>
                                            </div>
                                            <div className="float-end">
                                                <h5 className="text-muted">{score.quizDate}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {loadedQuiz.scores.sort((a, b) => (a.score < b.score) ? 1 : -1).slice(loadedQuiz.scores.length - (loadedQuiz.scores.length - 3), loadedQuiz.scores.length).map((score, index) => (
                            <div className="row second-leaderboard-row">
                                <div className="card forum-list-card mt-3">
                                    {isLoading && (
                                        <div className="overlay">
                                            <div className="d-flex justify-content-center">
                                                <div className="spinner-border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <div className="float-start">
                                            <h3 className="ranking-number text-muted">{index + 4}<span className="ranking-ending">{(index + 4) > 20 && (index + 4) % 10 === 1 && 'st'}{(index + 4) > 20 && (index + 4) % 10 === 2 && 'nd'}{(index + 4) > 20 && (index + 4) % 10 === 3 && 'rd'}{((index + 4) % 10 !== 1 && (index + 4) % 10 !== 2 && ((index + 4) % 10 !== 3) && 'th') || ((index + 4) <= 20) && 'th'}</span></h3>
                                            <img className="lower-high-scores-user-image ms-4"
                                                src={`http://localhost:5000/${score.user.image}`} alt={score.user.firstname + " " + score.user.surname}
                                            />
                                            <div className="float-end ms-5 mt-4 text-center">
                                                <h4>{score.user.firstname + " " + score.user.surname}</h4>
                                                <h7 className="text-muted">{score.user.username}</h7>
                                            </div>
                                        </div>
                                        <div className="float-end ms-5 mt-4 text-center">
                                            <h4>{score.score}/{loadedQuiz.questions.length}</h4>
                                            <h6 className="text-muted">{score.quizDate}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>) : (
                        <React.Fragment>
                            <div className="card no-quiz-leaderboard mt-5">
                                <div className="card-title">
                                    <div className="row mt-4 ms-2">
                                        <h3 className="text-center">{loadedQuiz.title}</h3>
                                    </div>
                                </div>
                                <div className="card-body text-center">
                                    <h5>No scores found for this quiz.</h5>
                                    <Link to="/quiz" className="btn rounded-pill mt-3">
                                        All Quizzes
                                    </Link>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                <Footer />
            </>}
        </React.Fragment>
    );
};

export default QuizLeaderboard;
