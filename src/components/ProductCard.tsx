"use client";
import Image from "next/image";

// Hook for interacting with the cart context
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/Product";

// Card component that shows product information and a button to add it to the cart
export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const newImage = product.image.replace('.jpg', 't.png');

    // Compute a simple star rating based on the product data
    const rate = Math.min(5, Math.max(0, Number(product?.rating?.rate ?? 0)));
    const count = Number(product?.rating?.count ?? 0);
    const rounded = Math.round(rate); // simple approximation to whole stars
    const stars = Array.from({ length: 5 }, (_, i) => (i < rounded ? "★" : "☆")).join("");


    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: newImage,
            quantity: 1,
        });
    };

    return (
        <div className="col-12 col-md-3">
            <div className="card h-100 p-3">
                <div className="image-container">
                    <Image
                        src={newImage}
                        alt={product.title}
                        width={300}
                        height={300}
                        className="card-img-top"
                    />
                </div>
                <div className="card-body d-flex flex-column">
                    <h2 className="card-title-product">{product.title}</h2>
                    <div className="d-flex align-items-center mb-2">
                        <span className="text-warning small" aria-label={`Rating ${rate} out of 5`}>{stars}</span>
                        <small className="text-muted ms-2">{rate.toFixed(1)}</small>
                    </div>
                    <p className="card-price fw-bold">${product.price}</p>
                    <button
                        className="btn btn-primary mt-auto"
                        onClick={handleAddToCart}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
}
