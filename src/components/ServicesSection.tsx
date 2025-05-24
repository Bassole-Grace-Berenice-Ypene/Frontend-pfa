import React from 'react';
import { IconType } from 'react-icons';
import { FaTools, FaOilCan, FaCar, FaMicrochip, FaBolt, FaTruck } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons/lib';
import './ServicesSection.css';

interface Service {
    id: number;
    icon: IconType;
    title: string;
    description: string;
}

interface IconWrapperProps {
    Icon: IconType;
}

const IconWrapper = ({ Icon }: IconWrapperProps): JSX.Element => {
    const IconComponent = Icon as React.ComponentType<IconBaseProps>;
    return <IconComponent size={32} />;
};

const ServicesSection: React.FC = () => {
    const services: Service[] = [
        {
            id: 1,
            icon: FaTools,
            title: "Réparation Mécanique",
            description: "Diagnostic complet et réparation professionnelle de votre véhicule par nos experts certifiés."
        },
        {
            id: 2,
            icon: FaOilCan,
            title: "Entretien Régulier",
            description: "Maintenance préventive et services d'entretien pour optimiser la performance de votre véhicule."
        },
        {
            id: 3,
            icon: FaCar,
            title: "Carrosserie",
            description: "Réparation et peinture de carrosserie avec des équipements modernes et une finition parfaite."
        },
        {
            id: 4,
            icon: FaMicrochip,
            title: "Diagnostic Électronique",
            description: "Analyse précise des systèmes électroniques avec des outils de diagnostic de dernière génération."
        },
        {
            id: 5,
            icon: FaBolt,
            title: "Services Électriques",
            description: "Solutions expertes pour tous les problèmes électriques de votre véhicule."
        },
        {
            id: 6,
            icon: FaTruck,
            title: "Service de Livraison",
            description: "Service pratique de récupération et livraison de votre véhicule à domicile."
        }
    ];

    return (
        <section className="services-section">
            <div className="section-header">
                <h2>Nos Services</h2>
                <p>Des solutions complètes pour l'entretien et la réparation de votre véhicule</p>
            </div>
            <div className="services-grid">
                {services.map((service) => (
                    <div key={service.id} className="service-card">
                        <div className="service-icon">
                            <IconWrapper Icon={service.icon} />
                        </div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServicesSection; 