import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { validateStep } from "@/lib/utils";
import React from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const ROUTES_ORDER = [
  "/dashboard/new/title",
  "/dashboard/new/categories",
  "/dashboard/new/description",
  "/dashboard/new/price",
  "/dashboard/new/summary",
] as const;

export const ProductFormLayout: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const currentIndex = ROUTES_ORDER.indexOf(
    location.pathname as (typeof ROUTES_ORDER)[number]
  );
  const isFirstStep = currentIndex === 0;
  const isLastStep = currentIndex === ROUTES_ORDER.length - 1;

  const isCurrentStepValid = validateStep(location.pathname, searchParams);
  const isAllDataValid = validateStep("/dashboard/new/summary", searchParams);

  const handleNext = () => {
    if (!isCurrentStepValid) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (isLastStep) {
      if (!isAllDataValid) {
        toast({
          title: "Incomplete Form",
          description:
            "Please go back and fill out all required fields before submitting.",
          variant: "destructive",
        });
        return;
      }

      const formData: Partial<ProductFormData> = {};
      for (const [key, value] of searchParams.entries()) {
        formData[key as keyof ProductFormData] = value;
      }
      console.log("Final form data:", formData);
      toast({
        title: "Success",
        description: "Product has been added successfully.",
      });
      navigate("/dashboard");
      return;
    }
    navigate(ROUTES_ORDER[currentIndex + 1] + location.search);
  };

  const handleBack = () => {
    if (!isFirstStep) {
      navigate(ROUTES_ORDER[currentIndex - 1] + location.search);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <Outlet />

          <div className="flex justify-between mt-6">
            {!isFirstStep && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <div className="ml-auto">
              <Button
                variant="teebay"
                onClick={handleNext}
                disabled={isLastStep ? !isAllDataValid : !isCurrentStepValid}
              >
                {isLastStep ? "Submit" : "Next"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
