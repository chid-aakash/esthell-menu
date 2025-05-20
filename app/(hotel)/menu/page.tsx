"use client";

import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DishCard from "@/components/menu/dish-card";

// Define interfaces for the menu data structure
interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  cookTimeMinutes: number;
  imageUrl: string;
}

interface Category {
  id: string;
  name: string;
  dishes: Dish[];
}

interface MenuData {
  categories: Category[];
}

async function fetchMenu(): Promise<MenuData> {
  const res = await fetch("/menu.dummy.json");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}

export default function MenuPage() {
  const { data: menuData, isLoading, error } = useQuery<MenuData, Error>({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    // Select the first category by default if menuData is available
    if (menuData?.categories && menuData.categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(menuData.categories[0].id);
    }
  }, [menuData, selectedCategoryId]);

  useEffect(() => {
    // Scroll to active tab
    if (selectedCategoryId && tabRefs.current[selectedCategoryId]) {
      tabRefs.current[selectedCategoryId]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center", // Try to center the tab
      });
    }
  }, [selectedCategoryId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-150px)]">
        <p className="text-xl">Loading menu...</p>
        {/* TODO: Add a nice spinner/skeleton loader */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-150px)]">
        <p className="text-xl text-red-500">Error loading menu: {error.message}</p>
      </div>
    );
  }

  if (!menuData) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-150px)]">
        <p className="text-xl">No menu data found.</p>
      </div>
    );
  }

  const currentCategory = menuData.categories.find(c => c.id === selectedCategoryId);

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6 px-4 sm:px-6">Menu</h1>
      
      <ScrollArea className="w-full whitespace-nowrap border-b">
        <div className="flex space-x-1 px-4 sm:px-6 pb-3">
          {menuData.categories.map((category) => (
            <Button
              key={category.id}
              ref={(el) => { tabRefs.current[category.id] = el; }}
              variant="ghost"
              size="sm"
              className={cn(
                "h-auto py-2 px-4 transition-all duration-150 ease-in-out",
                selectedCategoryId === category.id
                  ? "bg-brand-accent text-brand-accent-foreground shadow-sm scale-105"
                  : "text-muted-foreground hover:bg-gray-100 dark:hover:bg-gray-800"
              )}
              onClick={() => setSelectedCategoryId(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>

      <div className="mt-6 px-4 sm:px-6">
        {currentCategory ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">{currentCategory.name}</h2>
            {currentCategory.dishes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentCategory.dishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No dishes in this category yet.</p>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">Select a category to see the dishes.</p>
        )}
      </div>
    </div>
  );
} 