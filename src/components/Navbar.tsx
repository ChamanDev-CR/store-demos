"use client";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import Weather from "@/components/Weather";

export default function Navbar() {
    const { cart } = useCart();
    const { user, logout } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link href="/" className="navbar-brand"><FontAwesomeIcon icon={faShoppingBag} /> GPTestStore</Link>
                <Weather />
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
                        {user && (
                            <li className="nav-item">
                                <span className="nav-link">Hola, {user.name}</span>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link href="/cart" className="nav-link">
                                <FontAwesomeIcon icon={faShoppingCart} /> Carrito ({cart.length})
                            </Link>
                        </li>
                        {user ? (
                            <li className="nav-item">
                                <button onClick={logout} className=" nav-link">Logout</button>
                            </li>
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
