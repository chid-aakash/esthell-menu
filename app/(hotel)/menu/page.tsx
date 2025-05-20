"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

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

  // For now, just display the raw data to verify fetching
  // Later steps will render this properly with tabs and dish cards
  return (
    <div>
      <h1 className="text-3xl font-bold my-6">Menu</h1>
      <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
        {JSON.stringify(menuData, null, 2)}
      </pre>
    </div>
  );
} 