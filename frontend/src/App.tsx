import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AcceuilPage from './pages/AcceuilPage';
import ServicePage from './pages/ServicePage';
import RendezvousPage from './pages/RendezvousPage';
//import AcceuilPage from "./pages/AcceuilPage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AcceuilPage />} />
                <Route path="/services" element={<ServicePage />} />
                <Route path="/Rendez-vous" element={<RendezvousPage />} />
            </Routes>
        </Router>
    );
};

export default App;