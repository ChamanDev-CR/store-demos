// app/api/weather/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const q = searchParams.get("q");

    const key = "39d83a41f7e6d68963e5ce716479871f"; 
    if (!key) {
        return NextResponse.json({ message: "Missing OWM_KEY_SERVER" }, { status: 500 });
    }

    const base = "https://api.openweathermap.org/data/2.5/weather";
    const url = q
        ? `${base}?q=${encodeURIComponent(q)}&appid=${key}&units=metric&lang=es`
        : `${base}?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=es`;

    const r = await fetch(url, { cache: "no-store" });
    const json = await r.json();
    return NextResponse.json(json, { status: r.status });
}
