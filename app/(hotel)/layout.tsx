import "@/app/globals.css"; // Ensure global styles are imported
import React, { Suspense } from "react";
import QueryProvider from "@/components/providers/query-provider";
import CartProvider from "@/components/providers/cart-provider";
import Header from "@/components/layout/header";

export default function HotelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <CartProvider>
        <Suspense fallback={<div>Loading header...</div>}>
          <Header />
        </Suspense>
        <main className="p-4">{children}</main>
        {/* TODO: Add Footer or other global elements if needed */}
      </CartProvider>
    </QueryProvider>
  );
} 