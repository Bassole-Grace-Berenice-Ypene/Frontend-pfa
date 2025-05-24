import React, { useState } from 'react';
import Header from './Header';
import '../styles/global.css';

const ServicePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('services');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleNavigate = (page: string) => {
        if (page === 'accueil') {
            window.location.href = '/';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setShowLoginModal={setShowLoginModal}
                onNavigate={handleNavigate}
            />

            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Nos Services</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Service 1</h3>
                        <p className="text-gray-600 mb-4">Description détaillée du service 1. Nous offrons une solution complète pour répondre à vos besoins.</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Caractéristique 1</li>
                            <li>Caractéristique 2</li>
                            <li>Caractéristique 3</li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Service 2</h3>
                        <p className="text-gray-600 mb-4">Description détaillée du service 2. Une approche professionnelle pour des résultats optimaux.</p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li>Caractéristique 1</li>
                            <li>Caractéristique 2</li>
                            <li>Caractéristique 3</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Pourquoi choisir nos services ?</h2>
                    <p className="text-gray-600">
                        Nous nous engageons à fournir des services de qualité supérieure, 
                        avec une équipe expérimentée et des solutions adaptées à vos besoins spécifiques.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServicePage; 