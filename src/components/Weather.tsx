// components/Weather.tsx
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type WData = { name: string; main: { temp: number }; weather?: { icon: string }[] };

export default function Weather() {
    const [data, setData] = useState<WData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const loadByCoords = async (lat: number, lon: number) => {
        const res = await fetch(`/lib/weather?lat=${lat}&lon=${lon}`, { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || `HTTP ${res.status}`);
        setData(json);
    };

    const loadByCity = async (city: string) => {
        const res = await fetch(`/lib/weather?q=${encodeURIComponent(city)}`, { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.message || `HTTP ${res.status}`);
        setData(json);
    };

    useEffect(() => {
        (async () => {
            try {
                if (typeof window !== "undefined" && navigator.geolocation) {
                    await new Promise<void>((resolve) => {
                        navigator.geolocation.getCurrentPosition(
                            (pos) => { loadByCoords(pos.coords.latitude, pos.coords.longitude).finally(resolve); },
                            () => resolve(),
                            { timeout: 7000 }
                        );
                    });
                }
                if (!data) {
                    try { await loadByCity("San Jose,CR"); return; } catch { }
                    try { await loadByCity("San José,CR"); return; } catch { }
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
