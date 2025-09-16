import { createContext, useContext, useMemo, useState } from "react";
import type { Product, CartLineItem, Category } from "@shared/api";
import { toast } from "sonner";

interface ShopContextValue {
  products: Product[];
  cart: CartLineItem[];
  wishlist: Set<string>;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  toggleWishlist: (id: string) => void;
  subtotal: number;
  search: string;
  setSearch: (q: string) => void;
  activeCategories: Set<Category>;
  toggleCategory: (c: Category) => void;
  visibleProducts: Product[];
}

const ShopContext = createContext<ShopContextValue | null>(null);

const sampleProducts: Product[] = [
  {
    id: "p1",
    name: "Golden Pothos",
    category: "Plants",
    price: 349,
    originalPrice: 499,
    rating: 4.7,
    tags: ["easy", "air-purifier"],
    imageUrl: "/placeholder.svg",
    inStock: true,
    description: "Hardy indoor vine with heart-shaped leaves; thrives in indirect light.",
  },
  {
    id: "p2",
    name: "Snake Plant",
    category: "Plants",
    price: 399,
    originalPrice: 449,
    rating: 4.8,
    tags: ["low-light"],
    imageUrl: "/placeholder.svg",
    inStock: true,
  },
  {
    id: "p3",
    name: "Terracotta Pot (8 in)",
    category: "Pots",
    price: 199,
    rating: 4.4,
    imageUrl: "/placeholder.svg",
    inStock: true,
  },
  {
    id: "p4",
    name: "Organic Potting Mix (5kg)",
    category: "Soil",
    price: 299,
    rating: 4.6,
    imageUrl: "/placeholder.svg",
    inStock: true,
  },
  {
    id: "p5",
    name: "Pruning Shears",
    category: "Tools",
    price: 249,
    rating: 4.5,
    imageUrl: "/placeholder.svg",
    inStock: true,
  },
  {
    id: "p6",
    name: "Self-watering Pot",
    category: "Pots",
    price: 449,
    originalPrice: 549,
    rating: 4.3,
    imageUrl: "/placeholder.svg",
    inStock: true,
  },
  {
    id: "p7",
    name: "Areca Palm",
    category: "Plants",
    price: 799,
    rating: 4.6,
    imageUrl: "/placeholder.svg",
    inStock: true,
  },
  {
    id: "p8",
    name: "Watering Can",
    category: "Tools",
    price: 199,
    rating: 4.1,
    imageUrl: "/placeholder.svg",
    inStock: true,
  },
];

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products] = useState<Product[]>(sampleProducts);
  const [cart, setCart] = useState<CartLineItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(new Set());

  const addToCart = (id: string) => {
    setCart((prev) => {
      const found = prev.find((l) => l.productId === id);
      const next = found
        ? prev.map((l) =>
            l.productId === id ? { ...l, quantity: l.quantity + 1 } : l,
          )
        : [...prev, { productId: id, quantity: 1 }];
      return next;
    });
    toast.success("Added to cart");
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((l) => l.productId !== id));
    toast("Removed from cart");
  };

  const changeQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) =>
          l.productId === id ? { ...l, quantity: Math.max(1, l.quantity + delta) } : l,
        )
        .filter((l) => l.quantity > 0),
    );
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, l) => {
      const p = products.find((x) => x.id === l.productId);
      if (!p) return sum;
      return sum + p.price * l.quantity;
    }, 0);
  }, [cart, products]);

  const visibleProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products;
    if (activeCategories.size) {
      list = list.filter((p) => activeCategories.has(p.category));
    }
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tags ?? []).some((t) => t.toLowerCase().includes(q)),
      );
    }
    return list;
  }, [products, search, activeCategories]);

  const toggleCategory = (c: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const value: ShopContextValue = {
    products,
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    changeQty,
    toggleWishlist,
    subtotal,
    search,
    setSearch,
    activeCategories,
    toggleCategory,
    visibleProducts,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
