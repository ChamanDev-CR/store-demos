"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
// Context providers for authentication and cart data
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

// Simple login page that authenticates a user from a local list
export default function LoginPage() {
    const { login } = useAuth();
    const { cart } = useCart();
    const router = useRouter();

    // Local state for the form fields and UI helpers
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Attempt to authenticate using the AuthContext login method
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const ok = await login(username, password);
        setLoading(false);
        if (ok) {
            // Redirect user to the cart if items exist, otherwise go to home
            if (cart.length > 0) router.push("/cart");
            else router.push("/");
        } else {
            // Show a generic error when credentials are invalid
            setError("Usuario o contraseña inválidos");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow-lg card-login">
                <h2 className="text-center mb-4">Iniciar sesión</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input
                            type="text"
                            placeholder="Usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    {error && <div className="alert alert-danger py-2">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Ingresando…" : "Ingresar"}
                    </button>
                </form>
                <div className="text-muted small mt-3 mb-0">
                    Demo: 
                    <ul>
                        <li>admin / 1234</li>
                        <li>maria / maria123</li>
                        <li>juan / juan123</li>
                        <li>cristian / pass2025</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
