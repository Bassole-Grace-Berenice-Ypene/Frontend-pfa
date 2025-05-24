import React, { useState, useEffect } from 'react';

interface SuiviReparationsPageProps {
  onNavigate: (page: string) => void;
}

const SuiviReparationsPage: React.FC<SuiviReparationsPageProps> = ({ onNavigate }) => {
  const [selectedRepair, setSelectedRepair] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Données simulées des réparations
  const [repairs, setRepairs] = useState([
    {
      id: 'REP001',
      vehicule: 'Renault Clio IV',
      immatriculation: 'AB-123-CD',
      dateEntree: '2025-01-15',
      statut: 'en_cours',
      progression: 65,
      technicien: 'Marc Dubois',
      estimatedCompletion: '2025-01-18',
      services: ['Révision complète', 'Changement plaquettes'],
      etapes: [
        { nom: 'Réception véhicule', statut: 'complete', temps: '09:30', date: '15/01' },
        { nom: 'Diagnostic initial', statut: 'complete', temps: '10:15', date: '15/01' },
        { nom: 'Démontage/Inspection', statut: 'complete', temps: '14:30', date: '15/01' },
        { nom: 'Réparation en cours', statut: 'en_cours', temps: '09:00', date: '16/01' },
        { nom: 'Contrôle qualité', statut: 'en_attente', temps: '', date: '' },
        { nom: 'Livraison', statut: 'en_attente', temps: '', date: '' }
      ],
      notifications: [
        { message: 'Réparation démarrée ce matin', temps: '09:00', type: 'info' },
        { message: 'Pièces commandées arrivées', temps: '14:30', type: 'success' },
        { message: 'Diagnostic révèle usure supplémentaire', temps: '16:45', type: 'warning' }
      ]
    },
    {
      id: 'REP002',
      vehicule: 'Peugeot 308',
      immatriculation: 'EF-456-GH',
      dateEntree: '2025-01-14',
      statut: 'termine',
      progression: 100,
      technicien: 'Sophie Martin',
      estimatedCompletion: '2025-01-16',
      services: ['Réparation carrosserie'],
      etapes: [
        { nom: 'Réception véhicule', statut: 'complete', temps: '08:45', date: '14/01' },
        { nom: 'Diagnostic initial', statut: 'complete', temps: '09:30', date: '14/01' },
        { nom: 'Préparation surface', statut: 'complete', temps: '13:00', date: '14/01' },
        { nom: 'Peinture', statut: 'complete', temps: '09:00', date: '15/01' },
        { nom: 'Contrôle qualité', statut: 'complete', temps: '14:00', date: '16/01' },
        { nom: 'Prêt pour livraison', statut: 'complete', temps: '16:30', date: '16/01' }
      ],
      notifications: [
        { message: 'Véhicule prêt pour récupération', temps: '16:30', type: 'success' }
      ]
    }
  ]);

  // Mise à jour de l'heure actuelle
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulation de mises à jour en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setRepairs(prevRepairs => {
        const updatedRepairs = [...prevRepairs];
        const activeRepair = updatedRepairs.find(r => r.statut === 'en_cours');
        if (activeRepair && Math.random() > 0.7) {
          const messages = [
            'Progression de la réparation: étape suivante démarrée',
            'Contrôle intermédiaire effectué avec succès',
            'Pièce installée et testée',
            'Mise à jour du statut par le technicien'
          ];
          const newNotification = {
            message: messages[Math.floor(Math.random() * messages.length)],
            temps: currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            type: 'info'
          };
          activeRepair.notifications = [newNotification, ...activeRepair.notifications];
        }
        return updatedRepairs;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [currentTime]);

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'en_cours': return 'text-blue-600 bg-blue-100';
      case 'termine': return 'text-green-600 bg-green-100';
      case 'en_attente': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatutText = (statut: string) => {
    switch (statut) {
      case 'en_cours': return 'En cours';
      case 'termine': return 'Terminé';
      case 'en_attente': return 'En attente';
      default: return 'Inconnu';
    }
  };

  const getEtapeIcon = (statut: string) => {
    switch (statut) {
      case 'complete': return 'fas fa-check-circle text-green-500';
      case 'en_cours': return 'fas fa-clock text-blue-500';
      case 'en_attente': return 'fas fa-circle text-gray-300';
      default: return 'fas fa-circle text-gray-300';
    }
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                <i className="fas fa-tools mr-3 text-blue-600"></i>
                Suivi de vos Réparations
              </h1>
              <p className="text-gray-600">
                Suivez l'avancement de vos réparations en temps réel
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Dernière mise à jour</div>
              <div className="text-lg font-semibold text-blue-600">
                {currentTime.toLocaleTimeString('fr-FR')}
              </div>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm text-green-600">En direct</span>
              </div>
            </div>
          </div>
        </div>

        {/* Repairs List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Repairs List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Mes Réparations</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {repairs.map((repair) => (
                  <div
                    key={repair.id}
                    onClick={() => setSelectedRepair(repair)}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedRepair?.id === repair.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-500">#{repair.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatutColor(repair.statut)}`}>
                        {getStatutText(repair.statut)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{repair.vehicule}</h3>
                    <p className="text-sm text-gray-600 mb-2">{repair.immatriculation}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <i className="fas fa-calendar mr-2"></i>
                      Entrée: {new Date(repair.dateEntree).toLocaleDateString('fr-FR')}
                    </div>
                    {repair.statut === 'en_cours' && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progression</span>
                          <span>{repair.progression}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${repair.progression}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Repair Details */}
          <div className="lg:col-span-2">
            {selectedRepair ? (
              <div className="space-y-6">
                {/* Repair Header */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {selectedRepair.vehicule}
                      </h2>
                      <p className="text-gray-600">{selectedRepair.immatriculation}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-full font-medium ${getStatutColor(selectedRepair.statut)}`}>
                      {getStatutText(selectedRepair.statut)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Technicien assigné</div>
                      <div className="font-semibold text-gray-800">
                        <i className="fas fa-user-cog mr-2 text-blue-600"></i>
                        {selectedRepair.technicien}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Date d'entrée</div>
                      <div className="font-semibold text-gray-800">
                        <i className="fas fa-calendar-alt mr-2 text-blue-600"></i>
                        {new Date(selectedRepair.dateEntree).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500 mb-1">Fin estimée</div>
                      <div className="font-semibold text-gray-800">
                        <i className="fas fa-clock mr-2 text-blue-600"></i>
                        {new Date(selectedRepair.estimatedCompletion).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm text-gray-500 mb-2">Services demandés</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedRepair.services.map((service: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    <i className="fas fa-list-check mr-2 text-blue-600"></i>
                    Étapes de réparation
                  </h3>
                  <div className="space-y-4">
                    {selectedRepair.etapes.map((etape: any, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="flex items-center justify-center w-8">
                          <i className={getEtapeIcon(etape.statut)}></i>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${
                              etape.statut === 'complete' ? 'text-gray-800' :
                              etape.statut === 'en_cours' ? 'text-blue-600' : 'text-gray-500'
                            }`}>
                              {etape.nom}
                            </h4>
                            {etape.temps && (
                              <span className="text-sm text-gray-500">
                                {etape.date} à {etape.temps}
                              </span>
                            )}
                          </div>
                          {etape.statut === 'en_cours' && (
                            <div className="mt-2">
                              <div className="w-full bg-gray-200 rounded-full h-1">
                                <div className="bg-blue-600 h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Notifications */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    <i className="fas fa-bell mr-2 text-blue-600"></i>
                    Notifications en temps réel
                  </h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {selectedRepair.notifications.map((notification: any, index: number) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border-l-4 ${
                          notification.type === 'success' ? 'bg-green-50 border-green-500' :
                          notification.type === 'warning' ? 'bg-orange-50 border-orange-500' :
                          'bg-blue-50 border-blue-500'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-gray-800">{notification.message}</p>
                          <span className="text-sm text-gray-500">{notification.temps}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedRepair.statut === 'termine' && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-green-600 mb-4">
                        <i className="fas fa-check-circle mr-2"></i>
                        Réparation terminée !
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Votre véhicule est prêt pour la récupération
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg">
                          <i className="fas fa-calendar-alt mr-2"></i>
                          Programmer récupération
                        </button>
                        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg">
                          <i className="fas fa-truck mr-2"></i>
                          Demander livraison
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Sélectionnez une réparation
                </h3>
                <p className="text-gray-500">
                  Choisissez une réparation dans la liste pour voir les détails et le suivi en temps réel
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SuiviReparationsPage;