import { DashboardProductCard } from "@/components/DashboardProductCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import data from "../../data.json";

export const DashboardPage = () => {
  return (
    <div className="h-[91vh] flex items-center justify-center">
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">MY PRODUCTS</h1>
          <Link to="/signin">
            <Button variant="outline">LOGOUT</Button>
          </Link>
        </div>

        <div className="space-y-4">
          {data.map((product) => (
            <DashboardProductCard
              key={product.id}
              product={product}
              onDelete={(name) => console.log(name, "deleted")}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Link to="/dashboard/new/title">
            <Button variant="teebay">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
