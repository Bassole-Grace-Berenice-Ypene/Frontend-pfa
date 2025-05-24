export interface Service {
    id: number;
    icon: string;  // Nom de l'icône stocké en base de données
    title: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
} 