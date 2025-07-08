import React, { useState } from "react";

const FORECAST_OPTIONS = [
  {
    key: "live",
    label: "Live Footfall Forecast",
    icon: "🔵",
    implemented: true,
  },
  {
    key: "dwell",
    label: "Average Dwell Time",
    icon: "⏱",
    implemented: true,
  },
  {
    key: "congestion",
    label: "Predicted Zone Congestion",
    icon: "🚥",
    implemented: false,
  },
  {
    key: "rebalancing",
    label: "Route Rebalancing Heatmap",
    icon: "🔁",
    implemented: false,
  },
];

const ZONES = [
  { name: "Produce", visitors: 12, dwell: 180, forecast: 0.7 },
  { name: "Bakery", visitors: 5, dwell: 90, forecast: 0.3 },
  { name: "Frozen", visitors: 18, dwell: 240, forecast: 0.85 },
  { name: "Dairy", visitors: 8, dwell: 110, forecast: 0.5 },
  { name: "Checkout", visitors: 22, dwell: 60, forecast: 0.95 },
];

function getColor(val: number, type: "visitors" | "dwell" | "forecast") {
  if (type === "visitors" || type === "forecast") {
    if (val < 10 || val < 0.5) return "bg-green-200 border-green-600";
    if (val < 18 || val < 0.8) return "bg-yellow-200 border-yellow-600";
    return "bg-red-200 border-red-600";
  }
  if (type === "dwell") {
    if (val < 120) return "bg-green-200 border-green-600";
    if (val < 200) return "bg-yellow-200 border-yellow-600";
    return "bg-red-200 border-red-600";
  }
  return "";
}

const AI_RECOMMENDATIONS = [
  "📍 Consider redirecting entry flow",
  "🔄 Rotate cold SKUs to Produce section",
  "📦 Redirect SKUs to adjacent aisles",
];

const ForecastZonePanel: React.FC = () => {
  const [tab, setTab] = useState<"live" | "dwell" | "congestion" | "rebalancing">("live");

  const renderContent = () => {
    if (tab === "live") {
      return (
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border-2 shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-bold text-blue-800 mb-2">Live Footfall by Zone</h2>
              <div className="grid grid-cols-2 gap-4 w-full">
                {ZONES.map((zone) => (
                  <div
                    key={zone.name}
                    className={`rounded-xl border-2 p-4 flex flex-col items-center shadow transition-all duration-200 hover:scale-105 ${getColor(
                      zone.visitors,
                      "visitors"
                    )}`}
                    title={`Current visitors: ${zone.visitors}`}
                  >
                    <span className="text-base font-semibold text-blue-900">{zone.name}</span>
                    <span className="text-2xl mt-2 font-extrabold text-blue-900">{zone.visitors}</span>
                    <span className="text-xs mt-1 text-gray-700 uppercase tracking-wider">visitors</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-100 rounded-xl p-4 text-blue-800 text-sm shadow">
              Color indicates live crowding (green = low, red = high).
            </div>
          </div>
          <div className="hidden md:block w-1/3">
            <div className="bg-white rounded-2xl border-2 shadow-lg p-6 h-full flex flex-col items-center justify-center">
              <span className="text-5xl mb-2">🛒</span>
              <div className="text-blue-900 font-semibold text-lg text-center">
                Real-time footfall helps optimize staff allocation and product placement.
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (tab === "dwell") {
      return (
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border-2 shadow-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-bold text-blue-800 mb-2">Average Dwell Time by Zone</h2>
              <div className="grid grid-cols-2 gap-4 w-full">
                {ZONES.map((zone) => (
                  <div
                    key={zone.name}
                    className={`rounded-xl border-2 p-4 flex flex-col items-center shadow transition-all duration-200 hover:scale-105 ${getColor(
                      zone.dwell,
                      "dwell"
                    )}`}
                    title={`Avg dwell: ${zone.dwell}s`}
                  >
                    <span className="text-base font-semibold text-blue-900">{zone.name}</span>
                    <span className="text-xl mt-2 font-extrabold text-blue-900">
                      {Math.floor(zone.dwell / 60)
                        .toString()
                        .padStart(2, "0")}
                      :{(zone.dwell % 60).toString().padStart(2, "0")}
                    </span>
                    <span className="text-xs mt-1 text-gray-700 uppercase tracking-wider">mm:ss</span>
                    {zone.dwell > 200 && (
                      <span className="mt-2 text-xs text-yellow-700 italic bg-yellow-100 px-2 py-1 rounded">
                        High dwell time detected
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-100 rounded-xl p-4 text-blue-800 text-sm shadow">
              Color indicates dwell duration (green = short, red = long).
            </div>
          </div>
          <div className="hidden md:block w-1/3">
            <div className="bg-white rounded-2xl border-2 shadow-lg p-6 h-full flex flex-col items-center justify-center">
              <span className="text-5xl mb-2">⏱️</span>
              <div className="text-blue-900 font-semibold text-lg text-center">
                Longer dwell times may indicate product interest or congestion.
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Placeholder for unimplemented tabs
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[200px] bg-white rounded-2xl shadow-lg border-2 border-dashed border-blue-200 p-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center gap-2">
          {FORECAST_OPTIONS.find((opt) => opt.key === tab)?.icon}
          {FORECAST_OPTIONS.find((opt) => opt.key === tab)?.label}
        </h2>
        <div className="text-gray-500 text-center">Coming soon: Feature under development.</div>
        <div className="mt-6 flex flex-col items-center">
          <span className="text-5xl mb-2">🚧</span>
          <span className="text-blue-900 font-semibold text-base">Stay tuned for more insights!</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="fixed top-0 left-0 w-full h-2 bg-yellow-400 z-10 shadow-md" />
      <div className="flex-1 flex flex-col items-center justify-start p-4 md:p-10 pt-14">
        {/* Header */}
        <div className="w-full flex items-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight drop-shadow-sm">
            In-Store Traffic Heatmap
          </h1>
        </div>

        {/* Dynamic Tabs */}
        <div className="w-full flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-full shadow border border-blue-100 px-2 py-1">
            {FORECAST_OPTIONS.map((opt, idx) => (
              <button
                key={opt.key}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold focus:outline-none transition-all duration-150
                  ${tab === opt.key
                    ? "bg-blue-600 text-white shadow border border-blue-700"
                    : "bg-transparent text-blue-900 hover:bg-blue-100"}
                  ${!opt.implemented ? "opacity-50 cursor-not-allowed" : ""}
                  ${idx !== 0 ? "ml-1" : ""}
                `}
                onClick={() => opt.implemented && setTab(opt.key as any)}
                disabled={!opt.implemented}
              >
                <span className="text-xl">{opt.icon}</span>
                {opt.label}
                {!opt.implemented && (
                  <span className="ml-2 text-xs text-gray-400">(Soon)</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full max-w-5xl">{renderContent()}</div>
      </div>

      {/* AI Recommendations Sidebar */}
      <div className="w-80 min-w-[18rem] bg-white border-l border-blue-200 p-6 flex flex-col pt-14 shadow-lg">
        <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
          🧪 AI Recommendations
        </h3>
        <ul className="space-y-3">
          {AI_RECOMMENDATIONS.map((rec, i) => (
            <li
              key={i}
              className="text-blue-900 bg-blue-50 rounded-xl px-4 py-3 border border-blue-100 shadow"
            >
              {rec}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col items-center">
          <span className="text-2xl mb-2">💡</span>
          <span className="text-blue-700 text-sm text-center">
            Use these insights to optimize store operations and customer experience.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForecastZonePanel;
