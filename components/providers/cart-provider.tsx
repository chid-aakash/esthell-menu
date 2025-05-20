"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Dish } from "@/types/menu"; // Import Dish for CartItem

// Define a type for your cart item
export interface CartItem extends Dish {
  quantity: number;
  notes?: string; // Optional notes from DishSheet
}

// Define the context type
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  getItemQuantity: (itemId: string) => number;
  // Add other cart actions here: clearCart, etc.
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Dummy functions, to be implemented in Step 5.2
  const addToCart = (item: CartItem) => {
    console.log("addToCart (dummy)", item);
    // Example: setCartItems(prevItems => [...prevItems, item]);
  };
  const removeFromCart = (itemId: string) => {
    console.log("removeFromCart (dummy)", itemId);
    // Example: setCartItems(prevItems => prevItems.filter(i => i.id !== itemId));
  };
  const updateQuantity = (itemId: string, quantity: number) => {
    console.log("updateQuantity (dummy)", itemId, quantity);
    // Example: setCartItems(prevItems => prevItems.map(i => i.id === itemId ? {...i, quantity} : i));
  };
  const getItemQuantity = (itemId: string) => {
    const item = cartItems.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
} 