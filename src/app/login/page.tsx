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

    // Local state for form fields and UI helpers
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Authentication attempt using the AuthContext login method
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const ok = await login(username, password);
        setLoading(false);
        if (ok) {
            // Redirects the user to the cart if there are items, otherwise go to the homepage
            if (cart.length > 0) router.push("/cart");
            else router.push("/");
        } else {
            // Show a generic error when credentials are invalid
            setError("Invalid username or password");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow-lg card-login">
                <h2 className="text-center mb-4">Sign in</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    {error && <div className="alert alert-danger py-2">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Signing in…" : "Sign in"}
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
