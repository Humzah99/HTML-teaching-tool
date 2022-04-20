import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import './Footer.css'
import WebsiteIcon from "../../images/footer-logo.jpg";

const Footer = () => {
    const auth = useContext(AuthContext);
    return (
        <div className='main-footer'>
            <div className='row'>
                <div className='col-md-6'>
                    <Link to='/documentation' className='btn ms-5'>Documentation</Link>
                    <Link to='/forum' className='btn ms-2'>User Forum</Link>
                    {auth.isLoggedIn ? <Link to='/quiz' className='btn ms-2'>Quiz</Link> : <Link to='/auth' className='btn ms-2'>Sign Up</Link>}
                </div>
            </div>
            <div className="hr-line mt-3 mb-5"></div>
            <div className='row text-center'>
                <p className='footer-info-text'>HTMLearning is optimized for learning, testing, and training. Examples might be simplified to improve reading and basic understanding. Tutorials, documentation, and examples are constantly reviewed to avoid errors, but we cannot warrant full correctness of all content.</p>
            </div>
            <div className='row text-center'>
                <p className='footer-text'>&copy;{new Date().getFullYear()} HTMLearning INC | All rights reserved</p>
            </div>
            <div className='row text-center mt-5'>
                <img
                    className="footer-icon shadow-lg mx-auto d-block mb-3"
                    src={WebsiteIcon}
                    alt="Website-Logo"
                />
            </div>
        </div>
    )
}

export default Footer;
