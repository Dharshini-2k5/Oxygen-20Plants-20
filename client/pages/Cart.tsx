import Layout from "@/components/layout/Layout";
import { useShop } from "@/context/shop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CartPage() {
  const { cart, products, changeQty, removeFromCart, subtotal } = useShop();
  const items = cart.map((l) => ({ line: l, product: products.find((p) => p.id === l.productId)! }));

  return (
    <Layout>
      <section className="container py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          {items.length === 0 ? (
            <p className="text-muted-foreground">Your cart is empty.</p>
          ) : (
            items.map(({ line, product }) => (
              <div key={line.productId} className="grid grid-cols-[80px_1fr_auto] items-center gap-4 rounded-lg border p-4">
                <img src={product.imageUrl} alt={product.name} className="h-20 w-20 rounded object-cover" />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-muted-foreground">₹{product.price} • {product.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" onClick={() => changeQty(product.id, -1)}>-</Button>
                  <Input className="w-14 text-center" readOnly value={line.quantity} />
                  <Button variant="secondary" size="sm" onClick={() => changeQty(product.id, 1)}>+</Button>
                  <Button variant="ghost" onClick={() => removeFromCart(product.id)}>Remove</Button>
                </div>
              </div>
            ))
          )}
        </div>
        <aside className="space-y-4 self-start rounded-lg border p-6">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>
          <Button className="w-full" asChild>
            <a href="/checkout">Proceed to Checkout</a>
          </Button>
        </aside>
      </section>
    </Layout>
  );
}
