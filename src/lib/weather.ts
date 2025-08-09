import axios from 'axios';

// Instancia base de Axios configurada para la API de OpenWeatherMap
const API_KEY = "39d83a41f7e6d68963e5ce716479871f";

const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
});

// Solicita el clima actual por nombre de ciudad
export const getWeatherByCity = (city: string) =>
    weatherApi.get('/weather', {
        params: {
            q: city,
            appid: API_KEY,
        },
    });

// Solicita el clima actual por coordenadas geográficas
export const getWeatherByCoords = (lat: number, lon: number) =>
    weatherApi.get('/weather', {
        params: {
            lat,
            lon,
            appid: API_KEY,
        },
    });

