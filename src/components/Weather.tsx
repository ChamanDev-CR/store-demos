// components/Weather.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
// Helpers that call the OpenWeatherMap API
import { getWeatherByCity, getWeatherByCoords } from "@/lib/weather";

type WData = { name: string; main: { temp: number }; weather?: { icon: string }[] };

// Small component that tries to show the current weather using
// the browser geolocation API or a couple of fallback cities
export default function Weather() {
    const [data, setData] = useState<WData | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Request weather information by geographic coordinates
    const loadByCoords = async (lat: number, lon: number) => {
        try {
            const { data } = await getWeatherByCoords(lat, lon);
            setData(data);
        } catch (error) {
            console.error('Error cargando clima', error);
        }
    };

    // Request weather by a city name string
    const loadByCity = async (city: string) => {
        try {
            const { data } = await getWeatherByCity(city);
            setData(data);
        } catch (error) {
            console.error('Error cargando clima', error);
        }
    };

    useEffect(() => {
        (async () => {
            try {
                if (typeof window !== "undefined" && navigator.geolocation) {
                    // Try to obtain user coordinates; resolve after attempt
                    await new Promise<void>((resolve) => {
                        navigator.geolocation.getCurrentPosition(
                            (pos) => { loadByCoords(pos.coords.latitude, pos.coords.longitude).finally(resolve); },
                            () => resolve(),
                            { timeout: 7000 }
                        );
                    });
                } else {
                    // Fallback to a couple of Costa Rican cities and a default coordinate
                    try { await loadByCity("San Jose,cr"); return; } catch { }
                    try { await loadByCity("Alajuela,cr"); return; } catch { }
                    await loadByCoords(9.9281, -84.0907);
                }
            } catch (e: any) {
                setError(e?.message || "No se pudo obtener el clima");
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!data && !error) return <span className="navbar-text text-light small">Clima: cargando…</span>;
    if (error) return <span className="navbar-text text-light small">Clima no disponible</span>;

    const temp = Math.round(data!.main.temp);
    const icon = data!.weather?.[0]?.icon ?? "01d";
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
        <span className="navbar-text text-light d-flex align-items-center gap-2 small">
            <Image src={iconUrl} alt="icono clima" width={28} height={28} />
            <span>{data!.name}: {temp}°C</span>
        </span>
    );
}
