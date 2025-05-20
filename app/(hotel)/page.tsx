import React from "react";

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
        <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-md">
          Welcome to Esthell
        </h1>
        {/* Buttons from Step 2.2 will go here */}
      </div>
    </div>
  );
}
