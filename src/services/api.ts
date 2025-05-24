import axios from 'axios';
import { Service } from '../types/service';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

interface ApiResponse<T> {
    data: T;
}

export const serviceApi = {
    // Récupérer tous les services
    getAllServices: async (): Promise<Service[]> => {
        try {
            const response = await axios.get<ApiResponse<Service[]>>(`${API_URL}/services`);
            return response.data.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des services:', error);
            throw error;
        }
    },

    // Récupérer un service par son ID
    getServiceById: async (id: number): Promise<Service> => {
        try {
            const response = await axios.get<ApiResponse<Service>>(`${API_URL}/services/${id}`);
            return response.data.data;
        } catch (error) {
            console.error(`Erreur lors de la récupération du service ${id}:`, error);
            throw error;
        }
    }
}; 