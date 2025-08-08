import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Grupo Pampa TEST B2C",
    description: "Tienda Online Test",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div className="container">
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
