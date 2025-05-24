import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
  setShowLoginModal: (show: boolean) => void;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isLoggedIn,
  setIsLoggedIn,
  setShowLoginModal,
  onNavigate
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
    setActiveTab('accueil');
  };

  const handleMenuClick = (page: string) => {
    onNavigate(page);
    setShowDropdown(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-blue-600 text-2xl font-bold cursor-pointer" onClick={() => onNavigate('accueil')}>
            <i className="fas fa-car mr-2"></i>
            AutoService
          </div>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <button
            onClick={() => setActiveTab('accueil')}
            className={`whitespace-nowrap cursor-pointer font-medium ${
              activeTab === 'accueil' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`whitespace-nowrap cursor-pointer font-medium ${
              activeTab === 'services' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Nos Services
          </button>
          <a 
            href="https://readdy.ai/home/3cf4d204-6151-4b75-b3e3-8ebc9dea4d5f/cab323bc-f5cf-4647-bacc-a638ddf3cedd"
            data-readdy="true"
            className={`whitespace-nowrap cursor-pointer font-medium ${
              activeTab === 'rendez-vous' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Rendez-vous
          </a>
          <button
            onClick={() => setActiveTab('contact')}
            className={`whitespace-nowrap cursor-pointer font-medium ${
              activeTab === 'contact' ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar avec menu déroulant */}
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors"
              >
                <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-sm"></i>
                </div>
                <i className={`fas fa-chevron-down text-xs transition-transform ${showDropdown ? 'rotate-180' : ''}`}></i>
              </button>

              {/* Menu déroulant */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">John Doe</p>
                    <p className="text-xs text-gray-500">john.doe@example.com</p>
                  </div>
                  
                  <button
                    onClick={() => handleMenuClick('mon-compte')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <i className="fas fa-user-cog mr-3 text-blue-600"></i>
                    Mon Compte
                  </button>
                  
                  <button
                    onClick={() => handleMenuClick('historique')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <i className="fas fa-history mr-3 text-blue-600"></i>
                    Voir Historique
                  </button>
                  
                  <button
                    onClick={() => handleMenuClick('suivi-reparations')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <i className="fas fa-tools mr-3 text-blue-600"></i>
                    Suivi Réparations
                  </button>
                  
                  <hr className="my-2" />
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <i className="fas fa-sign-out-alt mr-3"></i>
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="whitespace-nowrap cursor-pointer text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Connexion
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;