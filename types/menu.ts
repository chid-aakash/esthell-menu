export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  cookTimeMinutes: number;
  imageUrl: string;
  images?: string[]; // For carousel in DishSheet
  // Add other fields as needed, e.g., allergens, nutritional_info
}

export interface Category {
  id: string;
  name: string;
  dishes: Dish[];
}

export interface MenuData {
  categories: Category[];
} 