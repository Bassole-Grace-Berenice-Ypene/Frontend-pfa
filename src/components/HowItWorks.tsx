import React, { VoidFunctionComponent } from 'react';
import { IconType } from 'react-icons';
import { FaCalendarAlt, FaCar, FaBell, FaCheckCircle } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons/lib';
import './HowItWorks.css';

interface Step {
    icon: IconType;
    title: string;
    description: string;
}

interface IconWrapperProps {
    icon: IconType;
}

const IconWrapper: VoidFunctionComponent<IconWrapperProps> = ({ icon: Icon }) => {
    const IconComponent = Icon as VoidFunctionComponent<IconBaseProps>;
    return <IconComponent size={35} />;
};

const HowItWorks: React.FC = () => {
    const steps: Step[] = [
        {
            icon: FaCalendarAlt,
            title: "Réservez en ligne",
            description: "Choisissez la date et l'heure qui vous conviennent pour votre rendez-vous."
        },
        {
            icon: FaCar,
            title: "Déposez votre véhicule",
            description: "Amenez votre véhicule au garage ou utilisez notre service de récupération."
        },
        {
            icon: FaBell,
            title: "Suivez les réparations",
            description: "Recevez des notifications en temps réel sur l'avancement des travaux."
        },
        {
            icon: FaCheckCircle,
            title: "Récupérez votre véhicule",
            description: "Venez chercher votre véhicule ou optez pour notre service de livraison."
        }
    ];

    return (
        <section className="how-it-works">
            <div className="section-header">
                <h2>Comment ça marche</h2>
                <p>Un processus simple et transparent pour la maintenance de votre véhicule</p>
            </div>
            <div className="steps-container">
                {steps.map((step, index) => (
                    <div key={index} className="step-item">
                        <div className="step-icon">
                            <IconWrapper icon={step.icon} />
                        </div>
                        <div className="step-line"></div>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks; 