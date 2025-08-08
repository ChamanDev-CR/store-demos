"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { cart } = useCart();
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link href="/" className="navbar-brand">🛒 GPTestStore</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link href="/cart" className="nav-link">Carrito ({cart.length})</Link>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">Hola, {user}</span>
                                </li>
                                <li className="nav-item">
                                    <button onClick={logout} className="btn btn-outline-light btn-sm ms-2">Salir</button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link href="/login" className="nav-link">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
