"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose, // Import SheetClose for a manual close button if needed
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button"; // For Add to Cart button etc.
import type { Dish } from "@/types/menu"; // Import Dish type

interface DishSheetProps {
  dish: Dish | null; // Dish can be null if no sheet is open
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DishSheet({ dish, isOpen, onOpenChange }: DishSheetProps) {
  if (!dish) {
    return null; // Don't render anything if no dish is selected
  }

  // Placeholder for actual Add to Cart logic
  const handleAddToCart = () => {
    console.log("Adding to cart (from sheet):", dish);
    onOpenChange(false); // Close sheet after adding
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[90vh] flex flex-col">
        <SheetHeader className="mb-4 text-left">
          <SheetTitle className="text-2xl font-bold">{dish.name}</SheetTitle>
          <SheetDescription className="line-clamp-3">
            {dish.description}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-grow overflow-y-auto pr-6 space-y-6"> 
          {/* Section 4.2 content will go here: image carousel, details, notes */}
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              (Image Carousel, Detailed Description, Cook Time, Notes Textarea - Step 4.2)
            </p>
            <div className="my-4 h-40 w-full bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                Placeholder for Image Carousel
            </div>
            <p className="text-lg font-semibold">Price: ₹{dish.price}</p>
            <p className="text-sm">Cook time: {dish.cookTimeMinutes} mins</p>
          </div>
        </div>

        <SheetFooter className="mt-auto pt-6 border-t">
          <div className="flex w-full gap-4">
            <SheetClose asChild>
                <Button variant="outline" className="flex-1">Cancel</Button>
            </SheetClose>
            <Button onClick={handleAddToCart} className="flex-1 bg-brand-accent hover:bg-brand-accent/90 text-brand-accent-foreground">
              Add to Cart
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
} 