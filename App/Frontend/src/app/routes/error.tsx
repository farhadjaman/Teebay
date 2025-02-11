import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import {
  isRouteErrorResponse,
  Link,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const getFriendlyErrorMessage = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return "We couldn't find what you're looking for. The page or item might have been moved or removed.";
    }
    if (error.status === 403) {
      return "You don't have permission to access this page. Please sign in or contact support if you think this is a mistake.";
    }
    if (error.status === 500) {
      return "Something went wrong on our end. We're working to fix it.";
    }
  }

  // Handle specific error messages
  if (error instanceof Error) {
    if (error.message.includes("not found")) {
      return "We couldn't find the item you're looking for. It might have been removed or sold.";
    }
    if (error.message.includes("network")) {
      return "There seems to be a connection issue. Please check your internet connection and try again.";
    }
  }

  return "Something unexpected happened. Don't worry, it's not your fault!";
};

export const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const friendlyMessage = getFriendlyErrorMessage(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <Card className="w-full max-w-md mx-4 shadow-lg border-0">
        <CardHeader className="text-center space-y-2">
          <div className="w-full flex justify-center">
            <div className="rounded-full bg-red-50 p-4">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold text-red-500">
            Oops! Something's Not Right
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <p className="text-gray-600 text-lg">{friendlyMessage}</p>
          <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
            <p>Here are a few things you can try:</p>
            <ul className="mt-2 space-y-1 list-disc list-inside">
              <li>Double-check the URL</li>
              <li>Go back and try again</li>
              <li>Return to homepage</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center ">
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4 text-teebay" />
            Go Back
          </Button>
          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="teebay"
              className="w-full"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorPage;
