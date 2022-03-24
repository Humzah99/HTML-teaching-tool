import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook';
import ForumList from '../components/ForumList';
import { Modal } from "react-bootstrap";


const Forum = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedForum, setLoadedForum] = useState();
    useEffect(() => {
        const fetchForum = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/forum');
                console.log(responseData.forumQuestions);
                setLoadedForum(responseData.forumQuestions);
            } catch (err) { }
        };
        fetchForum();
    }, [sendRequest]);

    const questionDeletedHandler = deletedQuestionId => {
        setLoadedForum(prevQuestions => prevQuestions.filter(question => question.id !== deletedQuestionId));
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
            {!isLoading && loadedForum && <ForumList items={loadedForum} myQuestions={false} onDeleteQuestion={questionDeletedHandler} />}
        </React.Fragment>
    )
};

export default Forum;