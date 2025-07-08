import React from "react";
import { motion } from "framer-motion";

const congestionData = [
  { zone: "Dairy", load: 78, alert: "Medium" },
  { zone: "Checkout", load: 92, alert: "High" },
  { zone: "Electronics", load: 64, alert: "Low" },
];

const alertColor = (level: string) => {
  if (level === "High") return "bg-red-500 text-white";
  if (level === "Medium") return "bg-yellow-400 text-gray-900";
  return "bg-green-500 text-white";
};

const ForecastZonesView: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <motion.div
    className="w-full h-full flex flex-col items-center justify-start p-4 md:p-8 bg-blue-50 min-h-screen"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.4 }}
  >
    {/* Back Button */}
    <button
      className="mb-6 self-start px-4 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium"
      onClick={onBack}
    >
      ← Back
    </button>

    <div className="flex flex-col gap-6 w-full max-w-3xl">
      {/* Weather Forecast Insight */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">🌦 24‑Hour Weather Impact</h2>
        <div className="mb-2 text-blue-900">
          Expect scattered thunderstorms at <b>3 PM</b> → <b>+25% umbrella picks</b> in Produce & Snacks sections.
        </div>
        <div className="flex flex-wrap gap-6 items-end">
          <div>
            <div className="text-3xl font-bold text-blue-700">27°C</div>
            <div className="text-gray-500 text-sm">Temperature</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-700">80%</div>
            <div className="text-gray-500 text-sm">Precipitation</div>
          </div>
          {/* Bar chart mock */}
          <div className="flex items-end gap-1 h-16 mt-2">
            <div className="w-3 h-8 bg-blue-300 rounded"></div>
            <div className="w-3 h-12 bg-blue-400 rounded"></div>
            <div className="w-3 h-16 bg-blue-600 rounded"></div>
            <div className="w-3 h-10 bg-blue-200 rounded"></div>
            <div className="w-3 h-6 bg-blue-100 rounded"></div>
          </div>
          <span className="ml-2 text-xs text-gray-400">Bar chart: Rainfall by hour</span>
        </div>
      </section>

      {/* Economic Forecast Insight */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">📈 Consumer Spending Index</h2>
        <div className="mb-2 text-blue-900">
          Local CPI up <b>1.2%</b> this week → <b>15% lift</b> in value‑line product sales (toiletries, snacks).
        </div>
        <div className="flex items-center gap-8">
          <div>
            <div className="text-3xl font-bold text-blue-700">104.7</div>
            <div className="text-gray-500 text-sm">CPI Index</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">+1.2%</div>
            <div className="text-gray-500 text-sm">MoM Change</div>
          </div>
          {/* Sparkline mock */}
          <div className="flex items-end gap-1 h-8">
            <div className="w-2 h-2 bg-green-300 rounded"></div>
            <div className="w-2 h-4 bg-green-400 rounded"></div>
            <div className="w-2 h-6 bg-green-600 rounded"></div>
            <div className="w-2 h-4 bg-green-400 rounded"></div>
            <div className="w-2 h-3 bg-green-300 rounded"></div>
          </div>
          <span className="ml-2 text-xs text-gray-400">Sparkline: CPI trend</span>
        </div>
      </section>

      {/* Future Congestion Forecast */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">🚦 Anticipated Zone Congestion (Next 60 Mins)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-600 text-sm">
                <th className="py-1 pr-4">Zone</th>
                <th className="py-1 pr-4">Predicted Load</th>
                <th className="py-1">Alert Level</th>
              </tr>
            </thead>
            <tbody>
              {congestionData.map((row) => (
                <tr key={row.zone} className="border-b last:border-b-0">
                  <td className="py-2 pr-4 font-medium">{row.zone}</td>
                  <td className="py-2 pr-4">{row.load}%</td>
                  <td className="py-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${alertColor(row.alert)}`}>
                      {row.alert}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AI Synthesis Recommendations */}
      <section className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">🤖 AI‑Driven Action Plan</h2>
        <div className="text-blue-900 leading-relaxed">
          Based on incoming thunderstorms and a 1.2% CPI rise, we forecast <b>Checkout</b> will hit <b>92% load</b> in the next hour.<br />
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>📦 Pre‑stage additional handheld scanners at Dairy & Checkout.</li>
            <li>🔄 Move 30% of umbrella and rain‑boot stock to end‑caps near entrance.</li>
            <li>🛒 Promote value‑line bundles for toiletries to leverage CPI‑driven demand.</li>
          </ul>
        </div>
      </section>
    </div>
  </motion.div>
);

export default ForecastZonesView;
