import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center pb-2">
          <div className="w-full flex justify-center mb-4">
            <AlertCircle className="h-16 w-16 text-teebay/80" />
          </div>
          <CardTitle className="text-3xl font-bold">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center pb-2">
          <p className="text-gray-600">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4 text-teebay" />
            Go Back
          </Button>
          <Button
            className="w-full sm:w-auto"
            variant={"teebay"}
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default NotFoundPage;
