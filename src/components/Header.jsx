import { ChefHat, ShoppingCart, LayoutDashboard } from "lucide-react";

export default function Header({ activeTab, setActiveTab, cartCount = 0 }) {
  const tabs = [
    { id: "customer", label: "Customer", icon: ShoppingCart },
    { id: "manager", label: "Manager", icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-orange-500 to-rose-500 grid place-items-center text-white shadow">
            <ChefHat size={18} />
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-neutral-900">Eatery Hub</p>
            <p className="text-xs text-neutral-500 -mt-0.5">Real-time ordering</p>
          </div>
        </div>

        <nav className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
                  isActive
                    ? "bg-white shadow text-neutral-900"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                <Icon size={16} /> {t.label}
                {t.id === "customer" && (
                  <span className="ml-1 text-xs text-white bg-neutral-900 rounded px-1.5 py-0.5">
                    {cartCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
