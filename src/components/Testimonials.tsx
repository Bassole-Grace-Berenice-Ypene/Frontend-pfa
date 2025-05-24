import React, { VoidFunctionComponent } from 'react';
import { IconType } from 'react-icons';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons/lib';
import './Testimonials.css';

interface Testimonial {
    id: number;
    name: string;
    car: string;
    rating: number;
    comment: string;
    initial: string;
}

interface StarIconProps {
    icon: IconType;
    className: string;
}

const StarIcon: VoidFunctionComponent<StarIconProps> = ({ icon: Icon, className }) => {
    const IconComponent = Icon as VoidFunctionComponent<IconBaseProps>;
    return <IconComponent className={className} />;
};

const Testimonials: React.FC = () => {
    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Yasmine",
            car: "Propriétaire d'une Renault Clio",
            rating: 5,
            comment: "Service impeccable et transparent. J'ai pu suivre toutes les étapes de la réparation et j'ai été informée en temps réel. Je recommande vivement !",
            initial: "S"
        },
        {
            id: 2,
            name: "Mohammed",
            car: "Propriétaire d'une Peugeot 3008",
            rating: 5,
            comment: "Équipe professionnelle et efficace. Le système de suivi en ligne est vraiment pratique, et le service de livraison m'a fait gagner beaucoup de temps.",
            initial: "T"
        },
        {
            id: 3,
            name: "Aziz",
            car: "Propriétaire d'une Citroën C3",
            rating: 4,
            comment: "Très satisfaite du service et des réparations effectuées. Les prix sont transparents et le travail est de qualité. Je reviendrai sans hésiter.",
            initial: "M"
        }
    ];

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(
                    <StarIcon 
                        key={i} 
                        icon={FaStar} 
                        className="star filled" 
                    />
                );
            } else if (i - 0.5 === rating) {
                stars.push(
                    <StarIcon 
                        key={i} 
                        icon={FaStarHalf} 
                        className="star filled" 
                    />
                );
            } else {
                stars.push(
                    <StarIcon 
                        key={i} 
                        icon={FaStar} 
                        className="star" 
                    />
                );
            }
        }
        return stars;
    };

    return (
        <section className="testimonials">
            <div className="section-header">
                <h2>Ce que disent nos clients</h2>
                <p>Découvrez les expériences de nos clients satisfaits</p>
            </div>
            <div className="testimonials-container">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial-card">
                        <div className="rating">
                            {renderStars(testimonial.rating)}
                        </div>
                        <p className="comment">{testimonial.comment}</p>
                        <div className="client-info">
                            <div className="client-initial" style={{ backgroundColor: `hsl(${testimonial.id * 120}, 70%, 60%)` }}>
                                {testimonial.initial}
                            </div>
                            <div className="client-details">
                                <h4>{testimonial.name}</h4>
                                <p>{testimonial.car}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials; 