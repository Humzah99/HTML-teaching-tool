import React, { useEffect, useState } from 'react';
import ForumList from '../components/ForumList';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Modal } from "react-bootstrap";
import Pagination from '../../shared/components/Pagination/Pagination';

const UserQuestions = () => {
    const [loadedQuestions, setLoadedQuestions] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const userId = useParams().userId;
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage] = useState(4);

    let indexOfLastDoc = currentPage * questionsPerPage;
    let indexOfFirstDoc = indexOfLastDoc - questionsPerPage;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/user/${userId}`);
                setLoadedQuestions(responseData.user.questions)
            } catch (err) { }
        };
        fetchQuestions();
    }, [sendRequest, userId]);

    const questionDeletedHandler = deletedQuestionId => {
        setLoadedQuestions(prevQuestions => prevQuestions.filter(question => question.id !== deletedQuestionId));
        if (loadedQuestions.slice(indexOfFirstDoc, indexOfLastDoc).length - 1 === 0) {
            indexOfFirstDoc -= questionsPerPage
            indexOfLastDoc -= questionsPerPage
            setCurrentPage(currentPage - 1);
        }
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
                <React.Fragment>
                    <ForumList items={loadedQuestions.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1).slice(indexOfFirstDoc, indexOfLastDoc)} myQuestions={true} numberOfQuestions={loadedQuestions.length} onDeleteQuestion={questionDeletedHandler} />
                    {loadedQuestions.length > 4 && <Pagination elementsPerPage={questionsPerPage} totalElements={loadedQuestions.length} paginate={paginate} currentPage={currentPage} />}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default UserQuestions;