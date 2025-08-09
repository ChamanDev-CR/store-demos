"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// Estado global del carrito y la autenticación
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
// Componente de pago usado una vez que el usuario está autenticado
import Checkout from "@/components/Checkout";

// Muestra el carrito de compras actual con un resumen de compra
export default function CartPage() {
    const { cart, removeFromCart } = useCart();
    const [coupon, setCoupon] = useState("");
    const { user, logout } = useAuth();

    // Calcula el subtotal y los totales para los artículos actuales
    const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
    const shipping = cart.length > 0 ? 5 : 0;
    const total = subtotal + shipping;

    return (
        <>
            <h1 className="title-resumen">RESUMEN DEL CARRITO DE COMPRAS</h1>
            <p className="mb-4">Su carrito contiene: {cart.length} producto(s)</p>

            <div className="overflow-x-auto">
                <table className="border table-products">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Descripción</th>
                            <th className="p-2 text-center">Disponibilidad</th>
                            <th className="p-2 text-center">Precio unitario</th>
                            <th className="p-2 text-center">Cantidad</th>
                            <th className="p-2 text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.id} className="border-t">
                                <td className="p-2">
                                    <Image src={item.image} alt={item.title} width={80} height={80} className="object-contain" />
                                </td>
                                <td className="p-2">
                                    <strong>{item.title}</strong>
                                    <p className="text-gray-500 text-xs">SKU: PROD-{item.id}</p>
                                    <p className="text-gray-500 text-xs">Marca: Genérica</p>
                                </td>
                                <td className="p-2 text-center">En stock</td>
                                <td className="p-2 text-center">$ {item.price.toLocaleString()}</td>
                                {/* La cantidad se fija en 1 en este ejemplo sencillo */}
                                <td className="p-2 text-center">1</td>
                                <td className="p-2 text-center">$ {item.price.toLocaleString()}</td>
                            </tr>
                        ))}

                        {/* <tr className="border-t">
                            <td className="p-2" colSpan={6}>
                                <div className="flex items-center gap-2">
                                    <div>VALES</div>
                                    <div className="row g-3">
                                        <div className="col-auto">
                                            <input
                                                type="text"
                                                value={coupon}
                                                onChange={(e) => setCoupon(e.target.value)}
                                                placeholder="Ingrese su código"
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="col-auto">
                                            <button className="btn btn-primary mb-3">OK</button>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr> */}

                        <tr className="border-t">
                            <td colSpan={5} className="p-2 text-right font-semibold">Total productos</td>
                            <td className="p-2 text-right">$ {subtotal.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td colSpan={5} className="p-2 text-right font-semibold">Envío total</td>
                            <td className="p-2 text-right">$ {shipping.toLocaleString()}</td>
                        </tr>
                        <tr className="border-t text-lg font-bold">
                            <td colSpan={5} className="p-2 text-right">TOTAL</td>
                            <td className="p-2 text-right text-green-600">$ {total.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                <Link href="/" className="btn btn-danger">SEGUIR COMPRANDO</Link>
                {!user && (
                    <div>
                        <span className="ms-4">Necesita conectarse para proceder con la compra</span>
                        <Link href="/login" className="btn btn-primary ms-2">Login</Link>
                    </div>
                )}
            </div>

            {/* Muestra el formulario de pago solo cuando el usuario ha iniciado sesión y tiene artículos */}
            {(user && cart.length > 0) && (
                <Checkout total={total} />
            )}
        </>
    );
}

