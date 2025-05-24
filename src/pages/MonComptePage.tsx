import React, { useState } from 'react';

interface MonComptePageProps {
  onNavigate: (page: string) => void;
}

const MonComptePage: React.FC<MonComptePageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // État pour les informations utilisateur
  const [userInfo, setUserInfo] = useState({
    nom: 'Doe',
    prenom: 'John',
    email: 'john.doe@example.com',
    telephone: '+33 1 23 45 67 89',
    adresse: '123 Rue de la République',
    ville: 'Paris',
    codePostal: '75001',
    dateNaissance: '1985-03-15'
  });

  // État pour les véhicules
  const [vehicules] = useState([
    {
      id: 1,
      marque: 'Renault',
      modele: 'Clio IV',
      immatriculation: 'AB-123-CD',
      annee: 2018,
      couleur: 'Bleu',
      carburant: 'Essence',
      kilometrage: 45000
    },
    {
      id: 2,
      marque: 'Peugeot',
      modele: '308',
      immatriculation: 'EF-456-GH',
      annee: 2020,
      couleur: 'Gris',
      carburant: 'Diesel',
      kilometrage: 28000
    }
  ]);

  // État pour les préférences
  const [preferences, setPreferences] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    rappels: {
      entretien: true,
      controle: true,
      assurance: false
    }
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Logique de sauvegarde
    console.log('Profil sauvegardé:', userInfo);
  };

  const handlePreferenceChange = (category: string, key: string, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('accueil')}
              className="text-blue-600 text-2xl font-bold cursor-pointer"
            >
              <i className="fas fa-car mr-2"></i>
              AutoService
            </button>
          </div>
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('accueil')}
              className="text-gray-600 hover:text-blue-500"
            >
              <i className="fas fa-home mr-2"></i>
              Retour à l'accueil
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  <i className="fas fa-user"></i>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {userInfo.prenom} {userInfo.nom}
                </h2>
                <p className="text-gray-600">{userInfo.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                    activeSection === 'profile' 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className="fas fa-user-edit mr-3"></i>
                  Informations personnelles
                </button>
                <button
                  onClick={() => setActiveSection('vehicules')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                    activeSection === 'vehicules' 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className="fas fa-car mr-3"></i>
                  Mes véhicules
                </button>
                <button
                  onClick={() => setActiveSection('preferences')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                    activeSection === 'preferences' 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className="fas fa-cog mr-3"></i>
                  Préférences
                </button>
                <button
                  onClick={() => setActiveSection('securite')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                    activeSection === 'securite' 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <i className="fas fa-shield-alt mr-3"></i>
                  Sécurité
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Informations personnelles
                    </h3>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      <i className={`fas ${isEditing ? 'fa-save' : 'fa-edit'} mr-2`}></i>
                      {isEditing ? 'Sauvegarder' : 'Modifier'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Prénom</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userInfo.prenom}
                          onChange={(e) => setUserInfo({...userInfo, prenom: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800 py-2">{userInfo.prenom}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Nom</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userInfo.nom}
                          onChange={(e) => setUserInfo({...userInfo, nom: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800 py-2">{userInfo.nom}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800 py-2">{userInfo.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Téléphone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={userInfo.telephone}
                          onChange={(e) => setUserInfo({...userInfo, telephone: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800 py-2">{userInfo.telephone}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">Adresse</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userInfo.adresse}
                          onChange={(e) => setUserInfo({...userInfo, adresse: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800 py-2">{userInfo.adresse}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Ville</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userInfo.ville}
                          onChange={(e) => setUserInfo({...userInfo, ville: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800 py-2">{userInfo.ville}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Code postal</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={userInfo.codePostal}
                          onChange={(e) => setUserInfo({...userInfo, codePostal: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-800 py-2">{userInfo.codePostal}</p>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex space-x-4">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                      >
                        <i className="fas fa-check mr-2"></i>
                        Confirmer
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
                      >
                        <i className="fas fa-times mr-2"></i>
                        Annuler
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Vehicules Section */}
              {activeSection === 'vehicules' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Mes véhicules</h3>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                      <i className="fas fa-plus mr-2"></i>
                      Ajouter un véhicule
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {vehicules.map((vehicule) => (
                      <div key={vehicule.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800">
                              {vehicule.marque} {vehicule.modele}
                            </h4>
                            <p className="text-blue-600 font-medium">{vehicule.immatriculation}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Année:</span>
                            <span>{vehicule.annee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Couleur:</span>
                            <span>{vehicule.couleur}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Carburant:</span>
                            <span>{vehicule.carburant}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Kilométrage:</span>
                            <span>{vehicule.kilometrage.toLocaleString()} km</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preferences Section */}
              {activeSection === 'preferences' && (
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Préférences</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Notifications par email</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.notifications.email}
                              onChange={(e) => handlePreferenceChange('notifications', 'email', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Notifications SMS</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.notifications.sms}
                              onChange={(e) => handlePreferenceChange('notifications', 'sms', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Rappels automatiques</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Rappels d'entretien</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.rappels.entretien}
                              onChange={(e) => handlePreferenceChange('rappels', 'entretien', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Rappels contrôle technique</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.rappels.controle}
                              onChange={(e) => handlePreferenceChange('rappels', 'controle', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Section */}
              {activeSection === 'securite' && (
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Sécurité</h3>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Changer le mot de passe</h4>
                      <button
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        <i className="fas fa-key mr-2"></i>
                        Modifier le mot de passe
                      </button>
                      
                      {showPasswordForm && (
                        <div className="mt-4 space-y-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">Mot de passe actuel</label>
                            <input
                              type="password"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">Nouveau mot de passe</label>
                            <input
                              type="password"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">Confirmer le mot de passe</label>
                            <input
                              type="password"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div className="flex space-x-4">
                            <button
                              type="submit"
                              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                            >
                              <i className="fas fa-save mr-2"></i>
                              Enregistrer
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowPasswordForm(false)}
                              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
                            >
                              <i className="fas fa-times mr-2"></i>
                              Annuler
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MonComptePage;