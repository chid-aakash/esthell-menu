"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

const container: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
};

export default function HomePage() {
  return (
    <main className="relative isolate h-[calc(100dvh-4rem)] flex flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* animated background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 animate-drift bg-[conic-gradient(at_top_left,_theme(colors.sky.900)_0%,theme(colors.blue.950)_25%,theme(colors.sky.800)_50%,theme(colors.amber.400)_100%)] opacity-90"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0%,_transparent_70%)]"
      />

      {/* content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center gap-10"
      >
        <motion.h1
          variants={item}
          className="text-5xl font-extrabold tracking-tight text-white drop-shadow-lg md:text-6xl"
        >
          Welcome to&nbsp;
          <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
            Esthell
          </span>
        </motion.h1>

        <motion.div
          variants={item}
          className="flex w-full max-w-xs justify-center gap-5"
        >
          {/* View Menu */}
          <Button
            asChild
            size="lg"
            className="group relative w-full backdrop-blur-md bg-white/15 border border-white/30 text-white shadow-xl 
                       hover:bg-white/25 focus-visible:ring-2 focus-visible:ring-amber-300 
                       transition-all duration-200"
          >
            <Link href="/menu">
              <span className="inline-block group-hover:translate-y-px group-active:translate-y-0.5 transition-transform">
                View&nbsp;Menu
              </span>
            </Link>
          </Button>

          {/* Room Service (disabled) */}
          <Button
            size="lg"
            disabled
            className="w-full bg-white/10 border border-white/20 text-white/60 cursor-not-allowed backdrop-blur-md"
          >
            Room&nbsp;Service
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
