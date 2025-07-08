import React, { useState } from "react";

interface StoreZone {
  id: string;
  name: string;
  visitors: number;
  avgDwellTime: string; // in mm:ss format
}

const ZONES: StoreZone[] = [
  { id: "entrance", name: "Entrance", visitors: 8, avgDwellTime: "0:30" },
  { id: "produce", name: "Produce", visitors: 12, avgDwellTime: "2:10" },
  { id: "snacks", name: "Snacks", visitors: 34, avgDwellTime: "1:45" },
  { id: "dairy", name: "Dairy", visitors: 9, avgDwellTime: "1:20" },
  { id: "frozen", name: "Frozen", visitors: 15, avgDwellTime: "1:05" },
  { id: "beverages", name: "Beverages", visitors: 6, avgDwellTime: "1:00" },
  { id: "health", name: "Health", visitors: 11, avgDwellTime: "0:50" },
  { id: "electronics", name: "Electronics", visitors: 28, avgDwellTime: "3:00" },
  { id: "offers", name: "Offers", visitors: 5, avgDwellTime: "0:40" },
  { id: "toiletries", name: "Toiletries", visitors: 7, avgDwellTime: "0:55" },
  { id: "bakery", name: "Bakery", visitors: 13, avgDwellTime: "1:30" },
  { id: "checkout", name: "Checkout", visitors: 31, avgDwellTime: "2:20" },
];

const AI_RECOMMENDATIONS = [
  "🎯 Congestion in Snacks zone — consider redirecting sweets to Aisle 3",
  "🎯 Low visibility in Toiletries — promote bundle offers",
  "🛒 High dwell time in Electronics — deploy associate for assistance",
];

function getFootfallColor(visitors: number): string {
  if (visitors >= 30) return "bg-red-500 text-white";
  if (visitors >= 10) return "bg-yellow-300 text-[#003087]";
  return "bg-green-300 text-[#003087]";
}

function getDwellColor(dwell: string): string {
  const [min, sec] = dwell.split(":").map(Number);
  const totalSec = min * 60 + sec;
  if (totalSec >= 150) return "bg-red-400 text-white"; // > 2.5 min
  if (totalSec >= 90) return "bg-yellow-300 text-[#003087]"; // 1.5–2.5 min
  return "bg-green-300 text-[#003087]"; // < 1.5 min
}

interface Props {
  initialTab?: "footfall" | "dwell";
}

const InStoreTrafficHeatmap: React.FC<Props> = ({ initialTab = "footfall" }) => {
  const [view, setView] = useState<"footfall" | "dwell">(initialTab);

  return (
    <div className="w-full flex flex-col md:flex-row gap-8">
      {/* Heatmap Grid */}
      <div className="flex-1">
        {/* Toggle Buttons */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setView("footfall")}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              view === "footfall"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Live Footfall
          </button>
          <button
            onClick={() => setView("dwell")}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              view === "dwell"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Average Dwell Time
          </button>
        </div>

        {/* Zone Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {ZONES.map((zone) => (
            <div
              key={zone.id}
              className={`rounded-xl p-4 flex flex-col items-center justify-center aspect-square shadow text-sm sm:text-base font-semibold ${
                view === "footfall"
                  ? getFootfallColor(zone.visitors)
                  : getDwellColor(zone.avgDwellTime)
              }`}
            >
              <span>{zone.name}</span>
              {view === "footfall" ? (
                <span className="mt-2 text-lg">{zone.visitors} Visitors</span>
              ) : (
                <span className="mt-2 text-lg">{zone.avgDwellTime} min</span>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 text-sm font-medium mt-6">
          <span className="flex items-center gap-1">
            <span className="text-red-400 text-lg">🔴</span>High
          </span>
          <span className="flex items-center gap-1">
            <span className="text-yellow-300 text-lg">🟡</span>Medium
          </span>
          <span className="flex items-center gap-1">
            <span className="text-green-300 text-lg">🟢</span>Low
          </span>
        </div>
      </div>

      {/* AI Assistant Sidebar */}
      <aside className="w-full md:w-80 bg-white rounded-2xl shadow p-6 flex flex-col gap-4 h-fit">
        <h3 className="text-lg font-bold mb-2 text-[#003087]">AI Recommendations</h3>
        <ul className="space-y-3">
          {AI_RECOMMENDATIONS.map((rec, i) => (
            <li key={i} className="text-gray-700">{rec}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default InStoreTrafficHeatmap;
