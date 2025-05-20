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
import React from "react";
import { useCart } from "@/components/providers/cart-provider";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, Trash2, ShoppingBag } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CartDrawerProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ children, open, onOpenChange }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const total = getCartTotal();

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
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold w-5 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 text-brand-primary"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10 px-2"
                            onClick={() => removeFromCart(item.id)}
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
                    <Button className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-accent-foreground text-lg py-6">
                        Confirm Order
                    </Button>
                </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
} 