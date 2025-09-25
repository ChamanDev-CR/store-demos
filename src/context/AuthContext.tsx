"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Type representing the authenticated user, if any
export type AuthUser = { id: number; username: string; name: string; email: string } | null;

type AuthCtx = {
    user: AuthUser;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
};

// Create the actual context
const Ctx = createContext<AuthCtx | null>(null);

// Hook to consume the authentication context
export const useAuth = () => {
    const v = useContext(Ctx);
    if (!v) throw new Error("useAuth must be used within AuthProvider");
    return v;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser>(null);

    // Hydrate the user from localStorage on the first render
    useEffect(() => {
        try {
            const raw = localStorage.getItem("auth:user");
            if (raw) setUser(JSON.parse(raw));
        } catch { }
    }, []);

    // Persist user changes to localStorage
    useEffect(() => {
        try {
            if (user) localStorage.setItem("auth:user", JSON.stringify(user));
            else localStorage.removeItem("auth:user");
        } catch { }
    }, [user]);

    // Validate the credentials against the local users.json file
    const login = async (username: string, password: string) => {
        try {
            const res = await fetch("/users.json", { cache: "no-store" });
            const users: any[] = await res.json();
            const found = users.find(
                (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
            );
            if (found) {
                const payload = { id: found.id, username: found.username, name: found.name, email: found.email };
                setUser(payload);
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    const logout = () => setUser(null);

    return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
};
