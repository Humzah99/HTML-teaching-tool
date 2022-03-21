import React, { useEffect, useState } from 'react';
import ForumList from '../components/ForumList';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Modal } from "react-bootstrap";

const UserQuestions = () => {
    const [loadedQuestions, setLoadedQuestions] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const userId = useParams().userId;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/forum/user/${userId}`);
                setLoadedQuestions(responseData.forumQuestions)
            } catch (err) { }
        };
        fetchQuestions();
    }, [sendRequest, userId]);

    const questionDeletedHandler = deletedQuestionId => {
        setLoadedQuestions(prevQuestions => prevQuestions.filter(question => question.id !== deletedQuestionId));
    };
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
            {isLoading && (
                <div className="overlay">
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            )}
            {!isLoading && loadedQuestions && (
                <ForumList items={loadedQuestions} onDeleteQuestion={questionDeletedHandler} />
            )}
        </React.Fragment>
    );
};

export default UserQuestions;