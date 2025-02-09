import data from "../data.json";
import ProductListCard from "./ProductListCard";
interface ProductListProps {
  type?: "bought" | "sold" | "borrowed" | "lent";
}

export default function ProductList({ type }: ProductListProps) {
  let products; // Change const to let

  switch (type) {
    case "bought":
      products = data;
      break;
    case "sold":
      products = data;
      break;
    case "borrowed":
      products = data;
      break;
    case "lent":
      products = data;
      break;
    default:
      products = data;
  }
  return (
    <div className="max-w-3xl mx-auto">
      {products.map((product) => (
        <ProductListCard key={product.id} product={product} />
      ))}
    </div>
  );
}
