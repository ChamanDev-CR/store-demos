"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = () => {
        if (login(username, password)) {
            router.push("/");
        } else {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
            <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full mb-2"
            />
            <button onClick={handleLogin} className="bg-blue-600 text-white px-4 py-2 w-full">
                Iniciar sesión
            </button>
        </div>
    );
}