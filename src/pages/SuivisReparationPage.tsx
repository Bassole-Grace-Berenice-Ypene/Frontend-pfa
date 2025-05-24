import React, { useState } from 'react';
import Header from './Header';

const SuivisReparationPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('suivi-reparations');
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
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Suivi de vos réparations</h1>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="space-y-6">
                        {/* Liste des réparations en cours */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Réparations en cours</h2>
                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-gray-800">Réparation Renault Clio</h3>
                                            <p className="text-sm text-gray-600">Numéro de suivi: #12345</p>
                                        </div>
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                            En cours
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600">
                                            Diagnostic en cours - Estimation du temps: 2 jours
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Historique des réparations */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Historique des réparations</h2>
                            <div className="space-y-4">
                                <div className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-gray-800">Vidange Peugeot 308</h3>
                                            <p className="text-sm text-gray-600">Numéro de suivi: #12344</p>
                                        </div>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                            Terminé
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600">
                                            Réparation terminée le 15/03/2024
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuivisReparationPage; 