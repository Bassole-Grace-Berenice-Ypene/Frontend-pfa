// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import Header from './Header';

const RendezvousPage: React.FC = () => {
// État pour les onglets et l'authentification
    const [activeTab, setActiveTab] = useState('rendez-vous');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
// États pour le formulaire de rendez-vous
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedService, setSelectedService] = useState<string>('');
    const [additionalServices, setAdditionalServices] = useState<string[]>([]);
    const [vehicleBrand, setVehicleBrand] = useState<string>('');
    const [vehicleModel, setVehicleModel] = useState<string>('');
    const [vehicleYear, setVehicleYear] = useState<string>('');
    const [mileage, setMileage] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [comments, setComments] = useState<string>('');
    const [needsDelivery, setNeedsDelivery] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [deliveryCity, setDeliveryCity] = useState('');
    const [showSummary, setShowSummary] = useState(false);
// Générer les dates pour le calendrier (30 jours à partir d'aujourd'hui)
    const generateCalendarDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
// Exclure les dimanches (0 = dimanche)
            if (date.getDay() !== 0) {
                dates.push(date);
            }
        }
        return dates;
    };
    const calendarDates = generateCalendarDates();
// Générer les créneaux horaires disponibles
    const generateTimeSlots = () => {
        const slots = [];
        const startHour = 8;
        const endHour = 18;
        for (let hour = startHour; hour < endHour; hour++) {
            slots.push(`${hour}:00`);
            if (hour !== endHour - 1) { // Pas de créneau à 17:30
                slots.push(`${hour}:30`);
            }
        }
        return slots;
    };
    const timeSlots = generateTimeSlots();
// Simuler des créneaux déjà réservés
    const [bookedSlots, setBookedSlots] = useState<{[key: string]: string[]}>({});
    useEffect(() => {
// Simulation de créneaux déjà réservés
        const simulateBookedSlots = () => {
            const booked: {[key: string]: string[]} = {};
            calendarDates.forEach(date => {
                const dateString = date.toISOString().split('T')[0];
                const randomBookedCount = Math.floor(Math.random() * 5); // 0 à 4 créneaux réservés par jour
                const bookedTimesForDay: string[] = [];
                for (let i = 0; i < randomBookedCount; i++) {
                    const randomIndex = Math.floor(Math.random() * timeSlots.length);
                    bookedTimesForDay.push(timeSlots[randomIndex]);
                }
                booked[dateString] = bookedTimesForDay;
            });
            setBookedSlots(booked);
        };
        simulateBookedSlots();
    }, []);
// Vérifier si un créneau est disponible
    const isTimeSlotAvailable = (date: Date, time: string) => {
        if (!date) return true;
        const dateString = date.toISOString().split('T')[0];
        return !bookedSlots[dateString]?.includes(time);
    };
// Gestion de la connexion
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggedIn(true);
        setShowLoginModal(false);
    };
// Gestion des services additionnels
    const toggleAdditionalService = (service: string) => {
        if (additionalServices.includes(service)) {
            setAdditionalServices(additionalServices.filter(s => s !== service));
        } else {
            setAdditionalServices([...additionalServices, service]);
        }
    };
// Gestion de la navigation entre les étapes
    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        } else {
            setShowSummary(true);
        }
    };
    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
// Formater la date pour l'affichage
    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
    };
// Données pour les listes déroulantes
    const carBrands = ['Renault', 'Peugeot', 'Citroën', 'Volkswagen', 'BMW', 'Mercedes', 'Audi', 'Toyota', 'Ford', 'Fiat'];
    const carModels: {[key: string]: string[]} = {
        'Renault': ['Clio', 'Mégane', 'Captur', 'Kadjar', 'Scénic', 'Talisman'],
        'Peugeot': ['208', '308', '3008', '5008', '508', '2008'],
        'Citroën': ['C3', 'C4', 'C5', 'Berlingo', 'C3 Aircross', 'C5 Aircross'],
        'Volkswagen': ['Golf', 'Polo', 'Passat', 'Tiguan', 'T-Roc', 'Touran'],
        'BMW': ['Série 1', 'Série 3', 'Série 5', 'X1', 'X3', 'X5'],
        'Mercedes': ['Classe A', 'Classe C', 'Classe E', 'GLA', 'GLC', 'GLE'],
        'Audi': ['A1', 'A3', 'A4', 'A6', 'Q3', 'Q5'],
        'Toyota': ['Yaris', 'Corolla', 'C-HR', 'RAV4', 'Prius', 'Auris'],
        'Ford': ['Fiesta', 'Focus', 'Kuga', 'Puma', 'Mondeo', 'EcoSport'],
        'Fiat': ['500', 'Panda', 'Tipo', '500X', 'Punto', 'Doblo']
    };
    const years = Array.from({ length: 25 }, (_, i) => (new Date().getFullYear() - i).toString());
