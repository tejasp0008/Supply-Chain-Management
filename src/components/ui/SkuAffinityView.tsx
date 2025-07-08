import React from "react";
import { motion } from "framer-motion";

// --- InfoCard Component ---
const InfoCard = ({
  id,
  title,
  subtitle,
  icon,
  chart,
  footer,
  children,
  className = "",
}: {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  chart?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) => (
  <section
    id={id}
    className={`bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-6 focus:outline-none ${className}`}
    tabIndex={-1}
    aria-labelledby={`${id}-title`}
  >
    <div className="flex items-center gap-3 mb-2">
      {icon && <span className="text-2xl" aria-hidden="true">{icon}</span>}
      <h2 id={`${id}-title`} className="text-lg font-bold text-blue-900">{title}</h2>
    </div>
    {subtitle && <div className="text-blue-700 mb-2 text-sm">{subtitle}</div>}
    {chart && <div className="my-3">{chart}</div>}
    <div className="mb-2">{children}</div>
    {footer && <div className="mt-3 text-xs text-gray-500">{footer}</div>}
  </section>
);

// --- Mock Data ---
const bundleData = [
  { sku: "Garlic Bread", bundle: "Pasta + Marinara Sauce + Parmesan", score: 0.60 },
  { sku: "Oat Milk", bundle: "Cereal + Protein Bar", score: 0.75 },
  { sku: "Coffee Beans", bundle: "Disposable Cups + Coffee Filters", score: 0.65 },
  { sku: "Chips & Salsa", bundle: "Tortillas + Guacamole", score: 0.55 },
  { sku: "Headphones", bundle: "Bluetooth Speaker + Phone Case", score: 0.50 },
  { sku: "Shampoo", bundle: "Conditioner + Body Wash", score: 0.80 },
  { sku: "Gaming Mouse", bundle: "Mouse Pad + Wrist Rest", score: 0.45 },
];

const swapRates = [
  { pair: "Soy Milk → Oat Milk", rate: 80 },
  { pair: "Regular Bread → Gluten-Free Bread", rate: 65 },
  { pair: "Bottled Water → Sparkling Water", rate: 70 },
  { pair: "Standard Socks → Compression Socks", rate: 55 },
  { pair: "Dish Soap → Eco-Friendly Dish Tablet", rate: 50 },
  { pair: "Laundry Pods → Liquid Detergent", rate: 45 },
];

// --- Flex-Based Swap Chart ---
const SwapBarChart = ({ data }: { data: typeof swapRates }) => {
  const max = Math.max(...data.map((d) => d.rate));

  return (
    <div className="space-y-4">
      {data.map((d) => (
        <div key={d.pair} className="flex items-center">
          <div className="w-64 text-sm text-gray-800 truncate">{d.pair}</div>
          <div className="flex-1 bg-blue-100 rounded-full h-4 mx-2 relative overflow-hidden">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all"
              style={{ width: `${(d.rate / max) * 100}%` }}
            />
          </div>
          <div className="text-sm font-semibold text-blue-800 w-10 text-right">
            {d.rate}%
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Main View Component ---
const SkuAffinityView: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <motion.div
    className="w-full min-h-screen flex flex-col items-center justify-start p-4 md:p-8 bg-blue-50"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.4 }}
  >
    {/* Back Button */}
    <div className="w-full flex">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-6 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition"
        onClick={onBack}
        aria-label="Back to Dashboard"
        style={{ alignSelf: "flex-start" }}
      >
        ← Back to Dashboard
      </motion.button>
    </div>

    {/* Bundles & Swap Rates */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
      {/* Smart Bundles */}
      <InfoCard
        id="bundles"
        title="Smart Bundles"
        subtitle="Suggested product bundles based on affinity."
        icon={<span>📦</span>}
      >
        <table className="min-w-full text-left" aria-label="Smart Bundles Table">
          <thead>
            <tr className="text-gray-600 text-sm">
              <th className="py-1 pr-4">Primary SKU</th>
              <th className="py-1 pr-4">Bundle Components</th>
              <th className="py-1">Affinity Score</th>
            </tr>
          </thead>
          <tbody>
            {bundleData.map((row) => (
              <tr key={row.sku} className="border-b last:border-b-0" tabIndex={0} aria-label={`Bundle for ${row.sku}`}>
                <td className="py-2 pr-4 font-medium">{row.sku}</td>
                <td className="py-2 pr-4">{row.bundle}</td>
                <td className="py-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-900">
                    {row.score}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfoCard>

      {/* Swap Success Rates */}
      <InfoCard
        id="swap"
        title="Swap Success Rates"
        subtitle="Customer satisfaction with common substitutions."
        icon={<span>📊</span>}
      >
        <SwapBarChart data={swapRates} />
      </InfoCard>
    </div>

    {/* AI Recommendations */}
    <InfoCard id="ai" title="AI‑Driven Recommendations" icon={<span>🤖</span>}>
      <div className="text-blue-900 leading-relaxed">
        Based on our affinity network, Garlic Bread ↔ Pasta (0.60) and high swap satisfaction for Soy→Oat (80%), we recommend:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Pre‑bundle Pasta & Sauce near the bread aisle.</li>
          <li>Promote Oat Milk with bundled Protein Bars.</li>
          <li>Position extra disposable cups in Coffee Beans section.</li>
        </ul>
      </div>
    </InfoCard>
  </motion.div>
);

export default SkuAffinityView;
