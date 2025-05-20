"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle, CookingPot } from "lucide-react"; // Icons
import type { Dish } from "@/types/menu"; // Import Dish type
import DishSheet from "./dish-sheet"; // Import DishSheet
import { useCart } from "@/components/providers/cart-provider"; // Use actual useCart

// Removed temporary placeholder for useCart

// interface Dish { // Re-defining here or importing from a shared types file later
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   cookTimeMinutes: number;
//   imageUrl: string;
// }

interface DishCardProps {
  dish: Dish;
}

export default function DishCard({ dish }: DishCardProps) {
  const { addToCart, updateQuantity, removeFromCart, getItemQuantity } = useCart();
  // const quantityInCart = getItemQuantity(dish.id); // Re-fetch for handlers and render
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State for sheet

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent sheet from opening when clicking +/- buttons
    const currentQuantity = getItemQuantity(dish.id);
    if (currentQuantity === 0) {
      addToCart({ ...dish, quantity: 1 });
    } else {
      updateQuantity(dish.id, currentQuantity + 1);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent sheet from opening
    const currentQuantity = getItemQuantity(dish.id);
    if (currentQuantity > 1) {
      updateQuantity(dish.id, currentQuantity - 1);
    } else if (currentQuantity === 1) {
      removeFromCart(dish.id);
    }
  };
  
  const openSheet = () => setIsSheetOpen(true);
  const quantityInCart = getItemQuantity(dish.id); // For rendering the UI

  return (
    <>
      <div 
        className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden flex flex-col transition-all hover:shadow-xl cursor-pointer"
        onClick={openSheet} // Open sheet on card click
        role="button"
        tabIndex={0}
        aria-label={`View details for ${dish.name}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevent scrolling if space is pressed
            openSheet();
          }
        }}
      >
        <div className="relative w-full h-48">
          <Image
            src={dish.imageUrl || "/images/placeholder-dish.svg"}
            alt={dish.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out group-hover:scale-105" // group-hover if parent is group
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-1">{dish.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 flex-grow line-clamp-2">{dish.description}</p>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <span className="text-lg font-bold text-brand-primary">₹{dish.price}</span>
            <div className="flex items-center">
              <CookingPot className="w-4 h-4 mr-1 text-brand-accent" />
              <span>{dish.cookTimeMinutes} mins</span>
            </div>
          </div>

          <div className="mt-auto pt-3 border-t border-border">
            {quantityInCart === 0 ? (
              <Button 
                onClick={handleAdd} 
                className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-accent-foreground"
                aria-label={`Add ${dish.name} to cart`}
              >
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center justify-between">
                <Button 
                  onClick={handleRemove} 
                  variant="outline" 
                  size="icon" 
                  className="text-destructive hover:bg-destructive/10 border-destructive/50"
                  aria-label={`Decrease quantity of ${dish.name}`}
                >
                  <MinusCircle className="h-5 w-5" />
                </Button>
                <span className="text-lg font-semibold mx-3" aria-live="polite">{quantityInCart} in cart</span>
                <Button 
                  onClick={handleAdd} 
                  variant="outline" 
                  size="icon" 
                  className="text-brand-primary hover:bg-brand-primary/10 border-brand-primary/50"
                  aria-label={`Increase quantity of ${dish.name}`}
                >
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <DishSheet dish={dish} isOpen={isSheetOpen} onOpenChange={setIsSheetOpen} />
    </>
  );
} 