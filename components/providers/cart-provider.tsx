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
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void; // Allow adding with or without initial quantity
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  getItemQuantity: (itemId: string) => number;
  getCartTotal: () => number;
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (itemToAdd: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === itemToAdd.id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + (itemToAdd.quantity || 1);
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: newQuantity,
          notes: itemToAdd.notes || updatedItems[existingItemIndex].notes, // Update notes if provided
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...itemToAdd, quantity: itemToAdd.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCartItems(prevItems => {
      if (newQuantity <= 0) {
        return prevItems.filter(item => item.id !== itemId);
      }
      return prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const getItemQuantity = (itemId: string) => {
    const item = cartItems.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getItemQuantity,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
} 