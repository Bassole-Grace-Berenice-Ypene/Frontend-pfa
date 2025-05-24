import React from 'react';
import { Link } from 'react-router-dom';
import './CallToAction.css';

const CallToAction: React.FC = () => {
    return (
        <section className="call-to-action">
            <div className="cta-content">
                <h2>Prêt à prendre rendez-vous?</h2>
                <p>
                    Réservez dès maintenant pour bénéficier de notre service professionnel et
                    de notre suivi en temps réel.
                </p>
                <Link to="/rendez-vous" className="cta-button">
                    Prendre rendez-vous
                </Link>
            </div>
        </section>
    );
};

export default CallToAction; 