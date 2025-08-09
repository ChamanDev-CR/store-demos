// Definición de tipo para los productos devueltos por la API de Fake Store
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating?: {
        rate: number;
        count: number;
    };
}

