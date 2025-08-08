"use client";
import { useEffect, useState } from "react";
import { getProducts, getProductsByCategory } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  console.log('filteredProducts', filteredProducts);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { data } = await getProducts();
    setProducts(data);
    setFilteredProducts(data);
    setLoading(false);
  };

  const handleFilter = async ({ q, category }: { q: string; category: string }) => {
    let data = [];
    if (category) {
      const res = await getProductsByCategory(category);
      data = res.data;
    } else {
      data = products;
    }
    if (q) {
      data = data.filter((p: any) => p.title.toLowerCase().includes(q.toLowerCase()));
    }
    setFilteredProducts(data);
  };

  return (
    <>
      <ProductFilter onFilter={handleFilter} />
      <h1 className="title-products">PRODUCTOS DE TEMPORADA</h1>
      <div className="row gx-4 gy-4">
        {loading ? (
          <p className="text-center my-5">Cargando productos...</p>
        ) : (
          <>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        )}
      </div>
    </>
  );
}