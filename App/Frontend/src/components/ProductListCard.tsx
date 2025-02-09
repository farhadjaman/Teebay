// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useViewTracker } from "@/hooks/useViewTracker";
// import { formatDate } from "@/lib/utils";
// import { Product } from "@/types";
// import { FC, useRef, useState } from "react";
// import { Link } from "react-router-dom";

// interface ProductListCardProps {
//   product: Product;
//   onView?: (productId: string) => void; // Callback for when view is registered
// }

// const ProductListCard: FC<ProductListCardProps> = ({ product, onView }) => {
//   const {
//     title,
//     category,
//     price,
//     description,
//     datePosted,
//     views,
//     rentPrice,
//     rentOption,
//   } = product;
//   const [isMoreShown, setIsMoreShown] = useState<boolean>(false);
//   const [localViews, setLocalViews] = useState(views);
//   const cardRef = useRef<HTMLDivElement>(null);

//   // Use our custom hook to track views
//   useViewTracker(cardRef, () => {
//     setLocalViews((prev) => prev + 1);
//     onView?.(product.id);
//   });

//   function handleMoreDetailsClick(e: React.MouseEvent) {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsMoreShown(!isMoreShown);
//   }

//   return (
//     <Card
//       ref={cardRef}
//       className="w-full mb-4 hover:shadow-md transition-shadow"
//     >
//       <CardHeader>
//         <div className="flex items-start justify-between">
//           <div>
//             <Link to={`/products/${product.id}`}>
//               <CardTitle className="text-xl font-semibold hover:text-teebay transition-colors">
//                 {title}
//               </CardTitle>
//             </Link>
//             <div className="mt-2">
//               <Badge variant="secondary" className="text-sm">
//                 Categories: {category}
//               </Badge>
//             </div>
//           </div>
//           <div className="text-right">
//             <p className="font-semibold text-lg">
//               Price: ${price} | Rent: ${rentPrice} {rentOption}
//             </p>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <CardDescription className="text-sm text-gray-600">
//           {description.length > 150 ? (
//             <>
//               {description.slice(0, isMoreShown ? description.length : 150)}
//               {!isMoreShown && "... "}
//               <Button
//                 onClick={handleMoreDetailsClick}
//                 variant="link"
//                 className="text-blue-600 p-0 h-auto ml-1"
//               >
//                 {isMoreShown ? "Show Less" : "More Details"}
//               </Button>
//             </>
//           ) : (
//             description
//           )}
//         </CardDescription>
//         <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
//           <span>Date posted: {formatDate(datePosted)}</span>
//           <span>{localViews.toLocaleString()} views</span>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductListCard;
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useViewTracker } from "@/hooks/useViewTracker";
import { formatDate } from "@/lib/utils";
import { Product } from "@/types";
import { ChevronDown } from "lucide-react";
import { FC, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";

interface ProductListCardProps {
  product: Product;
  onView?: (productId: string) => void;
}

const ProductListCard: FC<ProductListCardProps> = ({ product, onView }) => {
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

  const [isMoreShown, setIsMoreShown] = useState(false);
  const [localViews, setLocalViews] = useState(views);
  const cardRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useViewTracker(cardRef, () => {
    setLocalViews((prev) => prev + 1);
    onView?.(product.id);
  });

  function handleMoreDetailsClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsMoreShown(!isMoreShown);
  }

  // Hide button if text is less than or equal to 150 characters
  const shouldShowButton = description.length > 150;

  return (
    <Card
      ref={cardRef}
      className="w-full mb-4 hover:shadow-md transition-shadow"
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <Link to={`/products/${product.id}`}>
              <CardTitle className="text-xl font-semibold hover:text-teebay transition-colors">
                {title}
              </CardTitle>
            </Link>

            <div className="mt-2">
              <Badge variant="secondary" className="text-sm">
                Categories: {category}
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
        <div
          className="relative transition-all duration-300 ease-in-out overflow-hidden"
          style={{
            maxHeight: isMoreShown
              ? contentRef.current?.scrollHeight + "px"
              : "60px",
          }}
        >
          <div ref={contentRef}>{description}</div>

          <div
            className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent transition-all duration-200${
              !isMoreShown && shouldShowButton
                ? " opacity-100"
                : " opacity-0 pointer-events-none"
            }`}
          />
        </div>

        {shouldShowButton && (
          <Button
            variant="ghost"
            className="mt-2 h-8 px-2 text-sm "
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

        <div>
          Date posted: {formatDate(datePosted)}
          {localViews.toLocaleString()} views
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductListCard;
