import axios from 'axios';

// Instancia de Axios para la API Fake Store utilizada en toda la aplicación
const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const getProducts = () => api.get('/products');
export const getProductById = (id: string) => api.get(`/products/${id}`);
export const getCategories = () => api.get('/products/categories');
export const getProductsByCategory = (category: string) => api.get(`/products/category/${category}`);

