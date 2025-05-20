"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle, CookingPot } from "lucide-react"; // Icons
// import { useCart } from "@/components/providers/cart-provider"; // Assuming CartContext is set up

// Temporary placeholder for useCart until CartContext is fully implemented
const useCart = () => ({
  addToCart: (item: any) => console.log("Add to cart (temp):", item),
  updateQuantity: (itemId: string, quantity: number) => console.log("Update quantity (temp):", itemId, quantity),
  removeFromCart: (itemId: string) => console.log("Remove from cart (temp):", itemId),
  getItemQuantity: (itemId: string) => 0, // Dummy quantity
});


interface Dish { // Re-defining here or importing from a shared types file later
  id: string;
  name: string;
  description: string;
  price: number;
  cookTimeMinutes: number;
  imageUrl: string;
}

interface DishCardProps {
  dish: Dish;
}

export default function DishCard({ dish }: DishCardProps) {
  const { addToCart, updateQuantity, removeFromCart, getItemQuantity } = useCart();
  const quantityInCart = getItemQuantity(dish.id);

  const handleAdd = () => {
    // If item not in cart, use addToCart, otherwise updateQuantity
    // This logic will depend on how CartContext is structured
    if (quantityInCart === 0) {
      addToCart({ ...dish, quantity: 1 }); // Add dish with quantity 1
    } else {
      updateQuantity(dish.id, quantityInCart + 1);
    }
  };

  const handleRemove = () => {
    if (quantityInCart > 1) {
      updateQuantity(dish.id, quantityInCart - 1);
    } else if (quantityInCart === 1) {
      removeFromCart(dish.id); // Or specific logic to remove item if quantity becomes 0
    }
  };

  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden flex flex-col transition-all hover:shadow-xl">
      <div className="relative w-full h-48">
        <Image
          src={dish.imageUrl || "/images/placeholder-dish.jpg"} // Fallback placeholder
          alt={dish.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out hover:scale-105"
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
            <Button onClick={handleAdd} className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-accent-foreground">
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between">
              <Button onClick={handleRemove} variant="outline" size="icon" className="text-destructive hover:bg-destructive/10 border-destructive/50">
                <MinusCircle className="h-5 w-5" />
              </Button>
              <span className="text-lg font-semibold mx-3">{quantityInCart}</span>
              <Button onClick={handleAdd} variant="outline" size="icon" className="text-brand-primary hover:bg-brand-primary/10 border-brand-primary/50">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 