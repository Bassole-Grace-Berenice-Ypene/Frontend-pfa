import React, { useState } from 'react';
import Header from './Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import MonComptePage from './MonComptePage';
import HistoriquePage from './HistoriquePage';
import SuiviReparationsPage from './SuiviReparationsPage';
import '../styles/global.css';

const AcceuilPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('accueil');
  const [currentPage, setCurrentPage] = useState('accueil');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (page === 'accueil') {
      setActiveTab('accueil');
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'mon-compte':
        return <MonComptePage onNavigate={handleNavigate} />;
      case 'historique':
        return <HistoriquePage onNavigate={handleNavigate} />;
      case 'suivi-reparations':
        return <SuiviReparationsPage onNavigate={handleNavigate} />;
      case 'accueil':
      default:
        return (
          <div className="accueil-page">
            <HeroSection />
            <ServicesSection />
            <HowItWorks />
            <Testimonials />
          </div>
        );
    }
  };

  if (currentPage !== 'accueil') {
    return renderCurrentPage();
  }

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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Connexion</h2>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Se souvenir de moi
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Mot de passe oublié?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
              >
                Se connecter
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Pas encore de compte?
                  <a href="#" className="text-blue-600 hover:underline ml-1">
                    S'inscrire
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        {activeTab === 'accueil' && renderCurrentPage()}
        
        {activeTab === 'services' && (
          <div className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos Services Détaillés</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Découvrez l'ensemble de nos prestations professionnelles
                </p>
              </div>
              {/* Contenu détaillé des services */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Services cards would go here */}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Contactez-nous</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Nous sommes là pour répondre à toutes vos questions
                </p>
              </div>
              {/* Contact form would go here */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AcceuilPage; 