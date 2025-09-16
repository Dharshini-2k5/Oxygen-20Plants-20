import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@shared/api";
import { useShop } from "@/context/shop";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const wishlisted = wishlist.has(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <Card className="group overflow-hidden">
      <div className="aspect-square overflow-hidden bg-muted/40">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h3 className="font-semibold leading-tight">{product.name}</h3>
          </div>
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label="Toggle wishlist"
            className={`rounded-full p-2 transition-colors ${wishlisted ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
          >
            <Heart fill={wishlisted ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-lg font-bold">₹{product.price}</span>
              <span className="text-sm line-through text-muted-foreground">₹{product.originalPrice}</span>
            </>
          ) : (
            <span className="text-lg font-bold">₹{product.price}</span>
          )}
          {typeof product.rating === "number" && (
            <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="text-yellow-500" /> {product.rating.toFixed(1)}
            </span>
          )}
        </div>
        <Button className="mt-3 w-full" onClick={() => addToCart(product.id)}>
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
}
