"use client";
import { useEffect, useState } from "react";
// API helper that fetches available product categories
import { getCategories } from "@/lib/api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

// Component that renders a category selector and a search box
export default function ProductFilter({ onFilter }: { onFilter?: (filters: { q: string; category: string }) => void }) {
    const [categories, setCategories] = useState<string[]>([]);
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("");

    // Load the category list once when the component mounts
    useEffect(() => {
        getCategories().then(({ data }) => setCategories(data)).catch(() => setCategories([]));
    }, []);

    // Notify the parent component whenever any filter changes
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
                    <p>This is a development test</p>
                </div>
            </div>
            <div className="col-12 col-md-8 box-filter">
                <div className="p-4">
                    <label>SEARCH ALL PRODUCTS</label>
                    <form className="row g-0">
                        <div className="col-12 col-md-4">
                            <select
                                className="form-select"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">All categories</option>
                                {categories.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 col-md-8">
                            <input
                                className="form-control"
                                type="search"
                                placeholder="Search by name"
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
