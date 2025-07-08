import React, { useState } from "react";

interface Props {
  initialTab?: "footfall" | "dwell";
}

const getColor = (loadFactor: number) => {
  if (loadFactor >= 0.75) return "bg-red-500";
  if (loadFactor >= 0.4) return "bg-yellow-400";
  return "bg-green-400";
};

const getDwellInSeconds = (dwell: string): number => {
  const [min, sec] = dwell.replace(" min", "").split(":").map(Number);
  return min * 60 + sec;
};

const getDwellColor = (dwell: string) => {
  const seconds = getDwellInSeconds(dwell);
  if (seconds >= 150) return "bg-red-400";
  if (seconds >= 90) return "bg-yellow-300";
  return "bg-green-300";
};

const mockZones = [
  { region: "TX-01", loadFactor: 0.82 },
  { region: "CA-02", loadFactor: 0.35 },
  { region: "NY-03", loadFactor: 0.67 },
  { region: "FL-04", loadFactor: 0.92 },
  { region: "IL-05", loadFactor: 0.23 },
  { region: "WA-06", loadFactor: 0.55 },
];

const dwellTimeZones = [
  { region: "Entrance", dwell: "0:30 min" },
  { region: "Produce", dwell: "2:10 min" },
  { region: "Snacks", dwell: "1:45 min" },
  { region: "Dairy", dwell: "1:20 min" },
  { region: "Frozen", dwell: "1:05 min" },
  { region: "Beverages", dwell: "1:00 min" },
  { region: "Health", dwell: "0:50 min" },
  { region: "Electronics", dwell: "3:00 min" },
  { region: "Offers", dwell: "0:40 min" },
  { region: "Toiletries", dwell: "0:55 min" },
  { region: "Bakery", dwell: "1:30 min" },
  { region: "Checkout", dwell: "2:20 min" },
];

const ForecastHeatmap: React.FC<Props> = ({ initialTab = "dwell" }) => {
  const [tab, setTab] = useState<"footfall" | "dwell">(initialTab);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-4">
        <span className="text-xl font-bold text-[#003087]">In-Store Traffic Heatmap</span>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-full font-semibold ${
            tab === "footfall" ? "bg-[#e6f0ff] text-[#003087]" : "bg-gray-100 text-gray-500"
          }`}
          onClick={() => setTab("footfall")}
        >
          Live Footfall
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${
            tab === "dwell" ? "bg-[#0064e1] text-white" : "bg-gray-100 text-gray-500"
          }`}
          onClick={() => setTab("dwell")}
        >
          Average Dwell Time
        </button>
      </div>

      {tab === "dwell" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-6">
          {dwellTimeZones.map((zone) => (
            <div
              key={zone.region}
              className={`rounded-2xl ${getDwellColor(zone.dwell)} flex flex-col items-center justify-center p-8 min-h-[120px] text-center`}
            >
              <span className="text-base font-semibold text-[#003087] opacity-80">{zone.region}</span>
              <span className="mt-2 text-2xl font-bold text-[#003087]">{zone.dwell}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {mockZones.map((zone) => (
            <div
              key={zone.region}
              className={`rounded-xl p-4 flex flex-col items-center text-white shadow ${getColor(zone.loadFactor)}`}
            >
              <span className="text-lg font-bold">{zone.region}</span>
              <span className="mt-2 text-sm opacity-80">Load: {(zone.loadFactor * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center gap-6 text-sm font-medium mt-4">
        <span className="flex items-center gap-1"><span className="text-red-400 text-lg">🔴</span>High</span>
        <span className="flex items-center gap-1"><span className="text-yellow-300 text-lg">🟡</span>Medium</span>
        <span className="flex items-center gap-1"><span className="text-green-300 text-lg">🟢</span>Low</span>
      </div>
    </div>
  );
};

export default ForecastHeatmap;
