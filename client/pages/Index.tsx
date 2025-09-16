import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/shop/ProductCard";
import { useShop } from "@/context/shop";
import { Sprout, Scissors, Package2, Leaf } from "lucide-react";
import type { Category } from "@shared/api";

const CATEGORY_META: { key: Category; label: string; icon: React.ComponentType<any> }[] = [
  { key: "Plants", label: "Plants", icon: Sprout },
  { key: "Pots", label: "Pots", icon: Package2 },
  { key: "Tools", label: "Tools", icon: Scissors },
  { key: "Soil", label: "Soil & Mix", icon: Leaf },
  { key: "Seeds", label: "Seeds", icon: Leaf },
  { key: "Accessories", label: "Accessories", icon: Leaf },
];

export default function Index() {
  const { visibleProducts, activeCategories, toggleCategory } = useShop();

  return (
    <Layout>
      {/* HERO */}
      <section className="container grid lg:grid-cols-2 gap-10 items-center py-10 md:py-16">
        <div>
          <Badge className="bg-primary/15 text-primary" variant="secondary">Free delivery over ₹999</Badge>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Grow a happier home with GreenNest Nursery
          </h1>
          <p className="mt-3 text-muted-foreground max-w-prose">
            Premium indoor plants, eco-friendly pots, and gardener-approved tools. Handpicked for beginners and pros alike.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#shop">Shop bestsellers</a>
            </Button>
            <Button variant="secondary" asChild>
              <a href="/products">Browse all</a>
            </Button>
          </div>
          <ul className="mt-6 grid grid-cols-3 gap-4 text-sm">
            <li className="rounded-lg border p-3 text-center">
              100+ plants
            </li>
            <li className="rounded-lg border p-3 text-center">7-day plant guarantee</li>
            <li className="rounded-lg border p-3 text-center">Secure payments</li>
          </ul>
        </div>
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-primary/15 via-emerald-200/40 to-transparent blur-2xl" />
          <div className="aspect-[4/3] overflow-hidden rounded-3xl border shadow-xl bg-muted/40">
            <img src="/placeholder.svg" alt="Featured plant" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* CATEGORY FILTERS */}
      <section className="container py-4">
        <div className="flex flex-wrap gap-3">
          {CATEGORY_META.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => toggleCategory(key)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${activeCategories.has(key) ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}
            >
              <Icon /> {label}
            </button>
          ))}
        </div>
      </section>

      {/* PROMO STRIP */}
      <section className="container">
        <div className="rounded-xl border bg-gradient-to-r from-emerald-50 to-teal-50 p-4 md:p-6">
          <p className="text-sm md:text-base"><span className="font-semibold">Spring Offer:</span> Get 15% off on 3+ plants. Use code <span className="font-mono font-semibold">GREEN15</span>.</p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="shop" className="container py-10 md:py-14">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Recommended for you</h2>
            <p className="text-muted-foreground">Curated picks that thrive indoors</p>
          </div>
          <a href="/products" className="text-sm text-primary hover:underline">View all</a>
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {visibleProducts.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="container pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">Expert support</h3>
            <p className="text-sm text-muted-foreground mt-1">Care guides and plant doctors on chat.</p>
          </div>
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">Sustainable packaging</h3>
            <p className="text-sm text-muted-foreground mt-1">Plastic-free, secure, and recyclable.</p>
          </div>
          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">Quality guarantee</h3>
            <p className="text-sm text-muted-foreground mt-1">No-questions 7-day replacement.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
