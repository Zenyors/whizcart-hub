
import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import CreatePayoutForm from "./CreatePayoutForm";

// Import Dialog components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// Import Drawer components
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

interface CreatePayoutDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  payouts: any[];
}

const CreatePayoutDialog = ({ open, setOpen, payouts }: CreatePayoutDialogProps) => {
  // Use media query to determine if we should use a dialog or drawer
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleClose = () => {
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Payout</DialogTitle>
            <DialogDescription>
              Create a new payout to a vendor. Fill in all the required fields.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <CreatePayoutForm 
              payouts={payouts} 
              onSubmitSuccess={handleClose} 
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Create New Payout</DrawerTitle>
            <DrawerDescription>
              Create a new payout to a vendor. Fill in all the required fields.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <CreatePayoutForm 
              payouts={payouts} 
              onSubmitSuccess={handleClose} 
            />
          </div>
          <DrawerFooter className="px-4">
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
};

export default CreatePayoutDialog;
