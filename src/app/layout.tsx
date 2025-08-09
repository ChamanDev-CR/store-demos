import type { Metadata } from "next";
// Estilos globales para Bootstrap y CSS personalizado
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

// Proveedores globales y componentes de layout
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BootstrapClient from "@/components/BootstrapClient";

// Metadatos utilizados por Next.js para toda la aplicación
export const metadata: Metadata = {
    title: "Grupo Pampa TEST B2C",
    description: "Tienda Online Test",
};

// RootLayout envuelve cada página con proveedores y componentes compartidos
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <BootstrapClient />
                <div className="container">
                    {/* Contextos de autenticación y carrito disponibles en toda la aplicación */}
                    <AuthProvider>
                        <CartProvider>
                            <Navbar />
                            {children}
                            <Footer />
                        </CartProvider>
                    </AuthProvider>
                </div>
            </body>
        </html>
    );
}

