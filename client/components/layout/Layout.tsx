import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Heart, Leaf, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/shop";
import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const { cart, wishlist, search, setSearch } = useShop();
  const cartCount = cart.reduce((s, l) => s + l.quantity, 0);
  const wishlistCount = wishlist.size;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-gradient-to-b from-background/95 to-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-xl tracking-tight">
          <Leaf className="text-primary" />
          Oxygen Plants
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <NavItem to="/" label="Home" />
          <NavItem to="/products" label="Products" />
        </div>

        <div className="flex items-center gap-2 w-[45%] max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
              placeholder="Search plants, pots, tools..."
            />
          </div>
          <Link to="/cart" aria-label="Cart" className="relative">
            <Button variant="secondary" size="icon">
              <ShoppingCart />
            </Button>
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative">
            <Button variant="secondary" size="icon">
              <Heart />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "transition-colors hover:text-primary",
          isActive ? "text-primary font-semibold" : "text-muted-foreground",
        )
      }
    >
      {label}
    </NavLink>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-8 text-sm text-muted-foreground grid md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Leaf className="text-primary" /> Oxygen Plants
          </div>
          <p className="mt-2 max-w-sm">
            Healthy plants, thoughtful tools, and beautiful pots delivered to your door.
          </p>
        </div>
        <div>
          <p className="font-semibold text-foreground">Shop</p>
          <ul className="mt-2 space-y-1">
            <li><a href="/products" className="hover:text-primary">All products</a></li>
            <li><a href="/" className="hover:text-primary">Plants</a></li>
            <li><a href="/" className="hover:text-primary">Pots</a></li>
            <li><a href="/" className="hover:text-primary">Tools</a></li>
          </ul>
        </div>
        <div className="md:text-right">
          <p className="font-semibold text-foreground">Need help?</p>
          <p className="mt-2">hello@oxygenplants.example</p>
          <p className="mt-1">Mon–Sat, 9am–6pm</p>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Oxygen Plants. All rights reserved.</div>
    </footer>
  );
}
