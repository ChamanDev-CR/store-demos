"use client";
import { createContext, useContext, useState } from "react";

// Forma de los filtros utilizados en toda la aplicación
type Filters = { q: string; category: string };
type FilterCtx = Filters & { setQ: (q: string) => void; setCategory: (c: string) => void };

// Contexto de React que almacena los filtros actuales
const Ctx = createContext<FilterCtx | null>(null);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");
    return <Ctx.Provider value={{ q, category, setQ, setCategory }}>{children}</Ctx.Provider>;
};

// Hook para consumir el contexto de filtros
export const useFilters = () => {
    const v = useContext(Ctx);
    if (!v) throw new Error("useFilters must be used within FilterProvider");
    return v;
};

