import type { Metadata } from "next";
// Global styles for Bootstrap and custom CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

// Global providers and layout components
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BootstrapClient from "@/components/BootstrapClient";

// Metadata leveraged by Next.js for the entire app
export const metadata: Metadata = {
    title: "Grupo Pampa TEST B2C",
    description: "Online Store Test",
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
                <BootstrapClient />
                <div className="container">
                    {/* Authentication and cart contexts available throughout the app */}
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

