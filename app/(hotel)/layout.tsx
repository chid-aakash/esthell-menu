"use client"; // Make it a client component for usePathname

import "@/app/globals.css"; // Ensure global styles are imported
import React, { Suspense } from "react";
import { usePathname } from "next/navigation"; // Import usePathname
import QueryProvider from "@/components/providers/query-provider";
import CartProvider from "@/components/providers/cart-provider";
import Header from "@/components/layout/header";
import { AnimatePresence, motion } from "framer-motion"; // Added for page transitions

// Metadata should be exported from page.tsx or a Server Component parent if layout becomes client component
// export const metadata = {
//   manifest: "/manifest.json",
//   themeColor: "#003C71",
// };

export default function HotelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get current pathname

  return (
    <QueryProvider>
      <CartProvider>
        <Suspense fallback={<div>Loading header...</div>}>
          <Header />
        </Suspense>
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname} // Use pathname as key for transitions
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-4" // Apply padding here if it's for the motion container
          >
            {children}
          </motion.main>
        </AnimatePresence>
        {/* <main className="p-4">{children}</main> original main element, padding moved to motion.main */}
        {/* TODO: Add Footer or other global elements if needed */}
      </CartProvider>
    </QueryProvider>
  );
} 