import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <footer className="bg-dark text-light py-3 fixed-bottom">
            <Container>
                <p className="mb-0 text-center">
                    &copy; {new Date().getFullYear()} Bike Reviews. All rights reserved.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
