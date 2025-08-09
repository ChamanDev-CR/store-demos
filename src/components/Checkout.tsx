"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
// Context hooks to access cart contents and authenticated user
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

// Checkout form that simulates payment processing and empties the cart
export default function Checkout({ total }: { total: number }) {
    const { cart, removeFromCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        // Simulate payment processing delay
        setTimeout(() => {
            setLoading(false);
            try {
                // Try to open Bootstrap modal programmatically
                const anyWin = window as any;
                const modal = new anyWin.bootstrap.Modal(modalRef.current!);
                modal.show();
            } catch {
                // Fallback if Bootstrap is not available
                alert("¡Compra realizada con éxito!");
                // Clear cart and redirect home
                cart.forEach((item) => removeFromCart(item.id));
                router.push("/");
            }
        }, 900);
    };

    // When the success modal is closed, empty the cart and go back home
    useEffect(() => {
        const el = modalRef.current;
        if (!el) return;
        const handler = () => {
            // Limpiar carrito y redirigir al cerrar el modal
            cart.forEach((item) => removeFromCart(item.id));
            router.push("/");
        };
        el.addEventListener("hidden.bs.modal", handler);
        return () => el.removeEventListener("hidden.bs.modal", handler);
    }, [cart, removeFromCart, router]);

    return (
        <div className="mt-4">
            <h2 className="h5 mb-3">Checkout</h2>
            <form onSubmit={onSubmit} className="row g-3">
                <div className="col-12 col-lg-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="card-title mb-3">Dirección de envío</h6>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label">Nombre completo</label>
                                    <input className="form-control" value={user?.name} required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Correo electrónico</label>
                                    <input type="email" className="form-control" value={user?.email} required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Teléfono</label>
                                    <input type="tel" className="form-control" required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Dirección</label>
                                    <input className="form-control" placeholder="Calle, número, referencia" required />
                                </div>
                                <div className="col-6">
                                    <label className="form-label">Ciudad</label>
                                    <input className="form-control" required />
                                </div>
                                <div className="col-3">
                                    <label className="form-label">Provincia</label>
                                    <input className="form-control" required />
                                </div>
                                <div className="col-3">
                                    <label className="form-label">Código Postal</label>
                                    <input className="form-control" required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">País</label>
                                    <input className="form-control" required />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="card-title mb-3">Pago con tarjeta</h6>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label">Nombre en la tarjeta</label>
                                    <input className="form-control" required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Número de tarjeta</label>
                                    <input className="form-control" inputMode="numeric" pattern="[0-9 ]{12,19}" placeholder="4111 1111 1111 1111" required />
                                </div>
                                <div className="col-6">
                                    <label className="form-label">Expira</label>
                                    <input className="form-control" placeholder="MM/AA" required />
                                </div>
                                <div className="col-6">
                                    <label className="form-label">CVV</label>
                                    <input className="form-control" inputMode="numeric" pattern="[0-9]{3,4}" required />
                                </div>
                                <div className="col-12 form-check">
                                    <input id="terms" type="checkbox" className="form-check-input" required />
                                    <label htmlFor="terms" className="form-check-label">Acepto términos y condiciones</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 d-flex justify-content-end align-items-center gap-3">
                    <div className="fs-5">Total a pagar: <strong>₡ {total.toLocaleString()}</strong></div>
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? "Procesando…" : "Realizar pago"}
                    </button>
                </div>
            </form>

            {/* Modal de éxito */}
            <div className="modal fade" tabIndex={-1} ref={modalRef}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Compra realizada</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>¡Tu compra fue procesada con éxito! Gracias por tu pedido.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

