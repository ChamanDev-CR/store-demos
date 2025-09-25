"use client";
import { createContext, useContext, useState } from "react";

// Shape of the filters used across the application
type Filters = { q: string; category: string };
type FilterCtx = Filters & { setQ: (q: string) => void; setCategory: (c: string) => void };

// React context that stores the current filters
const Ctx = createContext<FilterCtx | null>(null);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");
    return <Ctx.Provider value={{ q, category, setQ, setCategory }}>{children}</Ctx.Provider>;
};

// Hook to consume the filter context
export const useFilters = () => {
    const v = useContext(Ctx);
    if (!v) throw new Error("useFilters must be used within FilterProvider");
    return v;
};

