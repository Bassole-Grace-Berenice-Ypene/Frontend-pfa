import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection: React.FC = () => {
    return (
        <section className="hero-section">
            <div className="hero-overlay">
                <div className="hero-content">
                    <h1>Votre véhicule mérite le meilleur service</h1>
                    <p>
                        Confiez votre voiture à nos experts pour un entretien et des réparations de
                        qualité professionnelle. Suivez l'avancement en temps réel.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/rendez-vous" className="btn btn-primary">
                            Prendre rendez-vous
                        </Link>
                        <Link to="/services" className="btn btn-outline">
                            Découvrir nos services
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection; 