import type { Metadata } from "next";
// Global styles for bootstrap and custom CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

// Global providers and layout components
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Metadata used by Next.js for the entire application
export const metadata: Metadata = {
    title: "Grupo Pampa TEST B2C",
    description: "Tienda Online Test",
};

// RootLayout wraps every page with shared providers and components
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div className="container">
                    {/* Authentication and cart context available app-wide */}
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

