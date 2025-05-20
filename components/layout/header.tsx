"use client"; // Since it uses useSearchParams

import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image"; // For logo, if we use an image file
import Link from "next/link";

export default function Header() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("r");

  return (
    <header className="bg-brand-primary text-brand-primary-foreground p-4 flex justify-between items-center shadow-md">
      <Link href="/" className="flex items-center space-x-2">
        {/* Placeholder for Logo */}
        {/* <Image src="/logo.png" alt="Esthell Hotel Logo" width={40} height={40} /> */}
        <div className="bg-brand-accent text-brand-accent-foreground font-bold p-2 rounded">LOGO</div>
        <h1 className="text-xl font-semibold">Esthell Hotel</h1>
      </Link>
      {roomId && (
        <div className="text-sm">
          Room: <span className="font-semibold">{roomId}</span>
        </div>
      )}
    </header>
  );
} 