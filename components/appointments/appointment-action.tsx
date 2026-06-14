"use client";

import { Button } from "@/components/ui/button";
import {
  cancelAppointment,
  confirmAppointment,
  listOfAppointments,
  accepctlistOfAppointment,
} from "@/redux/slice/appointment-slice";
import { AppDispatch } from "@/redux/store/store";
import { Check, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

interface ActionCellProps {
  id: string;
  status: "Pending" | "Confirmed" | "Cancelled";
}

const AppointmentActions = ({ id, status }: ActionCellProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleConfirm = async () => {
    try {
      await dispatch(confirmAppointment(id)).unwrap();
      dispatch(listOfAppointments());
      dispatch(accepctlistOfAppointment());
      toast.success("Appointment confirmed");
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleCancel = async () => {
    try {
      await dispatch(cancelAppointment(id)).unwrap();
      dispatch(listOfAppointments());
      dispatch(accepctlistOfAppointment());
      toast.success("Appointment cancelled");
    } catch (error) {
      toast.error(error as string);
    }
  };

  if (status !== "Pending") {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5">
      <Button
        size="sm"
        onClick={handleConfirm}
        className="h-8 w-8 rounded-full bg-green-600 p-0 text-white shadow-sm hover:bg-green-700"
        title="Confirm"
      >
        <Check className="size-4" />
      </Button>
      <Button
        size="sm"
        onClick={handleCancel}
        className="h-8 w-8 rounded-full bg-red-500 p-0 text-white shadow-sm hover:bg-red-600"
        title="Cancel"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
};
export default AppointmentActions;
