"use client";
import Image from "next/image";

// Hook para interactuar con el contexto del carrito
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/Product";

// Componente de tarjeta que muestra información del producto y un botón para añadirlo al carrito
export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const newImage = product.image.replace('.jpg', 't.png');

    // Calcula una calificación de estrellas sencilla a partir de los datos del producto
    const rate = Math.min(5, Math.max(0, Number(product?.rating?.rate ?? 0)));
    const count = Number(product?.rating?.count ?? 0);
    const rounded = Math.round(rate); // aproximación simple a estrellas enteras
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
                        <span className="text-warning small" aria-label={`Calificación ${rate} de 5`}>{stars}</span>
                        <small className="text-muted ms-2">{rate.toFixed(1)}</small>
                    </div>
                    <p className="card-price fw-bold">${product.price}</p>
                    <button
                        className="btn btn-primary mt-auto"
                        onClick={handleAddToCart}
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}
