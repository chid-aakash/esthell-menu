"use client"; // Since it uses useSearchParams

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
// import Image from "next/image"; // Removed unused Image import
import Link from "next/link";
import { ShoppingCart } from "lucide-react"; // Added ShoppingCart icon
import { Button } from "@/components/ui/button"; // Added Button
import { CartDrawer } from "@/components/cart/cart-drawer"; // Added CartDrawer
import { useCart } from "@/components/providers/cart-provider"; // Added useCart

function HeaderContent() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("r");
  const { cartItems } = useCart(); // Get cartItems
  const [isCartOpen, setIsCartOpen] = useState(false);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total quantity

  return (
    <header className="bg-brand-primary text-brand-primary-foreground p-4 flex justify-between items-center shadow-md h-16 w-full">
      <Link href={roomId ? `/?r=${roomId}` : "/"} className="flex items-center space-x-2">
        {/* Placeholder for Logo */}
        {/* <Image src="/logo.png" alt="Esthell Hotel Logo" width={40} height={40} /> */}
        <div className="bg-brand-accent text-brand-accent-foreground font-bold p-2 rounded">LOGO</div>
        <h1 className="text-xl font-semibold">Esthell Hotel</h1>
      </Link>
      <div className="flex items-center space-x-4">
        {roomId && (
          <div className="text-sm">
            Room: <span className="font-semibold">{roomId}</span>
          </div>
        )}
        <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative" 
            onClick={() => setIsCartOpen(true)}
            aria-label={itemCount > 0 ? `Open cart (${itemCount} item${itemCount > 1 ? 's' : ''})` : "Open cart (empty)"}
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-accent text-brand-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </CartDrawer>
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<div className="h-16 bg-brand-primary flex items-center justify-center text-brand-primary-foreground">Loading Header...</div>}>
      <HeaderContent />
    </Suspense>
  );
} 