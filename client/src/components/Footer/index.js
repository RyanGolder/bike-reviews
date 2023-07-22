import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <footer className="bg-dark text-light py-3 fixed-bottom">
            <Container>
                <p className="mb-0 text-center">
                    &copy; {new Date().getFullYear()} Bike Reviews. All rights reserved.
                </p>
                <p className="mb-0 text-center">
                    <span onClick={() => navigate('/')} className={location.pathname === '/' ? 'mx-1 text-light' : 'mx-1 text-light'}>
                        Home
                    </span>
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
