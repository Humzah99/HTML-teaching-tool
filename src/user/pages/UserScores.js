import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Modal } from "react-bootstrap";
import "../../shared/components/Style.css";
import "../../shared/components/ImageUpload/ImageUpload.css";
import { AuthContext } from "../../shared/components/context/auth-context";
import { Link } from "react-router-dom";

const UserScores = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const userId = useParams().userId;
    const [loadedUser, setLoadedUser] = useState();

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
            console.log("user id: " + userId),
            console.log(loadedUser),
            (
                <div className="container">
                    <h3 className="mt-5 text-center">Could not find score information.</h3>
                </div>
            )
        );
    }

    console.log(loadedUser);

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
                        <table className="styled-table" style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Quiz Name</th>
                                    <th>Quiz Date</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadedUser.scores.sort((a, b) => (a.score < b.score) ? 1 : -1).map(score => (
                                    <tr key={score.quizDate}>
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
        </React.Fragment>
    );
};

export default UserScores;