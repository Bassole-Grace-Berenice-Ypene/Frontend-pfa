import React, { useState } from 'react';

interface HistoriquePageProps {
  onNavigate: (page: string) => void;
}

const HistoriquePage: React.FC<HistoriquePageProps> = ({ onNavigate }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState('all');
  const [selectedRepair, setSelectedRepair] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Données d'historique simulées
  const historique = [
    {
      id: 'REP003',
      date: '2024-12-15',
      vehicule: 'Renault Clio IV',
      immatriculation: 'AB-123-CD',
      services: ['Vidange', 'Changement filtres', 'Contrôle général'],
      technicien: 'Marc Dubois',
      montant: 185.50,
      statut: 'Terminé',
      duree: '2h30',
      pieces: [
        { nom: 'Huile moteur 5W30', quantite: '5L', prix: 45.00 },
        { nom: 'Filtre à huile', quantite: '1', prix: 15.50 },
        { nom: 'Filtre à air', quantite: '1', prix: 22.00 }
      ],
      mainOeuvre: 103.00,
      notes: 'Révision complète effectuée. Véhicule en bon état général.',
      prochainEntretien: '2025-06-15'
    },
    {
      id: 'REP004',
      date: '2024-11-08',
      vehicule: 'Peugeot 308',
      immatriculation: 'EF-456-GH',
      services: ['Réparation carrosserie', 'Peinture'],
      technicien: 'Sophie Martin',
      montant: 850.00,
      statut: 'Terminé',
      duree: '3 jours',
      pieces: [
        { nom: 'Peinture teinte originale', quantite: '1L', prix: 85.00 },
        { nom: 'Mastic carrosserie', quantite: '1', prix: 25.00 },
        { nom: 'Vernis', quantite: '0.5L', prix: 35.00 }
      ],
      mainOeuvre: 705.00,
      notes: 'Réparation suite à impact latéral. Remise en état parfaite.',
      prochainEntretien: null
    },
    {
      id: 'REP005',
      date: '2024-09-22',
      vehicule: 'Renault Clio IV',
      immatriculation: 'AB-123-CD',
      services: ['Changement pneus', 'Équilibrage'],
      technicien: 'Pierre Laurent',
      montant: 320.00,
      statut: 'Terminé',
      duree: '1h45',
      pieces: [
        { nom: 'Pneu Michelin 195/65R15', quantite: '4', prix: 280.00 }
      ],
      mainOeuvre: 40.00,
      notes: 'Remplacement des 4 pneus usés. Équilibrage effectué.',
      prochainEntretien: null
    },
    {
      id: 'REP006',
      date: '2024-07-10',
      vehicule: 'Peugeot 308',
      immatriculation: 'EF-456-GH',
      services: ['Contrôle technique', 'Réglage phares'],
      technicien: 'Marc Dubois',
      montant: 75.00,
      statut: 'Terminé',
      duree: '45min',
      pieces: [],
      mainOeuvre: 75.00,
      notes: 'Contrôle technique passé avec succès après réglage des phares.',
      prochainEntretien: '2025-07-10'
    }
  ];

  const vehicules = [
    { id: 'AB-123-CD', nom: 'Renault Clio IV' },
    { id: 'EF-456-GH', nom: 'Peugeot 308' }
  ];

  const filteredHistorique = historique.filter(item => {
    const vehicleMatch = selectedVehicle === 'all' || item.immatriculation === selectedVehicle;
    const periodMatch = selectedPeriod === 'all' || 
      (selectedPeriod === '3months' && new Date(item.date) >= new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)) ||
      (selectedPeriod === '6months' && new Date(item.date) >= new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)) ||
      (selectedPeriod === '1year' && new Date(item.date) >= new Date(Date.now() - 365 * 24 * 60 * 60 * 1000));
    
    return vehicleMatch && periodMatch;
  });

  const totalDepenses = filteredHistorique.reduce((sum, item) => sum + item.montant, 0);

  const handleShowDetail = (repair: any) => {
    setSelectedRepair(repair);
    setShowDetailModal(true);
  };

  const getServiceColor = (service: string) => {
    if (service.toLowerCase().includes('vidange') || service.toLowerCase().includes('entretien')) {
      return 'bg-blue-100 text-blue-800';
    } else if (service.toLowerCase().includes('carrosserie') || service.toLowerCase().includes('peinture')) {
      return 'bg-purple-100 text-purple-800';
    } else if (service.toLowerCase().includes('pneu')) {
      return 'bg-orange-100 text-orange-800';
    } else if (service.toLowerCase().includes('contrôle')) {
      return 'bg-green-100 text-green-800';
    }
    return 'bg-gray-100 text-gray-800';
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
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                <i className="fas fa-history mr-3 text-blue-600"></i>
                Historique des Réparations
              </h1>
              <p className="text-gray-600">
                Consultez l'historique complet de vos interventions
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {totalDepenses.toFixed(2)}€
                </div>
                <div className="text-sm text-blue-800">Total dépensé</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Période</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Toute la période</option>
                <option value="3months">3 derniers mois</option>
                <option value="6months">6 derniers mois</option>
                <option value="1year">1 dernière année</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Véhicule</label>
              <select
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les véhicules</option>
                {vehicules.map((vehicule) => (
                  <option key={vehicule.id} value={vehicule.id}>
                    {vehicule.nom} ({vehicule.id})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                <i className="fas fa-download mr-2"></i>
                Exporter PDF
              </button>
            </div>
          </div>
        </div>

        {/* Historique List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              {filteredHistorique.length} intervention(s) trouvée(s)
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredHistorique.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium mr-3">
                        #{item.id}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(item.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {item.vehicule}
                    </h3>
                    <p className="text-gray-600 mb-3">{item.immatriculation}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.services.map((service, index) => (
                        <span
                          key={index}
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getServiceColor(service)}`}
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <i className="fas fa-user-cog mr-2 text-blue-600"></i>
                        {item.technicien}
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-clock mr-2 text-blue-600"></i>
                        {item.duree}
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-euro-sign mr-2 text-green-600"></i>
                        {item.montant.toFixed(2)}€
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-check-circle mr-2 text-green-600"></i>
                        {item.statut}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0">
                    <button
                      onClick={() => handleShowDetail(item)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      <i className="fas fa-eye mr-2"></i>
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-wrench text-blue-600 text-xl"></i>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {filteredHistorique.length}
                </div>
                <div className="text-gray-600">Interventions</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-euro-sign text-green-600 text-xl"></i>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {totalDepenses.toFixed(0)}€
                </div>
                <div className="text-gray-600">Total dépensé</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-calculator text-orange-600 text-xl"></i>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {filteredHistorique.length > 0 ? (totalDepenses / filteredHistorique.length).toFixed(0) : 0}€
                </div>
                <div className="text-gray-600">Coût moyen</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {showDetailModal && selectedRepair && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Détail de l'intervention #{selectedRepair.id}
                </h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Informations générales</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span>{new Date(selectedRepair.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Véhicule:</span>
                      <span>{selectedRepair.vehicule}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Immatriculation:</span>
                      <span>{selectedRepair.immatriculation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Technicien:</span>
                      <span>{selectedRepair.technicien}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durée:</span>
                      <span>{selectedRepair.duree}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Services effectués</h3>
                  <div className="space-y-2">
                    {selectedRepair.services.map((service: string, index: number) => (
                      <div key={index} className={`px-2 py-1 rounded text-xs ${getServiceColor(service)}`}>
                        {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedRepair.pieces.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Pièces utilisées</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      {selectedRepair.pieces.map((piece: any, index: number) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{piece.nom} (x{piece.quantite})</span>
                          <span className="font-medium">{piece.prix.toFixed(2)}€</span>
                        </div>
                      ))}
                      <hr className="my-2" />
                      <div className="flex justify-between text-sm">
                        <span>Main d'œuvre</span>
                        <span className="font-medium">{selectedRepair.mainOeuvre.toFixed(2)}€</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg text-blue-600 pt-2 border-t">
                        <span>Total</span>
                        <span>{selectedRepair.montant.toFixed(2)}€</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedRepair.notes && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Notes du technicien</h3>
                  <p className="text-gray-600 bg-gray-50 rounded-lg p-4">
                    {selectedRepair.notes}
                  </p>
                </div>
              )}
              
              {selectedRepair.prochainEntretien && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <i className="fas fa-calendar-alt text-blue-600 mr-2"></i>
                    <span className="text-blue-800 font-medium">
                      Prochain entretien recommandé: {new Date(selectedRepair.prochainEntretien).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoriquePage;