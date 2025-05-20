"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Chip from "@/components/ui/chip";
import Image from "next/image";
import { motion } from "framer-motion";
import { CookingPot, MessageSquarePlus, X } from "lucide-react";
import type { Dish } from "@/types/menu";

interface DishSheetProps {
  dish: Dish | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DishSheet({ dish, isOpen, onOpenChange }: DishSheetProps) {
  const [notes, setNotes] = useState("");
  const [dragConstraintLeft, setDragConstraintLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Calculate dishImages and validDishImages safely, even if dish is null initially
  const dishImages = dish?.images?.length ? dish.images : (dish?.imageUrl ? [dish.imageUrl] : []);
  const validDishImages = dishImages.map(img => img || "/images/placeholder-dish.jpg");

  useLayoutEffect(() => {
    // This effect should only run if the sheet is open and the refs are available
    // and dish is present to calculate constraints for its images.
    if (isOpen && dish && carouselRef.current && imageContainerRef.current) {
      const containerWidth = imageContainerRef.current.offsetWidth;
      if (validDishImages.length > 1) {
        const totalImagesWidth = containerWidth * validDishImages.length;
        setDragConstraintLeft(-(totalImagesWidth - containerWidth));
      } else {
        setDragConstraintLeft(0); // No dragging if only one or zero images
      }
    } else {
      setDragConstraintLeft(0); // Reset if not open or no dish
    }
    // Dependencies: isOpen ensures recalculation when sheet opens/closes.
    // dish.id (or another stable part of dish) to recalculate if the dish itself changes.
    // validDishImages.length to recalculate if the number of images changes for the same dish (though less likely).
  }, [isOpen, dish, validDishImages.length]); 
  // Note: validDishImages.length depends on `dish` as well.

  if (!dish) {
    return null;
  }

  const handleAddToCart = () => {
    console.log("Adding to cart (from sheet):", { ...dish, notes });
    onOpenChange(false);
    setNotes("");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { onOpenChange(open); if (!open) setNotes("");}}>
      <SheetContent side="bottom" className="max-h-[90vh] flex flex-col p-0 sm:p-0">
        
        <div ref={imageContainerRef} className="relative w-full h-64 sm:h-72 md:h-80 bg-muted overflow-hidden">
          {validDishImages.length > 1 ? (
            <motion.div 
              ref={carouselRef} 
              className="flex h-full" 
              drag="x" 
              dragConstraints={{ left: dragConstraintLeft, right: 0 }}
            >
              {validDishImages.map((imgUrl, index) => (
                <motion.div key={index} className="relative min-w-full h-full">
                  <Image src={imgUrl} alt={`${dish.name} image ${index + 1}`} layout="fill" objectFit="cover" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <Image src={validDishImages[0]} alt={dish.name} layout="fill" objectFit="cover" />
          )}
           <SheetClose className="absolute right-3 top-3 z-10 bg-background/70 p-1.5 rounded-full backdrop-blur-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-5 w-5 text-foreground/80" />
              <span className="sr-only">Close</span>
            </SheetClose>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          <SheetHeader className="text-left">
            <SheetTitle className="text-2xl font-bold">{dish.name}</SheetTitle>
            <div className="flex items-center space-x-4 pt-1">
                <Chip variant="secondary">
                    <CookingPot className="w-3.5 h-3.5 mr-1.5" />
                    {dish.cookTimeMinutes} mins
                </Chip>
                <p className="text-xl font-bold text-brand-primary">₹{dish.price}</p>
            </div>
            <SheetDescription className="pt-2 text-base">
              {dish.description}
            </SheetDescription>
          </SheetHeader>
          
          <div className="space-y-2">
            <label htmlFor="dish-notes" className="flex items-center text-sm font-medium text-muted-foreground">
              <MessageSquarePlus className="w-4 h-4 mr-2" /> Special Instructions? (Optional)
            </label>
            <Textarea
              id="dish-notes"
              placeholder="e.g., make it less spicy, no onions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px]"
            />
          </div>
        </div>

        <SheetFooter className="mt-auto p-6 border-t bg-background">
          <div className="flex w-full gap-4">
            <Button onClick={() => {onOpenChange(false); setNotes("");}} variant="outline" className="flex-1">Cancel</Button>
            <Button onClick={handleAddToCart} className="flex-1 bg-brand-accent hover:bg-brand-accent/90 text-brand-accent-foreground">
              Add to Cart
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
} 