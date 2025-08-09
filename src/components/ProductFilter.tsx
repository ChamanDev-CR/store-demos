"use client";
import { useEffect, useState } from "react";
// Helper de API que obtiene las categorías de productos disponibles
import { getCategories } from "@/lib/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// Componente que renderiza un selector de categoría y un cuadro de búsqueda
export default function ProductFilter({ onFilter }: { onFilter?: (filters: { q: string; category: string }) => void }) {
    const [categories, setCategories] = useState<string[]>([]);
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");

    // Carga la lista de categorías una vez cuando el componente se monta
    useEffect(() => {
        getCategories().then(({ data }) => setCategories(data)).catch(() => setCategories([]));
    }, []);

    // Notifica al componente padre cuando cualquier filtro cambia
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
