"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type AuthUser = { id: number; username: string; name: string; email: string } | null;

type AuthCtx = {
    user: AuthUser;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export const useAuth = () => {
    const v = useContext(Ctx);
    if (!v) throw new Error("useAuth must be used within AuthProvider");
    return v;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser>(null);

    // hidratar desde localStorage
    useEffect(() => {
        try {
            const raw = localStorage.getItem("auth:user");
            if (raw) setUser(JSON.parse(raw));
        } catch { }
    }, []);

    // persistir user
    useEffect(() => {
        try {
            if (user) localStorage.setItem("auth:user", JSON.stringify(user));
            else localStorage.removeItem("auth:user");
        } catch { }
    }, [user]);

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