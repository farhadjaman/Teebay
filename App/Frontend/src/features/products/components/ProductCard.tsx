// ProductCard.tsx (in a shared location, e.g. features/products/components)

import { FC, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { formatDate } from "@/lib/utils";
import { useViewTracker } from "@/hooks/useViewTracker";
import ConfirmationModal from "@/features/app/dashboard/components/ConfirmationModal";
import { Product } from "@/types";

// Define props for all the behaviors you need.
interface ProductCardProps {
  product: Product;

  // If you want to track views:
  onView?: (productId: string) => void;
  trackViews?: boolean; // toggles the useViewTracker logic

  // If you want an editable card:
  isEditable?: boolean; // toggles display of "Edit" or "Delete" UI
  onDelete?: (id: string) => void;

  // If you want the show-more logic for the description:
  collapsibleDescription?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({
  product,
  onView,
  trackViews = false,
  isEditable = false,
  onDelete,
  collapsibleDescription = false,
}) => {
  const {
    id,
    title,
    category,
    price,
    rentPrice,
    rentOption,
    description,
    datePosted,
    views,
  } = product;

  const [isMoreShown, setIsMoreShown] = useState(false);
  const [localViews, setLocalViews] = useState(views);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // For optional “view” tracking
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // If trackViews is true, wire up the intersection observer
  useViewTracker(cardRef, () => {
    if (trackViews) {
      setLocalViews((prev) => prev + 1);
      onView?.(id);
    }
  }, [trackViews, onView, id]);

  function handleDeleteConfirm() {
    onDelete?.(id);
    setShowDeleteModal(false);
  }

  return (
    <>
      <Card
        ref={cardRef}
        className="w-full mb-4 hover:shadow-md transition-shadow"
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              {/* If “isEditable,” link to an edit route, else link to public product page */}
              <Link
                to={
                  isEditable
                    ? `/dashboard/my-products/${id}/edit`
                    : `/products/${id}`
                }
              >
                <CardTitle className="text-xl font-semibold hover:text-teebay transition-colors">
                  {title}
                </CardTitle>
              </Link>
              <div className="mt-2">
                <Badge variant="secondary" className="text-sm">
                  Category: {category}
                </Badge>
              </div>
            </div>

            <div className="text-right">
              <p className="font-semibold text-lg">
                Price: ${price} | Rent: ${rentPrice} {rentOption}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Description area */}
          {collapsibleDescription ? (
            <div
              className="relative transition-all duration-300 ease-in-out overflow-hidden"
              style={{
                maxHeight: isMoreShown
                  ? contentRef.current?.scrollHeight + "px"
                  : "60px",
              }}
            >
              <div ref={contentRef}>{description}</div>
              {/* Fade-out gradient if not expanded */}
              {!isMoreShown && description.length > 150 && (
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
              )}
            </div>
          ) : (
            <div>{description}</div>
          )}

          {/* Show more / show less button */}
          {collapsibleDescription && description.length > 150 && (
            <Button
              variant="ghost"
              className="mt-2 h-8 px-2 text-sm "
              onClick={() => setIsMoreShown(!isMoreShown)}
            >
              {isMoreShown ? "Show Less" : "Show More"}
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${
                  isMoreShown ? "rotate-180" : ""
                }`}
              />
            </Button>
          )}

          {/* Footer row: date, views, optional delete icon */}
          <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
            <span>
              Date posted: {formatDate(datePosted)} |{" "}
              {localViews.toLocaleString()} views
            </span>
            {isEditable && (
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-red-600"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation modal for delete */}
      {isEditable && (
        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
          title="Are you sure you want to delete this product?"
          description="This action cannot be undone. Please confirm your deletion."
        />
      )}
    </>
  );
};

export default ProductCard;
