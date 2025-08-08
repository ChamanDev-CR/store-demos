"use client";
import Image from "next/image";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/Product";

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <div className="col-12 col-md-3">
            <div className="card h-100 p-3">
                <div className="image-container">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="card-img-top"
                    />
                </div>
                <div className="card-body d-flex flex-column">
                    <h2 className="card-title-product">{product.title}</h2>
                    <p className="card-price fw-bold">${product.price}</p>
                    <button
                        className="btn btn-primary mt-auto"
                        onClick={() => addToCart(product)}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}