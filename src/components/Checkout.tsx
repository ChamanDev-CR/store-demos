"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
// Context hooks to access the cart contents and the authenticated user
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

// Checkout form that simulates processing and clears the cart
export default function Checkout({ total }: { total: number }) {
    const { cart, removeFromCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        // Simulate a delay in the payment processing
        setTimeout(() => {
            setLoading(false);
            try {
                // Try to open a Bootstrap modal programmatically
                const anyWin = window as any;
                const modal = new anyWin.bootstrap.Modal(modalRef.current!);
                modal.show();
            } catch {
                // Fallback in case Bootstrap is not available
                alert("Purchase completed successfully!");
                // Clear the cart and redirect to the homepage
                cart.forEach((item) => removeFromCart(item.id));
                router.push("/");
            }
        }, 900);
    };

    // When the success modal closes, empty the cart and return home
    useEffect(() => {
        const el = modalRef.current;
        if (!el) return;
        const handler = () => {
            // Clear the cart and redirect when the modal is closed
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
                            <h6 className="card-title mb-3">Shipping address</h6>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label">Full name</label>
                                    <input className="form-control" value={user?.name} required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Email address</label>
                                    <input type="email" className="form-control" value={user?.email} required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Phone</label>
                                    <input type="tel" className="form-control" required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Address</label>
                                    <input className="form-control" placeholder="Street, number, reference" required />
                                </div>
                                <div className="col-6">
                                    <label className="form-label">City</label>
                                    <input className="form-control" required />
                                </div>
                                <div className="col-3">
                                    <label className="form-label">State/Province</label>
                                    <input className="form-control" required />
                                </div>
                                <div className="col-3">
                                    <label className="form-label">ZIP/Postal code</label>
                                    <input className="form-control" required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Country</label>
                                    <input className="form-control" required />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="card-title mb-3">Card payment</h6>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label">Name on card</label>
                                    <input className="form-control" required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Card number</label>
                                    <input className="form-control" inputMode="numeric" pattern="[0-9 ]{12,19}" placeholder="4111 1111 1111 1111" required />
                                </div>
                                <div className="col-6">
                                    <label className="form-label">Expires</label>
                                    <input className="form-control" placeholder="MM/YY" required />
                                </div>
                                <div className="col-6">
                                    <label className="form-label">CVV</label>
                                    <input className="form-control" inputMode="numeric" pattern="[0-9]{3,4}" required />
                                </div>
                                <div className="col-12 form-check">
                                    <input id="terms" type="checkbox" className="form-check-input" required />
                                    <label htmlFor="terms" className="form-check-label">I accept the terms and conditions</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 d-flex justify-content-end align-items-center gap-3">
                    <div className="fs-5">Total to pay: <strong>₡ {total.toLocaleString()}</strong></div>
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        {loading ? "Processing…" : "Make payment"}
                    </button>
                </div>
            </form>

            {/* Success modal */}
            <div className="modal fade" tabIndex={-1} ref={modalRef}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Purchase completed</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Your purchase was processed successfully! Thank you for your order.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Accept</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

