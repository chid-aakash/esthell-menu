import "@/app/globals.css"; // Ensure global styles are imported
import React from "react";
import QueryProvider from "@/components/providers/query-provider";
import CartProvider from "@/components/providers/cart-provider";

export default function HotelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <CartProvider>
        {/* TODO: Add Header component here later as per step 1.2 */}
        <main>{children}</main>
        {/* TODO: Add Footer or other global elements if needed */}
      </CartProvider>
    </QueryProvider>
  );
} 