"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState, useTransition } from "react";
import { useCart } from "@/components/providers/cart-provider";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";

interface CartDrawerProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ children, open, onOpenChange }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const total = getCartTotal();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const roomId = searchParams.get("r");

  const handleConfirmOrder = async () => {
    setError(null);
    startTransition(async () => {
      try {
        const response = await fetch("/api/mock-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ items: cartItems, roomId }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to place order.");
        }

        console.log("Order placed successfully:", result.orderId);
        onOpenChange(false);

      } catch (err) {
        console.error("Order confirmation error:", err);
        setError((err as Error).message);
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle className="text-2xl">Your Cart</SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
            <ShoppingBag className="w-24 h-24 text-muted-foreground/50 mb-4" />
            <p className="text-xl font-semibold text-muted-foreground">Your cart is empty</p>
            <SheetDescription className="mt-2">
              Looks like you haven&apos;t added anything to your cart yet. Start browsing the menu!
            </SheetDescription>
            <Button onClick={() => onOpenChange(false)} className="mt-6 bg-brand-primary hover:bg-brand-primary/90 text-primary-foreground">
                Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-grow px-6 py-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start space-x-4 py-4 border-b last:border-b-0">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.imageUrl || "/images/placeholder-dish.jpg"}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-lg">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Price: ₹{item.price}</p>
                      {item.notes && (
                        <p className="text-xs text-muted-foreground mt-1 p-2 bg-muted rounded-md">
                          Notes: {item.notes}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={isPending}
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold w-5 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 text-brand-primary"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isPending}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 px-2"
                            onClick={() => removeFromCart(item.id)}
                            disabled={isPending}
                        >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="px-6 py-4 border-t bg-background mt-auto">
                <div className="w-full space-y-3">
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Subtotal</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                    {error && <p className="text-sm text-destructive text-center">Error: {error}</p>}
                    <Button 
                        className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-accent-foreground text-lg py-6"
                        onClick={handleConfirmOrder}
                        disabled={isPending || cartItems.length === 0}
                    >
                        {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                        {isPending ? "Placing Order..." : "Confirm Order"}
                    </Button>
                </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
} 