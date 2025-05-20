"use client"; // <-- Add this for Framer Motion

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion"; // Import motion

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-68px)] flex flex-col items-center justify-center overflow-hidden">
      {/* 68px is an assumption for header height (p-4 on header is 16px padding top/bottom = 32px + text line height etc.) */}
      {/* A more robust solution for header height might be needed if it's dynamic */}
      
      {/* Background Gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "linear-gradient(to bottom right, var(--colors-brand-primary), #002A4D, var(--colors-brand-accent))",
          // Using Tailwind arbitrary values with theme() might be better for direct color names if CSS variables aren't picked up here:
          // backgroundImage: "linear-gradient(to bottom right, theme('colors.brand-primary'), #002A4D, theme('colors.brand-accent'))",
          opacity: 0.9, // Adjust opacity as needed
        }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-12 drop-shadow-md">
          Welcome to Esthell
        </h1>
        <div className="flex space-x-6">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Button asChild size="lg" className="bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-white shadow-lg transition-all duration-300">
              <Link href="/menu">View Menu</Link>
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Button variant="outline" size="lg" disabled className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white/70 shadow-lg opacity-70 cursor-not-allowed">
              Room Service
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
