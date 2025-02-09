import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { format, isValid, parse } from "date-fns";
import React, { useEffect, useState } from "react";

interface RentalPeriodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (dates: { fromDate: Date; toDate: Date }) => void;
  minDate?: Date;
}

const RentalPeriodModal: React.FC<RentalPeriodModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
  minDate = new Date(),
}) => {
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [fromInputValue, setFromInputValue] = useState("");
  const [toInputValue, setToInputValue] = useState("");
  const [inputError, setInputError] = useState({ from: false, to: false });
  const { toast } = useToast();

  // Reset dates when modal opens
  useEffect(() => {
    if (open) {
      setFromDate(undefined);
      setToDate(undefined);
      setFromInputValue("");
      setToInputValue("");
      setInputError({ from: false, to: false });
    }
  }, [open]);

  const handleConfirm = () => {
    if (fromDate && toDate) {
      onConfirm({ fromDate, toDate });
      toast({
        title: "Success!",
        description: "Product has been rented successfully.",
      });
      onOpenChange(false);
    }
  };

  const validateAndSetDate = (
    value: string,
    setter: (date: Date | undefined) => void,
    inputSetter: (value: string) => void,
    errorSetter: (key: "from" | "to") => void,
    isFromDate: boolean
  ) => {
    inputSetter(value);

    try {
      const parsed = parse(value, "dd/MM/yyyy", new Date());

      if (isValid(parsed) && parsed >= minDate) {
        if (isFromDate) {
          if (toDate && parsed > toDate) {
            setInputError((prev) => ({ ...prev, from: true }));
            return;
          }
        } else {
          if (fromDate && parsed < fromDate) {
            setInputError((prev) => ({ ...prev, to: true }));
            return;
          }
        }

        setter(parsed);
        setInputError((prev) => ({ ...prev, [errorSetter]: false }));
      } else {
        setInputError((prev) => ({ ...prev, [errorSetter]: true }));
      }
    } catch {
      setInputError((prev) => ({ ...prev, [errorSetter]: true }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className="text-xl font-semibold">
              Rental period
            </DialogTitle>
            <Button
              variant="ghost"
              className="h-auto p-0"
              onClick={() => onOpenChange(false)}
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm text-gray-500">From</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  inputError.from ? "border-red-500" : ""
                }`}
                placeholder="dd/mm/yyyy"
                value={fromInputValue}
                onChange={(e) =>
                  validateAndSetDate(
                    e.target.value,
                    setFromDate,
                    setFromInputValue,
                    "from",
                    true
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-500">To</label>
              <input
                type="text"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  inputError.to ? "border-red-500" : ""
                }`}
                placeholder="dd/mm/yyyy"
                value={toInputValue}
                onChange={(e) =>
                  validateAndSetDate(
                    e.target.value,
                    setToDate,
                    setToInputValue,
                    "to",
                    false
                  )
                }
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 border-t">
          <Calendar
            mode="single"
            selected={fromDate}
            onSelect={(date) => {
              setFromDate(date);
              if (date) {
                setFromInputValue(format(date, "dd/MM/yyyy"));
                setInputError((prev) => ({ ...prev, from: false }));
              }
            }}
            disabled={(date) => date < minDate}
            className="bg-white rounded-md border shadow-sm"
            classNames={{
              head_cell: "text-gray-500 font-normal text-sm w-10",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
              day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md",
              day_selected:
                "bg-teebay text-white hover:bg-teebay/90 hover:text-white focus:bg-teebay focus:text-white",
              day_today: "bg-gray-100",
              day_disabled: "text-gray-300",
              nav_button:
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            }}
          />
          <Calendar
            mode="single"
            selected={toDate}
            onSelect={(date) => {
              setToDate(date);
              if (date) {
                setToInputValue(format(date, "dd/MM/yyyy"));
                setInputError((prev) => ({ ...prev, to: false }));
              }
            }}
            disabled={(date) => date < (fromDate || minDate)}
            className="bg-white rounded-md border shadow-sm"
            classNames={{
              head_cell: "text-gray-500 font-normal text-sm w-10",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-blue-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
              day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md",
              day_selected:
                "bg-teebay text-white hover:bg-teebay/90 hover:text-white focus:bg-teebay focus:text-white",
              day_today: "bg-gray-100",
              day_disabled: "text-gray-300",
              nav_button:
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            }}
          />
        </div>

        <div className="flex justify-end space-x-4 p-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Go Back
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!fromDate || !toDate || inputError.from || inputError.to}
            variant="teebay"
          >
            Confirm rent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RentalPeriodModal;
