import { useMemo, useState } from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import OrderForm from "./components/OrderForm";

function App() {
  const [activeTab, setActiveTab] = useState("customer");
  const [cart, setCart] = useState({});
  const [isPlacing, setIsPlacing] = useState(false);

  const cartCount = useMemo(
    () => Object.values(cart).reduce((s, it) => s + it.qty, 0),
    [cart]
  );

  const totalAmount = useMemo(
    () => Object.values(cart).reduce((s, it) => s + it.qty * it.price, 0),
    [cart]
  );

  const handlePlaceOrder = ({ customerName, paymentMethod }) => {
    if (!customerName) return;
    setIsPlacing(true);
    // In a full app this would send to Firestore; here we simulate success
    setTimeout(() => {
      const order = {
        customerName,
        items: Object.values(cart).map((it) => ({ id: it.id, name: it.name, qty: it.qty, price: it.price })),
        totalAmount,
        paymentMethod,
        status: "Pending",
        timestamp: new Date().toISOString(),
      };
      // Demo confirmation
      alert(`Order placed!\n\n${JSON.stringify(order, null, 2)}`);
      setCart({});
      setIsPlacing(false);
      setActiveTab("manager");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cartCount} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === "customer" ? (
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900">Order your favorites</h1>
            <p className="text-neutral-600 mt-1">Add items to your cart, enter your name, choose a payment method, and place your order.</p>

            <div className="mt-6 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Menu cart={cart} setCart={setCart} />
              </div>
              <div className="space-y-6">
                <Cart cart={cart} onPlaceOrder={() => {}} />
                <OrderForm onSubmit={handlePlaceOrder} isPlacing={isPlacing} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900">Manager dashboard</h1>
            <p className="text-neutral-600 mt-1">Live orders appear here instantly in the full version. Update status or remove orders as needed.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-xl bg-white border border-neutral-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-500">Customer</p>
                      <p className="font-medium">Alex #{i}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-800">Pending</span>
                  </div>
                  <div className="mt-3 space-y-1 text-sm">
                    <div className="flex justify-between"><span>Margherita Pizza × 1</span><span className="font-medium">₹299</span></div>
                    <div className="flex justify-between"><span>Masala Fries × 2</span><span className="font-medium">₹258</span></div>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t pt-3">
                    <span className="text-sm text-neutral-600">Total</span>
                    <span className="font-semibold">₹557</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button className="h-9 px-3 rounded-md bg-neutral-900 text-white text-sm">Mark completed</button>
                    <button className="h-9 px-3 rounded-md border border-neutral-300 text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="py-8 text-center text-sm text-neutral-500">
        Built for a real-time ordering experience — UI preview only.
      </footer>
    </div>
  );
}

export default App;
