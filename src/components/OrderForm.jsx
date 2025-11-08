import { useState } from "react";

export default function OrderForm({ onSubmit, isPlacing }) {
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ customerName: customerName.trim(), paymentMethod });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold text-neutral-900">Customer details</h3>

      <label className="block mt-3 text-sm font-medium text-neutral-700">Name</label>
      <input
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="e.g., Alex Johnson"
        className="mt-1 w-full h-10 px-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
        required
      />

      <label className="block mt-4 text-sm font-medium text-neutral-700">Payment method</label>
      <div className="mt-2 flex gap-2">
        {["Cash", "UPI", "Card"].map((m) => (
          <button
            type="button"
            key={m}
            onClick={() => setPaymentMethod(m)}
            className={`px-3 h-9 rounded-md border text-sm ${
              paymentMethod === m
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white border-neutral-300 text-neutral-700"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <button
        type="submit"
        disabled={isPlacing}
        className="mt-4 w-full h-10 rounded-md bg-gradient-to-br from-orange-600 to-rose-600 text-white font-medium disabled:opacity-50"
      >
        {isPlacing ? "Placing order..." : "Place order"}
      </button>
    </form>
  );
}
