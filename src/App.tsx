import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AcceuilPage from './pages/AcceuilPage';
import ServicePage from './pages/ServicePage';
import RendezvousPage from './pages/RendezvousPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/global.css';

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<AcceuilPage />} />
                        <Route path="/services" element={<ServicePage />} />
                        <Route path="/rendez-vous" element={<RendezvousPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
