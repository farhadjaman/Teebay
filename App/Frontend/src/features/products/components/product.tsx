import ConfirmationModal from "@/components/ConfirmationModal";
import RentalPeriodModal from "@/components/RentalPeriodModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import data from "@/data.json";

const ProductDetails = () => {

    const products = data as Product[];
    const [showBuyModal, setShowBuyModal] = useState<boolean>(false);
    const [showRentModal, setShowRentModal] = useState<boolean>(false);

    const { productId } = useParams();
    const navigate = useNavigate();

    // Error handling for invalid product
    if (!productId) {
        navigate("/404");
    }

    const product = products.find((product: Product) => product.id === productId);

    if (!product) {
        navigate("/404");
    }

    const { title, categories, price, description, rentPrice, rentOption } =
        product;
    const handleBuyConfirm = () => {
        // Add your purchase logic here
        console.log("Product purchased!");
    };
    const handleConfirm = ({
                               fromDate,
                               toDate,
                           }: {
        fromDate: Date;
        toDate: Date;
    }) => {
        console.log("Selected dates:", fromDate, toDate);
    };
    return (
        <div className="h-[85vh] flex items-center justify-center p-4">
            <Card className="max-w-3xl w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <div className="flex items-center justify-between mt-2">
                        {categories.map((category, index) => (
                            <Badge key={index} variant="secondary">
                                {category}
                            </Badge>
                        ))}
                        <span className="text-lg font-semibold">
              Price: ${price} | Rent: ${rentPrice} {rentOption}
            </span>
                    </div>
                </CardHeader>

                <CardContent>
                    <p className="text-gray-600 leading-relaxed">{description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                    <div className="space-x-4">
                        <Button variant={"teebay"} onClick={() => setShowRentModal(true)}>
                            Rent
                        </Button>
                        <Button onClick={() => setShowBuyModal(true)} variant={"teebay"}>
                            Buy
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            <RentalPeriodModal
                open={showRentModal}
                onOpenChange={setShowRentModal}
                onConfirm={handleConfirm}
            />
            <ConfirmationModal
                isOpen={showBuyModal}
                onClose={() => setShowBuyModal(false)}
                onConfirm={handleBuyConfirm}
                title="Are you sure you want to buy this product?"
                description="This action cannot be undone. Please confirm your purchase."
            />
        </div>
    );
};

export default ProductDetails;
