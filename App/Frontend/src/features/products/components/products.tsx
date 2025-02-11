import data from "@/data.json";
import ProductCard from "@/features/products/components/ProductCard.tsx";

export default function ProductList() {
  return (
    <div className="max-w-3xl mx-auto">
      {data.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={() => console.log("df")}
        />
      ))}
    </div>
  );
}
