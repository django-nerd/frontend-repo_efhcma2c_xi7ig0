export default function Cart({ cart, onPlaceOrder }) {
  const items = Object.values(cart);
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <aside className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm sticky top-20">
      <h3 className="font-semibold text-neutral-900">Your Cart</h3>
      <div className="mt-3 space-y-2 max-h-64 overflow-auto pr-1">
        {items.length === 0 && (
          <p className="text-sm text-neutral-500">Your cart is empty.</p>
        )}
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between text-sm">
            <span className="text-neutral-700">
              {it.name} × {it.qty}
            </span>
            <span className="font-medium">₹{it.price * it.qty}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <span className="text-sm text-neutral-600">Total</span>
        <span className="text-lg font-semibold">₹{total}</span>
      </div>
      <button
        disabled={items.length === 0}
        onClick={onPlaceOrder}
        className="mt-3 w-full h-10 rounded-md bg-neutral-900 text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Proceed
      </button>
    </aside>
  );
}
