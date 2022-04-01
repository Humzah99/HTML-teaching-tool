import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ elementsPerPage, totalElements, paginate, currentPage }) => {
    const pageNumbers = [];
    const [activeLink, setActiveLink] = useState(1);
    const [pageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    const noOfPages = Math.ceil(totalElements / elementsPerPage);

    const ChevronRight = <FontAwesomeIcon className="icon" icon={faChevronRight} />;

    const ChevronLeft = <FontAwesomeIcon className="icon" icon={faChevronLeft} />;

    console.log("noOfPages: " + noOfPages);
    console.log("currentPage: " + currentPage)
    console.log(totalElements);
    console.log(elementsPerPage)
    for (let i = 1; i <= noOfPages; i++) {
        pageNumbers.push(i);
    }

    const handleNextBtn = () => {
        paginate(currentPage + 1)
        setActiveLink(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    const handlePrevBtn = () => {
        paginate(currentPage - 1)
        setActiveLink(currentPage - 1);
        if ((currentPage - 1) % pageNumberLimit == 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    return (
        <div className='row mt-5'>
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <button onClick={handlePrevBtn} className='page-link prev-btn' disabled={currentPage == pageNumbers[0] ? true : false}>
                            {ChevronLeft}
                        </button>
                    </li>
                    {pageNumbers.map((number, index) => {
                        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                            return (

                                <li key={index} className='page-item'>
                                    <a onClick={() => { paginate(number); setActiveLink(number) }} className={activeLink === number ? 'active page-link' : 'page-link'}>
                                        {number}
                                    </a>
                                </li>
                            )

                        } else {
                            return null;
                        }
                    })}
                    <li className='page-item'>
                        <button onClick={handleNextBtn} className='page-link next-btn' disabled={currentPage == pageNumbers.length ? true : false}>
                            {ChevronRight}
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;
