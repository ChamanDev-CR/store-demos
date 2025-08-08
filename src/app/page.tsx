import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/Product";

export default async function HomePage() {
  const { data: products }: { data: Product[] } = await getProducts();

  return (
    <div className="row gx-4 gy-4">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}