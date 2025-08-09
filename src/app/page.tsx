"use client";
import { useEffect, useState } from "react";
// Helpers de API para solicitar productos y categorías
import { getProducts, getProductsByCategory } from "@/lib/api";
// Componentes de interfaz de usuario
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";

// Página de inicio que lista productos y permite un filtrado simple
export default function HomePage() {
  // Lista completa de productos cargados desde la API
  const [products, setProducts] = useState<any[]>([]);
  // Productos después de aplicar filtros de búsqueda/categoría
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  // Estado de carga utilizado al solicitar productos
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  // Obtener todos los productos de la API falsa y poblar el estado local
  const loadProducts = async () => {
    setLoading(true);
    const { data } = await getProducts();
    setProducts(data);
    setFilteredProducts(data);
    setLoading(false);
  };

  // Callback que se ejecuta cuando el formulario de ProductFilter cambia
  // Opcionalmente consulta productos por categoría y luego filtra por nombre
  const handleFilter = async ({ q, category }: { q: string; category: string }) => {
    let data = [];
    if (category) {
      // Solicita productos para una categoría específica
      const res = await getProductsByCategory(category);
      data = res.data;
    } else {
      data = products;
    }
    if (q) {
      // Filtra localmente por el título del producto
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

