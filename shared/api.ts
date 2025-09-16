/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// E-commerce shared types
export type Category =
  | "Plants"
  | "Pots"
  | "Tools"
  | "Seeds"
  | "Soil"
  | "Accessories";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number; // current price in INR (or chosen currency smallest unit outside of this type)
  originalPrice?: number; // if present, shows a discount
  rating?: number; // 0-5
  tags?: string[];
  imageUrl: string;
  inStock: boolean;
  description?: string;
}

export interface CartLineItem {
  productId: string;
  quantity: number;
}