// Estimation du temps et du coût
    const getServiceTime = () => {
        const baseTime = {
            'Révision standard': '1h30',
            'Vidange et filtres': '1h',
            'Freins': '2h',
            'Diagnostic électronique': '1h',
            'Climatisation': '1h30',
            'Suspension': '2h30'
        }[selectedService] || '1h';
        let additionalTime = 0;
        additionalServices.forEach(service => {
            switch(service) {
                case 'Contrôle des niveaux':
                    additionalTime += 15;
                    break;
                case 'Contrôle des pneus':
                    additionalTime += 20;
                    break;
                case 'Vérification batterie':
                    additionalTime += 15;
                    break;
                case 'Nettoyage intérieur':
                    additionalTime += 45;
                    break;
            }
        });
        const baseMinutes = parseInt(baseTime.split('h')[0]) * 60 + (baseTime.includes('30') ? 30 : 0);
        const totalMinutes = baseMinutes + additionalTime;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? minutes : ''}`;
    };
    const getServiceCost = () => {
        const baseCost = {
            'Révision standard': 120,
            'Vidange et filtres': 80,
            'Freins': 150,
            'Diagnostic électronique': 60,
            'Climatisation': 90,
            'Suspension': 180
        }[selectedService] || 100;
        let additionalCost = 0;
        additionalServices.forEach(service => {
            switch(service) {
                case 'Contrôle des niveaux':
                    additionalCost += 15;
                    break;
                case 'Contrôle des pneus':
                    additionalCost += 20;
                    break;
                case 'Vérification batterie':
                    additionalCost += 25;
                    break;
                case 'Nettoyage intérieur':
                    additionalCost += 45;
                    break;
            }
        });
        return baseCost + additionalCost;
    };
// Confirmer le rendez-vous
    const confirmAppointment = () => {
        alert('Votre rendez-vous a été confirmé ! Vous recevrez un email de confirmation.');
// Réinitialiser le formulaire
        setCurrentStep(1);
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedService('');
        setAdditionalServices([]);
        setVehicleBrand('');
        setVehicleModel('');
        setVehicleYear('');
        setMileage('');
        setFirstName('');
        setLastName('');
        setPhone('');
        setComments('');
        setNeedsDelivery(false);
        setDeliveryAddress('');
        setDeliveryCity('');
        setShowSummary(false);
    };

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
                                className="whitespace-nowrap cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 !rounded-button"
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
            <main className="py-8 min-h-[calc(100vh-64px-300px)]">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">Prendre un rendez-vous</h1>
                            <p className="text-gray-600 mb-8">Planifiez votre entretien ou réparation en quelques étapes simples</p>
                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between">
                                    {['Service', 'Véhicule', 'Date & Heure', 'Informations'].map((step, index) => (
                                        <div key={index} className="flex flex-col items-center w-1/4">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                                                    currentStep > index + 1 ? 'bg-green-500 text-white' :
                                                        currentStep === index + 1 ? 'bg-blue-600 text-white' :
                                                            'bg-gray-200 text-gray-500'
                                                }`}
                                            >
                                                {currentStep > index + 1 ? (
                                                    <i className="fas fa-check"></i>
                                                ) : (
                                                    index + 1
                                                )}
                                            </div>
                                            <span className={`text-sm ${currentStep === index + 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
{step}
</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="relative mt-2">
                                    <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
                                    <div
                                        className="absolute top-0 h-1 bg-blue-600 transition-all duration-300"
                                        style={{ width: `${(currentStep - 1) * 33.33}%` }}
                                    ></div>
                                </div>
                            </div>
                            {/* Form Steps */}
                            {!showSummary ? (
                                <>
                                    {/* Step 1: Service Selection */}
                                    {currentStep === 1 && (
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sélectionnez votre service</h2>
                                            <div className="mb-6">
                                                <label className="block text-gray-700 font-medium mb-2">Type de service principal</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {['Révision standard', 'Vidange et filtres', 'Freins', 'Diagnostic électronique', 'Climatisation', 'Suspension'].map((service) => (
                                                        <div
                                                            key={service}
                                                            onClick={() => setSelectedService(service)}
                                                            className={`cursor-pointer border rounded-lg p-4 transition-all ${
                                                                selectedService === service
                                                                    ? 'border-blue-500 bg-blue-50'
                                                                    : 'border-gray-200 hover:border-blue-300'
                                                            }`}
                                                        >
                                                            <div className="flex items-center">
                                                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                                                                    selectedService === service
                                                                        ? 'border-blue-500'
                                                                        : 'border-gray-300'
                                                                }`}>
                                                                    {selectedService === service && (
                                                                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                                                    )}
                                                                </div>
                                                                <span className="text-gray-700">{service}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="mb-6">
                                                <label className="block text-gray-700 font-medium mb-2">Services additionnels (optionnel)</label>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {['Contrôle des niveaux', 'Contrôle des pneus', 'Vérification batterie', 'Nettoyage intérieur'].map((service) => (
                                                        <div
                                                            key={service}
                                                            className="flex items-center"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={`service-${service}`}
                                                                checked={additionalServices.includes(service)}
                                                                onChange={() => toggleAdditionalService(service)}
                                                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                            />
                                                            <label
                                                                htmlFor={`service-${service}`}
                                                                className="ml-3 text-gray-700 cursor-pointer"
                                                            >
                                                                {service}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* Step 2: Vehicle Information */}
                                    {currentStep === 2 && (
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations sur votre véhicule</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="brand" className="block text-gray-700 font-medium mb-2">Marque</label>
                                                    <div className="relative">
                                                        <select
                                                            id="brand"
                                                            value={vehicleBrand}
                                                            onChange={(e) => {
                                                                setVehicleBrand(e.target.value);
                                                                setVehicleModel('');
                                                            }}
                                                            className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                                            required
                                                        >
                                                            <option value="">Sélectionnez une marque</option>
                                                            {carBrands.map((brand) => (
                                                                <option key={brand} value={brand}>{brand}</option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                            <i className="fas fa-chevron-down text-gray-400"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="model" className="block text-gray-700 font-medium mb-2">Modèle</label>
                                                    <div className="relative">
                                                        <select
                                                            id="model"
                                                            value={vehicleModel}
                                                            onChange={(e) => setVehicleModel(e.target.value)}
                                                            className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                                            required
                                                            disabled={!vehicleBrand}
                                                        >
                                                            <option value="">Sélectionnez un modèle</option>
                                                            {vehicleBrand && carModels[vehicleBrand]?.map((model) => (
                                                                <option key={model} value={model}>{model}</option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                            <i className="fas fa-chevron-down text-gray-400"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="year" className="block text-gray-700 font-medium mb-2">Année</label>
                                                    <div className="relative">
                                                        <select
                                                            id="year"
                                                            value={vehicleYear}
                                                            onChange={(e) => setVehicleYear(e.target.value)}
                                                            className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                                            required
                                                        >
                                                            <option value="">Sélectionnez une année</option>
                                                            {years.map((year) => (
                                                                <option key={year} value={year}>{year}</option>
                                                            ))}
                                                        </select>
                                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                            <i className="fas fa-chevron-down text-gray-400"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="mileage" className="block text-gray-700 font-medium mb-2">Kilométrage</label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            id="mileage"
                                                            value={mileage}
                                                            onChange={(e) => {
// Accepter uniquement les chiffres
                                                                const value = e.target.value.replace(/\D/g, '');
                                                                setMileage(value);
                                                            }}
                                                            placeholder="Ex: 45000"
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            required
                                                        />
                                                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                                            <span className="text-gray-500">km</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* Step 3: Date and Time Selection */}
                                    {currentStep === 3 && (
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Choisissez une date et un horaire</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="md:col-span-2">
                                                    <label className="block text-gray-700 font-medium mb-2">Sélectionnez une date</label>
                                                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                                                        <div className="grid grid-cols-7 gap-1 mb-2">
                                                            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
                                                                <div key={index} className="text-center text-sm font-medium text-gray-500">
                                                                    {day}
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="grid grid-cols-7 gap-1">
                                                            {/* Remplir les jours vides au début du mois */}
                                                            {calendarDates[0] && Array.from({ length: calendarDates[0].getDay() === 0 ? 6 : calendarDates[0].getDay() - 1 }).map((_, index) => (
                                                                <div key={`empty-${index}`} className="h-10"></div>
                                                            ))}
                                                            {calendarDates.map((date, index) => {
                                                                const dateString = date.toISOString().split('T')[0];
                                                                const isSelected = selectedDate && selectedDate.toISOString().split('T')[0] === dateString;
                                                                const isToday = new Date().toISOString().split('T')[0] === dateString;
                                                                const hasAvailableSlots = !(bookedSlots[dateString]?.length === timeSlots.length);
                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        onClick={() => hasAvailableSlots && setSelectedDate(date)}
                                                                        className={`h-10 flex items-center justify-center rounded-full cursor-pointer text-sm ${
                                                                            isSelected
                                                                                ? 'bg-blue-600 text-white'
                                                                                : isToday
                                                                                    ? 'border border-blue-300 text-blue-600'
                                                                                    : hasAvailableSlots
                                                                                        ? 'hover:bg-blue-50'
                                                                                        : 'text-gray-300 cursor-not-allowed'
                                                                        }`}
                                                                    >
                                                                        {date.getDate()}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 font-medium mb-2">Horaires disponibles</label>
                                                    <div className="bg-white border border-gray-200 rounded-lg p-4 h-[300px] overflow-y-auto">
                                                        {selectedDate ? (
                                                            <div className="space-y-2">
                                                                {timeSlots.map((time, index) => {
                                                                    const isAvailable = isTimeSlotAvailable(selectedDate, time);
                                                                    const isSelected = selectedTime === time;
                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            onClick={() => isAvailable && setSelectedTime(time)}
                                                                            className={`p-2 rounded-md cursor-pointer text-center ${
                                                                                isSelected
                                                                                    ? 'bg-blue-600 text-white'
                                                                                    : isAvailable
                                                                                        ? 'hover:bg-blue-50 border border-gray-200'
                                                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                                            }`}
                                                                        >
                                                                            {time}
                                                                            {!isAvailable && (
                                                                                <span className="ml-2 text-xs">
<i className="fas fa-times-circle"></i> Indisponible
</span>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        ) : (
                                                            <div className="h-full flex items-center justify-center text-gray-500">
                                                                <p>Veuillez sélectionner une date</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* Step 4: Customer Information */}
                                    {currentStep === 4 && (
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Vos informations</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">Prénom</label>
                                                    <input
                                                        type="text"
                                                        id="firstName"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Nom</label>
                                                    <input
                                                        type="text"
                                                        id="lastName"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                                                    <input
                                                        type="email"
                                                        id="customerEmail"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Téléphone</label>
                                                    <input
                                                        type="tel"
                                                        id="phone"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        placeholder="Ex: 06 12 34 56 78"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>
                                                <div className="md:col-span-2 space-y-6">
                                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <h4 className="font-medium text-gray-800">Option de livraison</h4>
                                                                <p className="text-sm text-gray-500 mt-1">Nous pouvons livrer votre véhicule à l'adresse de votre choix</p>
                                                            </div>
                                                            <div className="flex items-center space-x-4">
                                                                <span className="text-sm font-medium text-gray-600">+30 €</span>
                                                                <label className="relative inline-flex items-center cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="sr-only peer"
                                                                        checked={needsDelivery}
                                                                        onChange={(e) => setNeedsDelivery(e.target.checked)}
                                                                    />
                                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {needsDelivery && (
                                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">Adresse de livraison</label>
                                                                    <input
                                                                        type="text"
                                                                        id="deliveryAddress"
                                                                        value={deliveryAddress}
                                                                        onChange={(e) => setDeliveryAddress(e.target.value)}
                                                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        placeholder="123 rue de la République"
                                                                        required={needsDelivery}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="deliveryCity" className="block text-sm font-medium text-gray-700">Ville</label>
                                                                    <input
                                                                        type="text"
                                                                        id="deliveryCity"
                                                                        value={deliveryCity}
                                                                        onChange={(e) => setDeliveryCity(e.target.value)}
                                                                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                        placeholder="Paris"
                                                                        required={needsDelivery}
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label htmlFor="comments" className="block text-gray-700 font-medium mb-2">Commentaires ou besoins spécifiques (optionnel)</label>
                                                        <textarea
                                                            id="comments"
                                                            value={comments}
                                                            onChange={(e) => setComments(e.target.value)}
                                                            rows={4}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        ></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* Navigation Buttons */}
                                    <div className="mt-8 flex justify-between">
                                        {currentStep > 1 && (
                                            <button
                                                onClick={prevStep}
                                                className="whitespace-nowrap cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 !rounded-button"
                                            >
                                                <i className="fas fa-arrow-left mr-2"></i>
                                                Précédent
                                            </button>
                                        )}
                                        <div className="ml-auto">
                                            <button
                                                onClick={nextStep}
                                                disabled={
                                                    (currentStep === 1 && !selectedService) ||
                                                    (currentStep === 2 && (!vehicleBrand || !vehicleModel || !vehicleYear || !mileage)) ||
                                                    (currentStep === 3 && (!selectedDate || !selectedTime)) ||
                                                    (currentStep === 4 && (!firstName || !lastName || !email || !phone))
                                                }
                                                className={`whitespace-nowrap cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 !rounded-button ${
                                                    (currentStep === 1 && !selectedService) ||
                                                    (currentStep === 2 && (!vehicleBrand || !vehicleModel || !vehicleYear || !mileage)) ||
                                                    (currentStep === 3 && (!selectedDate || !selectedTime)) ||
                                                    (currentStep === 4 && (!firstName || !lastName || !email || !phone))
                                                        ? 'opacity-50 cursor-not-allowed'
                                                        : ''
                                                }`}
                                            >
                                                {currentStep < 4 ? 'Suivant' : 'Récapitulatif'}
                                                <i className="fas fa-arrow-right ml-2"></i>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Récapitulatif de votre rendez-vous</h2>
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-800">Informations du rendez-vous</h3>
                                            </div>
                                            <div className="text-blue-600">
                                                <i className="fas fa-calendar-check text-2xl"></i>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Date</p>
                                                <p className="font-medium text-gray-800">{selectedDate ? formatDate(selectedDate) : ''}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Heure</p>
                                                <p className="font-medium text-gray-800">{selectedTime}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Service principal</p>
                                                <p className="font-medium text-gray-800">{selectedService}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Durée estimée</p>
                                                <p className="font-medium text-gray-800">{getServiceTime()}</p>
                                            </div>
                                        </div>
                                        {additionalServices.length > 0 && (
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-500">Services additionnels</p>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {additionalServices.map((service, index) => (
                                                        <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
{service}
</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-medium text-gray-800">Informations véhicule</h3>
                                                <div className="text-gray-500">
                                                    <i className="fas fa-car text-2xl"></i>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Marque:</span>
                                                    <span className="font-medium text-gray-800">{vehicleBrand}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Modèle:</span>
                                                    <span className="font-medium text-gray-800">{vehicleModel}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Année:</span>
                                                    <span className="font-medium text-gray-800">{vehicleYear}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Kilométrage:</span>
                                                    <span className="font-medium text-gray-800">{mileage} km</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-medium text-gray-800">Vos coordonnées</h3>
                                                <div className="text-gray-500">
                                                    <i className="fas fa-user text-2xl"></i>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Nom complet:</span>
                                                    <span className="font-medium text-gray-800">{firstName} {lastName}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Email:</span>
                                                    <span className="font-medium text-gray-800">{email}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Téléphone:</span>
                                                    <span className="font-medium text-gray-800">{phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {comments && (
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                                            <div className="flex items-center mb-2">
                                                <i className="fas fa-comment-alt text-gray-500 mr-2"></i>
                                                <h3 className="text-lg font-medium text-gray-800">Commentaires</h3>
                                            </div>
                                            <p className="text-gray-700">{comments}</p>
                                        </div>
                                    )}
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-medium text-gray-800">Estimation</h3>
                                            <div className="text-gray-500">
                                                <i className="fas fa-receipt text-2xl"></i>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">{selectedService}</span>
                                                <span className="font-medium text-gray-800">{getServiceCost() - additionalServices.length * 15} €</span>
                                            </div>
                                            {additionalServices.map((service, index) => (
                                                <div key={index} className="flex justify-between">
                                                    <span className="text-gray-500">{service}</span>
                                                    <span className="font-medium text-gray-800">15 €</span>
                                                </div>
                                            ))}
                                            {needsDelivery && (
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Service de livraison</span>
                                                    <span className="font-medium text-gray-800">30 €</span>
                                                </div>
                                            )}
                                            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                                                <span className="font-medium text-gray-800">Total estimé</span>
                                                <span className="font-bold text-blue-600 text-xl">{getServiceCost() + (needsDelivery ? 30 : 0)} €</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-2">
                                                * Cette estimation peut varier en fonction des pièces nécessaires et des travaux supplémentaires identifiés lors du diagnostic.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
                                        <button
                                            onClick={() => setShowSummary(false)}
                                            className="whitespace-nowrap cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 !rounded-button mb-4 md:mb-0 w-full md:w-auto"
                                        >
                                            <i className="fas fa-edit mr-2"></i>
                                            Modifier
                                        </button>
                                        <button
                                            onClick={confirmAppointment}
                                            className="whitespace-nowrap cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 !rounded-button w-full md:w-auto"
                                        >
                                            <i className="fas fa-check-circle mr-2"></i>
                                            Confirmer le rendez-vous
                                        </button>
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

export default RendezvousPage
