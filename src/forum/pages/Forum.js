import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook';
import ForumList from '../components/ForumList';
import { Modal } from "react-bootstrap";
import Pagination from '../../shared/components/Pagination/Pagination';
import Footer from '../../shared/components/Footer/Footer';


const Forum = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedForum, setLoadedForum] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [activeLink, setActiveLink] = useState(1);
    const [questionsPerPage] = useState(4);

    let indexOfLastDoc = currentPage * questionsPerPage;
    let indexOfFirstDoc = indexOfLastDoc - questionsPerPage;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setActiveLink(pageNumber);
        window.scrollTo(0, 0)
    }


    useEffect(() => {
        const fetchForum = async () => {
            try {
                const responseData = await sendRequest('http://localhost:5000/api/forum');
                setLoadedForum(responseData.forumQuestions);
            } catch (err) { }
        };
        fetchForum();
    }, [sendRequest]);


    const questionDeletedHandler = deletedQuestionId => {
        setLoadedForum(prevQuestions => prevQuestions.filter(question => question.id !== deletedQuestionId));
        if (loadedForum.slice(indexOfFirstDoc, indexOfLastDoc).length - 1 === 0) {
            indexOfFirstDoc -= questionsPerPage
            indexOfLastDoc -= questionsPerPage
            setCurrentPage(currentPage - 1);
            setActiveLink(currentPage - 1);
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
            {!isLoading && loadedForum &&
                <React.Fragment>
                    <ForumList items={loadedForum.slice(indexOfFirstDoc, indexOfLastDoc)} numberOfQuestions={loadedForum.length} myQuestions={false} onDeleteQuestion={questionDeletedHandler} />
                    {loadedForum.length > 4 && <Pagination elementsPerPage={questionsPerPage} totalElements={loadedForum.length} paginate={paginate} currentPage={currentPage} activeLink={activeLink} />}
                    <Footer />
                </React.Fragment>
            }

        </React.Fragment>
    )
};

export default Forum;