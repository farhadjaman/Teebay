import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { formatDistance } from "date-fns";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
}

export const DashboardProductCard = ({
  product,
  onDelete,
}: ProductCardProps) => {
  const {
    title,
    category,
    price,
    description,
    datePosted,
    views,
    rentPrice,
    rentOption,
  } = product;
  const [isMoreShown, setIsMoreShown] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  function handleMoreDetailsClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsMoreShown(!isMoreShown);
  }
  function handleDeleteConfirm() {
    onDelete(product.title);
    setShowDeleteModal(false);
  }
  return (
    <>
      {" "}
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-start">
                <Link to={`/dashboard/edit/${product.id}`}>
                  <CardTitle className="text-xl font-semibold hover:text-teebay transition-colors">
                    {title}
                  </CardTitle>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-red-600"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="text-sm text-gray-500">
                Categories: {category}
              </div>

              <div className="text-sm">
                Price: ${price} | Rent: ${rentPrice} {rentOption}
              </div>
              <CardDescription>
                {description.length > 150 ? (
                  <>
                    {description.slice(
                      0,
                      isMoreShown ? description.length : 150
                    )}
                    {!isMoreShown && "... "}
                    <Button
                      onClick={handleMoreDetailsClick}
                      variant="link"
                      className="text-blue-600 p-0 h-auto ml-1"
                    >
                      {isMoreShown ? "Show Less" : "More Details"}
                    </Button>
                  </>
                ) : (
                  description
                )}
              </CardDescription>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>
                  Posted{" "}
                  {formatDistance(new Date(datePosted), new Date(), {
                    addSuffix: true,
                  })}
                </span>
                <span>{views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Are you sure you want to delete this product?"
        description="This action cannot be undone. Please confirm your deletion."
      />
    </>
  );
};
