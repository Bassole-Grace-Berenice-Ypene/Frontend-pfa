import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to="/" className="logo">
                        Service automatique
                    </Link>
                </div>
                <div className="navbar-center">
                    <Link to="/" className="nav-link">Accueil</Link>
                    <Link to="/services" className="nav-link">Nos Services</Link>
                    <Link to="/rendez-vous" className="nav-link">Rendez-vous</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 