"use client";
import { useEffect, useState } from "react";
// API helper that fetches available product categories
import { getCategories } from "@/lib/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// Component that renders a category selector and search box
export default function ProductFilter({ onFilter }: { onFilter?: (filters: { q: string; category: string }) => void }) {
    const [categories, setCategories] = useState<string[]>([]);
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");

    // Load list of categories once when component mounts
    useEffect(() => {
        getCategories().then(({ data }) => setCategories(data)).catch(() => setCategories([]));
    }, []);

    // Notify parent component when any filter changes
    useEffect(() => {
        if (onFilter) {
            onFilter({ q, category });
        }
    }, [q, category]);

    return (
        <div className="row gx-4 gy-4">
            <div className="col-12 col-md-4 box-text">
                <div className="p-4">
                    <p><b><FontAwesomeIcon icon={faPhone} /> 8540-6440 - 8485-5114</b></p>
                    <p><FontAwesomeIcon icon={faEnvelope} /> cristianmb13@gmail.com</p>
                    <p>Este es una prueba de desarrollo</p>
                </div>
            </div>
            <div className="col-12 col-md-8 box-filter">
                <div className="p-4">
                    <label>BUSCAR EN TODOS LOS PRODUCTOS</label>
                    <form className="row g-0">
                        <div className="col-12 col-md-4">
                            <select
                                className="form-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Todas las categorías</option>
                                {categories.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 col-md-8">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Buscar por nombre"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
