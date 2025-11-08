import { Plus, Minus } from "lucide-react";

const sampleMenu = [
  { id: 1, name: "Margherita Pizza", price: 299, desc: "Classic delight with 100% real mozzarella" },
  { id: 2, name: "Veggie Burger", price: 199, desc: "Crispy patty, fresh veggies, signature sauce" },
  { id: 3, name: "Pasta Alfredo", price: 249, desc: "Creamy white sauce with herbs" },
  { id: 4, name: "Masala Fries", price: 129, desc: "Spiced golden fries" },
];

export default function Menu({ cart, setCart }) {
  const addItem = (item) => {
    setCart((prev) => {
      const existing = prev[item.id] || { ...item, qty: 0 };
      return { ...prev, [item.id]: { ...existing, qty: existing.qty + 1 } };
    });
  };

  const removeItem = (item) => {
    setCart((prev) => {
      const existing = prev[item.id];
      if (!existing) return prev;
      const newQty = existing.qty - 1;
      const next = { ...prev };
      if (newQty <= 0) delete next[item.id];
      else next[item.id] = { ...existing, qty: newQty };
      return next;
    });
  };

  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sampleMenu.map((item) => {
        const qty = cart[item.id]?.qty || 0;
        return (
          <div key={item.id} className="p-4 rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-neutral-900">{item.name}</h3>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
              <span className="font-semibold">₹{item.price}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  className="h-8 w-8 grid place-items-center rounded-md border border-neutral-200 hover:bg-neutral-50"
                  onClick={() => removeItem(item)}
                  aria-label="decrease"
                >
                  <Minus size={16} />
                </button>
                <span className="min-w-[2ch] text-center font-medium">{qty}</span>
                <button
                  className="h-8 w-8 grid place-items-center rounded-md bg-neutral-900 text-white hover:bg-black"
                  onClick={() => addItem(item)}
                  aria-label="increase"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                onClick={() => addItem(item)}
              >
                Add to cart
              </button>
            </div>
          </div>
        );
      })}
    </section>
  );
}
