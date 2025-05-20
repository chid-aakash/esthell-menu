import React from "react";
import { cn } from "@/lib/utils";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "secondary"; // Add more variants as needed
}

const chipVariants = {
  default: "bg-primary/10 text-primary border border-primary/20",
  outline: "border border-input text-foreground",
  secondary: "bg-secondary text-secondary-foreground",
};

export default function Chip({ className, variant = "default", ...props }: ChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        chipVariants[variant],
        className
      )}
      {...props}
    />
  );
} 