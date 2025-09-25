"use client";
import { useEffect, useState } from "react";
// API helpers for requesting products and categories
import { getProducts, getProductsByCategory } from "@/lib/api";
// UI components
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";

// Home page that lists products and enables basic filtering
export default function HomePage() {
  // Full product list loaded from the API
  const [products, setProducts] = useState<any[]>([]);
  // Products after applying search/category filters
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  // Loading state used when requesting products
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  // Retrieve all products from the Fake Store API and populate local state
  const loadProducts = async () => {
    setLoading(true);
    const { data } = await getProducts();
    setProducts(data);
    setFilteredProducts(data);
    setLoading(false);
  };

  // Callback executed when the ProductFilter form changes
  // Optionally queries products by category and then filters by name
  const handleFilter = async ({ q, category }: { q: string; category: string }) => {
    let data = [];
    if (category) {
      // Request products for a specific category
      const res = await getProductsByCategory(category);
      data = res.data;
    } else {
      data = products;
    }
    if (q) {
      // Filter locally by the product title
      data = data.filter((p: any) => p.title.toLowerCase().includes(q.toLowerCase()));
    }
    setFilteredProducts(data);
  };

  return (
    <>
      <ProductFilter onFilter={handleFilter} />
      <h1 className="title-products">SEASONAL PRODUCTS</h1>
      <div className="row gx-4 gy-4">
        {loading ? (
          <p className="text-center my-5">Loading products...</p>
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

