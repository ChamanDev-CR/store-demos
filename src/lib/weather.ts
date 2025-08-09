import axios from 'axios';

const API_KEY = "39d83a41f7e6d68963e5ce716479871f";

const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const getWeatherByCity = (city: string) =>
    weatherApi.get('/weather', {
        params: {
            q: city,
            appid: API_KEY,
        },
    });

export const getWeatherByCoords = (lat: number, lon: number) =>
    weatherApi.get('/weather', {
        params: {
            lat,
            lon,
            appid: API_KEY,
        },
    });