import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistance } from "date-fns";
import { ChevronDown, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "@/components/ConfirmationModal.tsx";

interface Product {
    id: string;
    title: string;
    categories: string[];
    price: number;
    description: string;
    datePosted: string;
    views: number;
    rentPrice: number;
    rentOption: string;
}

interface ProductCardProps {
    product: Product;
    isDashboard?: boolean;
    onDelete?: (id: string) => void;
    onEdit?: (product: Product) => void;
    onView?: (id: string) => void;
}

const ProductCard = ({
                         product,
                         isDashboard = false,
                         onDelete,
                         onView,
                     }: ProductCardProps) => {
    const navigate = useNavigate();
    const [isMoreShown, setIsMoreShown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [localViews, setLocalViews] = useState(product.views);
    const [hasBeenViewed, setHasBeenViewed] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // View counting functionality for non-dashboard view
    useEffect(() => {
        if (!cardRef.current || hasBeenViewed || isDashboard) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasBeenViewed) {
                        setLocalViews((prev) => prev + 1);
                        onView?.(product.id);
                        setHasBeenViewed(true);
                        observer.disconnect();
                    }
                });
            },
            {
                threshold: 0.5,
                rootMargin: "0px",
            }
        );

        observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, [product.id, onView, hasBeenViewed, isDashboard]);

    function handleMoreDetailsClick(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        setIsMoreShown(!isMoreShown);
    }

    function handleDeleteConfirm() {
        onDelete?.(product.id);
        setShowDeleteModal(false);
    }

    function handleCardClick(e: React.MouseEvent) {
        const target = e.target as HTMLElement;
        const isButtonClick =
            target.closest("button") ||
            target.tagName === "BUTTON" ||
            target.closest('[data-no-navigate="true"]');

        if (!isButtonClick) {
            let route;
            if (isDashboard) {
                route = `/dashboard/my-products/${product.id}/edit`;
            } else {
                route = `/products/${product.id}`;
            }
            navigate(route);
        }
    }

    const shouldShowButton = product.description.length > 200;

    return (
        <>
            <Card
                ref={cardRef}
                className="w-full mb-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={handleCardClick}
            >
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="flex-grow">
                            <CardTitle className="text-xl font-semibold hover:text-blue-600 transition-colors">
                                {product.title}
                            </CardTitle>

                            <div className="mt-2 flex flex-wrap gap-2">
                                {product.categories.map((category, index) => (
                                    <Badge key={index} variant="secondary">
                                        {category}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="font-semibold text-lg">
                                Price: ${product.price} | Rent: ${product.rentPrice}{" "}
                                {product.rentOption}
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div
                        className="relative transition-all duration-300 ease-in-out overflow-hidden"
                        style={{
                            maxHeight: isMoreShown
                                ? contentRef.current?.scrollHeight + "px"
                                : "70px",
                        }}
                    >
                        <div ref={contentRef}>{product.description}</div>

                        <div
                            className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent transition-all duration-200 ${
                                !isMoreShown && shouldShowButton
                                    ? "opacity-100"
                                    : "opacity-0 pointer-events-none"
                            }`}
                        />
                    </div>

                    {shouldShowButton && (
                        <Button
                            variant="ghost"
                            className="mt-2 h-8 px-2 text-sm"
                            onClick={handleMoreDetailsClick}
                        >
                            {isMoreShown ? "Show Less" : "Show More"}
                            <ChevronDown
                                className={`ml-1 h-4 w-4 transition-transform duration-900 ${
                                    isMoreShown ? "rotate-180" : ""
                                }`}
                            />
                        </Button>
                    )}

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <span>
              Posted{" "}
                {formatDistance(new Date(product.datePosted), new Date(), {
                    addSuffix: true,
                })}
            </span>
                        <span>{isDashboard ? product.views : localViews} views</span>
                    </div>

                    {isDashboard && (
                        <div className="flex justify-end gap-2 mt-4">
                            {onDelete && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    <Trash2 className=" h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>

            {isDashboard && (
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
