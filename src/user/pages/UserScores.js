import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Modal } from "react-bootstrap";
import "../../shared/components/Style.css";
import "../../shared/components/ImageUpload/ImageUpload.css";
import { AuthContext } from "../../shared/components/context/auth-context";
import { Link } from "react-router-dom";
import Pagination from "../../shared/components/Pagination/Pagination";
import Footer from "../../shared/components/Footer/Footer";

const UserScores = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const userId = useParams().userId;
    const [loadedUser, setLoadedUser] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [activeLink, setActiveLink] = useState(1);
    const [questionsPerPage] = useState(5);

    let indexOfLastDoc = currentPage * questionsPerPage;
    let indexOfFirstDoc = indexOfLastDoc - questionsPerPage;

    console.log(indexOfFirstDoc);
    console.log(indexOfLastDoc);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setActiveLink(pageNumber);
        window.scrollTo(0, 0)
    }


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/user/${userId}`);
                setLoadedUser(responseData.user);
            } catch (err) {
            }
        };
        fetchUser();

    }, [sendRequest, userId]);

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

    if (!loadedUser && !error) {
        return (
            (
                <div className="container">
                    <h3 className="mt-5 text-center">Could not find score information.</h3>
                </div>
            )
        );
    }

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
            <div className="user-scores-card mt-5">
                <div className="card us-card-item">
                    <div className="card-title">
                        <div className="row mt-4 ms-2">
                            <div className="col-md-3">
                                <h3>My Scores</h3>
                            </div>
                        </div>
                    </div>

                    {loadedUser.scores.length > 0 ? (<div className="card-body">
                        <table className="styled-table scores-table">
                            <thead>
                                <tr>
                                    <th>Quiz Name</th>
                                    <th>Quiz Date</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadedUser.scores.sort((a, b) => (a.score < b.score) ? 1 : -1).slice(indexOfFirstDoc, indexOfLastDoc).map(score => (
                                    <tr key={score.id}>
                                        <td>{score.quiz.title}</td>
                                        <td>{score.quizDate}</td>
                                        <td>{score.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>) : (
                        <React.Fragment>
                            <div className="hr-line mt-3 mb-2"></div>
                            <div className="card-body text-center mt-3">
                                <h5>No scores found. Attempt a quiz...</h5>
                                {auth.isLoggedIn ? (
                                    <Link to="/quiz" className="btn rounded-pill mt-3">
                                        Go To Quiz
                                    </Link>
                                ) : (
                                    <button to="/auth" className="btn rounded-pill mt-3">
                                        Go To Quiz
                                    </button>
                                )}
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
            {loadedUser.scores.length > 5 && <Pagination elementsPerPage={questionsPerPage} totalElements={loadedUser.scores.length} paginate={paginate} currentPage={currentPage} activeLink={activeLink} />}
            <Footer />
        </React.Fragment>
    );
};

export default UserScores;
