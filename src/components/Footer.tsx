import React, { VoidFunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { IconType } from 'react-icons';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaClock } from 'react-icons/fa';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import { IconBaseProps } from 'react-icons/lib';
import './Footer.css';

interface IconWrapperProps {
    icon: IconType;
    className?: string;
}

const IconWrapper: VoidFunctionComponent<IconWrapperProps> = ({ icon: Icon, className }) => {
    const IconComponent = Icon as VoidFunctionComponent<IconBaseProps>;
    return <IconComponent className={className} />;
};

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Logo et Description */}
                <div className="footer-section">
                    <h3>AutoService</h3>
                    <p>Votre partenaire de confiance pour l'entretien et la réparation de votre véhicule.</p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><IconWrapper icon={FaFacebookF} /></a>
                        <a href="#" aria-label="Twitter"><IconWrapper icon={FaTwitter} /></a>
                        <a href="#" aria-label="Instagram"><IconWrapper icon={FaInstagram} /></a>
                        <a href="#" aria-label="LinkedIn"><IconWrapper icon={FaLinkedinIn} /></a>
                    </div>
                </div>

                {/* Liens Rapides */}
                <div className="footer-section">
                    <h4>Liens Rapides</h4>
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/rendez-vous">Rendez-vous</Link></li>
                        <li><Link to="/a-propos">À propos</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                {/* Nos Services */}
                <div className="footer-section">
                    <h4>Nos Services</h4>
                    <ul>
                        <li><Link to="/services/reparation">Réparation Mécanique</Link></li>
                        <li><Link to="/services/entretien">Entretien Régulier</Link></li>
                        <li><Link to="/services/carrosserie">Carrosserie</Link></li>
                        <li><Link to="/services/diagnostic">Diagnostic Électronique</Link></li>
                        <li><Link to="/services/electrique">Services Électriques</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-section">
                    <h4>Contact</h4>
                    <ul className="contact-info">
                        <li>
                            <IconWrapper icon={MdLocationOn} />
                            <span>123 Rue de la Réparation, 75001 Paris</span>
                        </li>
                        <li>
                            <IconWrapper icon={MdPhone} />
                            <span>+33 1 23 45 67 89</span>
                        </li>
                        <li>
                            <IconWrapper icon={MdEmail} />
                            <span>contact@autoservice.fr</span>
                        </li>
                        <li>
                            <IconWrapper icon={FaClock} />
                            <span>Lun-Ven: 8h-18h | Sam: 9h-16h</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>&copy; 2025 AutoService. Tous droits réservés.</p>
                    <div className="footer-bottom-links">
                        <Link to="/politique-confidentialite">Politique de confidentialité</Link>
                        <Link to="/conditions">Conditions d'utilisation</Link>
                        <Link to="/mentions-legales">Mentions légales</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 