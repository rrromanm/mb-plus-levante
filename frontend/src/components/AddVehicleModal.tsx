"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AddVehicleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AddVehicleModal({
  open,
  onOpenChange,
}: AddVehicleModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Vehicle</DialogTitle>
        </DialogHeader>

        {/* FORM GOES HERE */}
        <div className="space-y-4">
          AddVehicleForm
        </div>
      </DialogContent>
    </Dialog>
  );
}
