import { getProductById } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { data: product } = await getProductById(params.id);

  return (
    <div className="max-w-xl mx-auto">
      <ProductCard product={product} />
    </div>
  );
}
