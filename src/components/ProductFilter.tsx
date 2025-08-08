"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/api";

export default function ProductFilter({ onFilter }: { onFilter?: (filters: { q: string; category: string }) => void }) {
    const { cart } = useCart();
    const { user, logout } = useAuth();
    const [categories, setCategories] = useState<string[]>([]);
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        getCategories().then(({ data }) => setCategories(data)).catch(() => setCategories([]));
    }, []);

    useEffect(() => {
        if (onFilter) {
            onFilter({ q, category });
        }
    }, [q, category]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="d-flex ms-auto me-3">
                        <select
                            className="form-select me-2"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Todas las categorías</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Buscar por nombre"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
