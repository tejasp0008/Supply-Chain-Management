// src/pages/Index.tsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Earth, 
  MessageSquare, 
  RefreshCcw, 
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ShoppingCart,
  MapPin,
  Search
} from 'lucide-react';
import Chatbot from '../components/Chatbot';
import InStoreTrafficHeatmap from '../components/InStoreTrafficHeatmap';
import ForecastZonesView from '../components/ForecastZonesView';
import SocialPulseView from '../components/ui/SocialPulseView';
import SkuAffinityGraph from '../components/ui/SkuAffinityView';
import AssociateFeedbackView from '../components/ui/AssociateFeedbackView';

interface ZoneData {
  zip: string;
  loadFactor: number;
}

interface EventEntry {
  id: string;
  timestamp: string;
  message: string;
  icon: string;
  severity: 'low' | 'medium' | 'high';
}

interface RebalanceAction {
  id: string;
  fromZone: string;
  toZone: string;
  sku: string;
  confidence: number;
  eta: string;
}

interface KPI {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}

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

const QuickJump = ({
  sections,
  activeSection,
  onJump,
}: {
  sections: { id: string; label: string; icon?: React.ReactNode }[];
  activeSection: string;
  onJump: (id: string) => void;
}) => (
  <nav
    className="sticky top-4 z-20 bg-white/80 rounded-xl shadow px-4 py-3 mb-6 flex flex-col gap-2"
    aria-label="Quick Jump"
  >
    {sections.map((s) => (
      <button
        key={s.id}
        className={`flex items-center gap-2 px-2 py-1 rounded transition
          ${activeSection === s.id
            ? "bg-blue-100 text-blue-900 font-bold border-l-4 border-blue-600"
            : "hover:bg-blue-50 text-blue-700 border-l-4 border-transparent"}
        `}
        onClick={() => onJump(s.id)}
        aria-current={activeSection === s.id}
        aria-label={`Jump to ${s.label}`}
      >
        {s.icon}
        <span>{s.label}</span>
      </button>
    ))}
  </nav>
);

const SimpleBarChart = ({
  data,
  colors,
  ariaLabel,
}: {
  data: { label: string; value: number }[];
  colors: string[];
  ariaLabel: string;
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  return (
    <svg
      width="100%"
      height="140"
      viewBox={`0 0 ${data.length * 70} 140`}
      aria-label={ariaLabel}
      role="img"
      className="w-full"
    >
      {/* Axis line */}
      <line x1="0" y1="120" x2={data.length * 70} y2="120" stroke="#d1d5db" strokeWidth="2" />
      {data.map((d, i) => {
        const barHeight = (d.value / maxValue) * 100 + 20; // min height for visibility
        return (
          <g key={d.label}>
            {/* Bar */}
            <rect
              x={i * 70 + 20}
              y={120 - barHeight}
              width={36}
              height={barHeight}
              rx={10}
              fill={colors[i % colors.length]}
              className="transition-all duration-300 hover:fill-yellow-400"
            >
              <title>{`${d.label}: ${d.value}`}</title>
            </rect>
            {/* Value label on top */}
            <text
              x={i * 70 + 38}
              y={120 - barHeight - 8}
              textAnchor="middle"
              fontSize="16"
              fontWeight="bold"
              fill="#222"
              className="pointer-events-none"
            >
              {d.value}
            </text>
            {/* X-axis label */}
            <text
              x={i * 70 + 38}
              y={132}
              textAnchor="middle"
              fontSize="14"
              fill="#555"
            >
              {d.label}
            </text>
            {/* Fancy shadow */}
            <rect
              x={i * 70 + 20}
              y={120 - barHeight}
              width={36}
              height={barHeight}
              rx={10}
              fill="none"
              filter="url(#barShadow)"
            />
          </g>
        );
      })}
      {/* SVG filter for bar shadow */}
      <defs>
        <filter id="barShadow" x="0" y="0" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.15" />
        </filter>
      </defs>
    </svg>
  );
};

const AccordionCard = ({
  id,
  title,
  icon,
  children,
  open,
  onToggle,
}: {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) => (
  <div className="mb-3">
    <button
      className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-white shadow border border-blue-100 focus:outline-none ${open ? "font-bold" : ""}`}
      onClick={onToggle}
      aria-expanded={open}
      aria-controls={`${id}-panel`}
      aria-label={`Toggle ${title}`}
    >
      {icon}
      <span>{title}</span>
      <span className="ml-auto">{open ? "▲" : "▼"}</span>
    </button>
    <AnimatePresence>
      {open && (
        <motion.div
          id={`${id}-panel`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden bg-blue-50 rounded-b-xl px-4 py-3"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAnomalies, setShowAnomalies] = useState(false);
  const [showConfidenceBands, setShowConfidenceBands] = useState(true);
  const [onlyHighRisk, setOnlyHighRisk] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [showForecastZones, setShowForecastZones] = useState(false);
  const [activeView, setActiveView] = useState<'main' | 'socialPulse' | 'skuAffinity' | 'associateFeedback'>('main');
  const [activeSection, setActiveSection] = useState("weather");

  const mockZones: ZoneData[] = [
    { zip: "10001", loadFactor: 0.85 },
    { zip: "90210", loadFactor: 0.62 },
    { zip: "60601", loadFactor: 0.94 },
  ];

  const [events, setEvents] = useState<EventEntry[]>([
    {
      id: '1',
      timestamp: '14:32',
      message: '⛈ Snowstorm → boot demand +45% in Denver',
      icon: '⛈',
      severity: 'high'
    },
    {
      id: '2',
      timestamp: '14:28',
      message: '📱 TikTok trend driving thermal glove searches +62%',
      icon: '📱',
      severity: 'medium'
    },
    {
      id: '3',
      timestamp: '14:25',
      message: '🚛 Route optimization completed for West Coast',
      icon: '🚛',
      severity: 'low'
    }
  ]);

  const rebalanceActions: RebalanceAction[] = [
    {
      id: '1',
      fromZone: 'Phoenix, AZ',
      toZone: 'Detroit, MI',
      sku: 'THG-4401 Thermal Gloves',
      confidence: 87,
      eta: '6-8 hours'
    },
    {
      id: '2',
      fromZone: 'Miami, FL',
      toZone: 'Denver, CO',
      sku: 'WB-9922 Winter Boots',
      confidence: 94,
      eta: '12-16 hours'
    },
    {
      id: '3',
      fromZone: 'Seattle, WA',
      toZone: 'Austin, TX',
      sku: 'RJ-5533 Rain Jackets',
      confidence: 72,
      eta: '8-10 hours'
    }
  ];

  const kpis: KPI[] = [
    {
      label: 'Stockout Risk',
      value: '3.2%',
      trend: 'down',
      icon: <ArrowDown className="w-4 h-4 text-green-400" />
    },
    {
      label: 'Fulfillment SLA',
      value: '98.7%',
      trend: 'up',
      icon: <ArrowUp className="w-4 h-4 text-green-400" />
    },
    {
      label: 'Actions Today',
      value: '127',
      trend: 'stable',
      icon: <RefreshCcw className="w-4 h-4 text-blue-400" />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent: EventEntry = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        message: `🔄 Auto-rebalance triggered for Zone ${Math.floor(Math.random() * 100)}`,
        icon: '🔄',
        severity: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
      };
      
      setEvents(prev => [newEvent, ...prev.slice(0, 4)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const sidebarItems = [
    { icon: <Earth className="w-5 h-5" />, label: 'Forecast Zones' },
    { icon: <Earth className="w-5 h-5" />, label: 'Social Pulse' },
    { icon: <RefreshCcw className="w-5 h-5" />, label: 'Smart Substitutions' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Associate Feedback' }, // Ensure this is the fourth item
  ];

  const handleSidebarClick = (label: string) => {
    if (label === 'Forecast Zones') {
      setShowForecastZones(true);
      setActiveView('main');
    } else if (label === 'Social Pulse') {
      setActiveView('socialPulse');
      setShowForecastZones(false);
    } else if (label === 'Smart Substitutions') {
      setActiveView('skuAffinity');
      setShowForecastZones(false);
    } else if (label === 'Associate Feedback') {
      setActiveView('associateFeedback');
      setShowForecastZones(false);
    } else {
      setShowForecastZones(false);
      setActiveView('main');
    }
  };

  // Section refs for scroll/jump
  const sectionRefs = {
    weather: useRef<HTMLDivElement>(null),
    cpi: useRef<HTMLDivElement>(null),
    congestion: useRef<HTMLDivElement>(null),
    ai: useRef<HTMLDivElement>(null),
  };

  // Scroll handler for Quick Jump
  const handleJump = (id: string) => {
    sectionRefs[id as keyof typeof sectionRefs]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Intersection observer for active section highlight
  useEffect(() => {
    const handleScroll = () => {
      const offsets = Object.entries(sectionRefs).map(([id, ref]) => ({
        id,
        top: ref.current ? ref.current.getBoundingClientRect().top : Infinity,
      }));
      const visible = offsets.filter(o => o.top < 120).sort((a, b) => b.top - a.top);
      if (visible.length > 0 && visible[0].id !== activeSection) {
        setActiveSection(visible[0].id);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const getSidebarButtonClass = (label: string) =>
    `w-full flex items-center space-x-3 p-3 rounded-xl bg-[#e6f0ff] hover:bg-yellow-100 transition-colors font-sans font-medium relative
    ${label === 'Forecast Zones' && showForecastZones ? "border-l-4 border-blue-600 bg-blue-50" : ""}
    ${label === 'Social Pulse' && activeView === 'socialPulse' ? "border-l-4 border-blue-600 bg-blue-50" : ""}
    ${label === 'Smart Substitutions' && activeView === 'skuAffinity' ? "border-l-4 border-blue-600 bg-blue-50" : ""}
    ${label === 'Associate Feedback' && activeView === 'associateFeedback' ? "border-l-4 border-blue-600 bg-blue-50" : ""}
    `;

  // Responsive: show accordions on mobile, grid on desktop
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // --- Example Data for Forecast Zones ---
  const weatherData = [
    { label: "9AM", value: 20 },
    { label: "12PM", value: 28 },
    { label: "3PM", value: 35 },
    { label: "6PM", value: 25 },
  ];
  const cpiData = [
    { label: "Jan", value: 102 },
    { label: "Feb", value: 104 },
    { label: "Mar", value: 107 },
    { label: "Apr", value: 106 },
  ];
  const congestionData = [
    { zone: "Dairy", load: 78, alert: "Medium" },
    { zone: "Checkout", load: 92, alert: "High" },
    { zone: "Electronics", load: 64, alert: "Low" },
  ];

  const handleSidebarForecastZones = () => {
    setShowForecastZones(true);
    setActiveView('main');
  };

  return (
    <div className="min-h-screen bg-[#0064e1] font-sans">
      {/* Walmart-style Header for Associates */}
      <header className="bg-[#0064e1] text-white shadow">
        <div className="flex items-center px-8 py-3 space-x-6">
          {/* Main logo and correct title */}
          <span className="flex items-center text-3xl font-bold">
            <ShoppingCart className="h-8 w-8 mr-2" />
            <span className="hidden sm:inline">Mart Supply Pulse</span>
          </span>
          {/* Location */}
          <div className="flex items-center bg-[#0064e1]/80 rounded px-3 py-1 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            Sacramento, 95829
          </div>
          {/* Search bar */}
          <div className="flex-1 flex items-center max-w-xl mx-6">
            <input
              type="text"
              placeholder="Search dashboards, SKUs, zones..."
              className="w-full rounded-l-full px-4 py-2 text-gray-900 focus:outline-none"
              style={{ border: 'none' }}
            />
            <button className="bg-yellow-400 hover:bg-yellow-300 text-[#0064e1] rounded-r-full px-4 py-2">
              <Search className="w-5 h-5" />
            </button>
          </div>
          {/* Remove cart logo near associate and change label */}
          {/* <button className="relative ml-4">
            <ShoppingCart className="w-6 h-6" />
          </button> */}
          <div className="flex-1" />
          <button className="ml-4 font-semibold hover:underline">Associate Login</button>
        </div>
        {/* Navigation bar for Associates */}
        <nav className="bg-[#0064e1]/90 text-white text-sm px-8 py-2 flex space-x-6">
          <a href="#" className="hover:underline">Dashboard</a>
          <a href="#" className="hover:underline">Inventory</a>
          <a href="#" className="hover:underline">Rebalancing</a>
          <a href="#" className="hover:underline">Events</a>
          <a href="#" className="hover:underline">Reports</a>
        </nav>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-64 bg-[#003087] min-h-screen" // deep blue sidebar
            >
              <div className="p-6 space-y-4">
                {sidebarItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={getSidebarButtonClass(item.label)}
                    onClick={() => handleSidebarClick(item.label)}
                    aria-current={
                      (item.label === 'Forecast Zones' && showForecastZones) ||
                      (item.label === 'Social Pulse' && activeView === 'socialPulse') ||
                      (item.label === 'Smart Substitutions' && activeView === 'skuAffinity') ||
                      (item.label === 'Associate Feedback' && activeView === 'associateFeedback')
                        ? "page"
                        : undefined
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {(item.label === 'Forecast Zones' && showForecastZones) ||
                    (item.label === 'Social Pulse' && activeView === 'socialPulse') ||
                    (item.label === 'Smart Substitutions' && activeView === 'skuAffinity') ||
                    (item.label === 'Associate Feedback' && activeView === 'associateFeedback') ? (
                      <motion.div
                        layoutId="sidebar-accent"
                        className="absolute left-0 top-0 h-full w-1 bg-blue-600 rounded transition-all"
                        aria-hidden="true"
                      />
                    ) : null}
                  </motion.button>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6 font-sans bg-white min-h-screen">
          <AnimatePresence mode="wait">
            {showForecastZones && (
              <motion.div
                key="forecast-zones"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4 }}
              >
                {/* Breadcrumb/Pill Back Navigation */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition"
                  onClick={() => setShowForecastZones(false)}
                  aria-label="Back to Dashboard"
                >
                  ← Back to Dashboard
                </motion.button>

                {/* Quick Jump Menu */}
                <QuickJump
                  sections={[
                    { id: "weather", label: "Weather Forecast", icon: <span>🌦️</span> },
                    { id: "cpi", label: "Economic Insight", icon: <span>📈</span> },
                    { id: "congestion", label: "Congestion", icon: <span>🚦</span> },
                    { id: "ai", label: "AI Plan", icon: <span>🤖</span> },
                  ]}
                  activeSection={activeSection}
                  onJump={handleJump}
                />

                {/* Cards/Accordions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Weather */}
                  <div ref={sectionRefs.weather}>
                    {isMobile ? (
                      <AccordionCard
                        id="weather"
                        title="🌦️ 24‑Hour Weather Impact"
                        icon={<span>🌦️</span>}
                        open={activeSection === "weather"}
                        onToggle={() => setActiveSection("weather")}
                      >
                        <InfoCard
                          id="weather"
                          title="24‑Hour Weather Impact"
                          subtitle="Expect scattered thunderstorms at 3 PM → +25% umbrella picks in Produce & Snacks."
                          chart={
                            <SimpleBarChart
                              data={weatherData}
                              colors={["#1b9e77", "#d95f02", "#7570b3", "#e7298a"]}
                              ariaLabel="Hourly rainfall"
                            />
                          }
                        />
                      </AccordionCard>
                    ) : (
                      <InfoCard
                        id="weather"
                        title="24‑Hour Weather Impact"
                        subtitle="Expect scattered thunderstorms at 3 PM → +25% umbrella picks in Produce & Snacks."
                        icon={<span>🌦️</span>}
                        chart={
                          <SimpleBarChart
                            data={weatherData}
                            colors={["#1b9e77", "#d95f02", "#7570b3", "#e7298a"]}
                            ariaLabel="Hourly rainfall"
                          />
                        }
                      />
                    )}
                  </div>
                  {/* CPI */}
                  <div ref={sectionRefs.cpi}>
                    {isMobile ? (
                      <AccordionCard
                        id="cpi"
                        title="📈 Consumer Spending Index"
                        icon={<span>📈</span>}
                        open={activeSection === "cpi"}
                        onToggle={() => setActiveSection("cpi")}
                      >
                        <InfoCard
                          id="cpi"
                          title="Consumer Spending Index"
                          subtitle="Local CPI up 1.2% this week → 15% lift in value‑line product sales."
                          chart={
                            <SimpleBarChart
                              data={cpiData}
                              colors={["#e7298a", "#66a61e", "#e6ab02", "#a6761d"]}
                              ariaLabel="CPI trend"
                            />
                          }
                        />
                      </AccordionCard>
                    ) : (
                      <InfoCard
                        id="cpi"
                        title="Consumer Spending Index"
                        subtitle="Local CPI up 1.2% this week → 15% lift in value‑line product sales."
                        icon={<span>📈</span>}
                        chart={
                          <SimpleBarChart
                            data={cpiData}
                            colors={["#e7298a", "#66a61e", "#e6ab02", "#a6761d"]}
                            ariaLabel="CPI trend"
                          />
                        }
                      />
                    )}
                  </div>
                  {/* Congestion */}
                  <div ref={sectionRefs.congestion}>
                    {isMobile ? (
                      <AccordionCard
                        id="congestion"
                        title="🚦 Anticipated Zone Congestion"
                        icon={<span>🚦</span>}
                        open={activeSection === "congestion"}
                        onToggle={() => setActiveSection("congestion")}
                      >
                        <InfoCard
                          id="congestion"
                          title="Anticipated Zone Congestion (Next 60 Mins)"
                        >
                          <table className="min-w-full text-left mt-2" aria-label="Zone congestion table">
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
                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-semibold
                                        ${row.alert === "High"
                                          ? "bg-[#d73027] text-white"
                                          : row.alert === "Medium"
                                          ? "bg-[#fee08b] text-[#7f3b08]"
                                          : "bg-[#1a9850] text-white"
                                        }`}
                                      aria-label={row.alert + " alert"}
                                    >
                                      {row.alert}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </InfoCard>
                      </AccordionCard>
                    ) : (
                      <InfoCard
                        id="congestion"
                        title="Anticipated Zone Congestion (Next 60 Mins)"
                        icon={<span>🚦</span>}
                      >
                        <table className="min-w-full text-left mt-2" aria-label="Zone congestion table">
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
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold
                                      ${row.alert === "High"
                                        ? "bg-[#d73027] text-white"
                                        : row.alert === "Medium"
                                        ? "bg-[#fee08b] text-[#7f3b08]"
                                        : "bg-[#1a9850] text-white"
                                      }`}
                                    aria-label={row.alert + " alert"}
                                  >
                                    {row.alert}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </InfoCard>
                    )}
                  </div>
                  {/* AI Plan */}
                  <div ref={sectionRefs.ai}>
                    {isMobile ? (
                      <AccordionCard
                        id="ai"
                        title="🤖 AI‑Driven Action Plan"
                        icon={<span>🤖</span>}
                        open={activeSection === "ai"}
                        onToggle={() => setActiveSection("ai")}
                      >
                        <InfoCard
                          id="ai"
                          title="AI‑Driven Action Plan"
                        >
                          <div className="text-blue-900 leading-relaxed">
                            Based on incoming thunderstorms and a 1.2% CPI rise, we forecast <b>Checkout</b> will hit <b>92% load</b> in the next hour.<br />
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                              <li>📦 Pre‑stage additional handheld scanners at Dairy & Checkout.</li>
                              <li>🔄 Move 30% of umbrella and rain‑boot stock to end‑caps near entrance.</li>
                              <li>🛒 Promote value‑line bundles for toiletries to leverage CPI‑driven demand.</li>
                            </ul>
                          </div>
                        </InfoCard>
                      </AccordionCard>
                    ) : (
                      <InfoCard
                        id="ai"
                        title="AI‑Driven Action Plan"
                        icon={<span>🤖</span>}
                      >
                        <div className="text-blue-900 leading-relaxed">
                          Based on incoming thunderstorms and a 1.2% CPI rise, we forecast <b>Checkout</b> will hit <b>92% load</b> in the next hour.<br />
                          <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li>📦 Pre‑stage additional handheld scanners at Dairy & Checkout.</li>
                            <li>🔄 Move 30% of umbrella and rain‑boot stock to end‑caps near entrance.</li>
                            <li>🛒 Promote value‑line bundles for toiletries to leverage CPI‑driven demand.</li>
                          </ul>
                        </div>
                      </InfoCard>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            {activeView === 'main' && !showForecastZones && (
              <motion.div
                key="main"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* KPI Strip */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-3 gap-6"
                >
                  {kpis.map((kpi, index) => (
                    <motion.div
                      key={kpi.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-6 border border-primary/30 shadow font-sans"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-primary text-sm font-medium">{kpi.label}</p>
                          <p className="text-2xl font-bold text-primary mt-1">{kpi.value}</p>
                        </div>
                        {kpi.icon}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Controls Bar */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-4 border border-primary/30 shadow font-sans"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      {[
                        { label: 'Show Anomalies', state: showAnomalies, setState: setShowAnomalies },
                        { label: 'Show AI Confidence Bands', state: showConfidenceBands, setState: setShowConfidenceBands },
                        { label: 'Only High-Risk Zones', state: onlyHighRisk, setState: setOnlyHighRisk },
                      ].map((toggle) => (
                        <label key={toggle.label} className="flex items-center space-x-2 cursor-pointer font-sans">
                          <input
                            type="checkbox"
                            checked={toggle.state}
                            onChange={(e) => toggle.setState(e.target.checked)}
                            className="sr-only"
                          />
                          <div className={`w-10 h-6 rounded-full transition-colors ${
                            toggle.state ? 'bg-primary' : 'bg-blue-200'
                          }`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform mt-1 ${
                              toggle.state ? 'translate-x-5 ml-1' : 'translate-x-1'
                            }`} />
                          </div>
                          <span className="text-primary text-sm font-medium">{toggle.label}</span>
                        </label>
                      ))}
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setChatbotOpen(true)}
                      className="bg-primary text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:bg-yellow-400 hover:text-primary transition-shadow font-sans"
                    >
                      🤖 AI Assistant
                    </motion.button>
                  </div>
                </motion.div>

                {/* In-Store Traffic Heatmap */}
                <div>
                  <h2 className="text-xl font-bold mb-4 text-[#003087]">In-Store Traffic Heatmap</h2>
                  <InStoreTrafficHeatmap />
                </div>

                {/* Lower Section - Make blue like header/sidebar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2 bg-[#0064e1] rounded-2xl p-8 shadow flex flex-col md:flex-row gap-8">
                    {/* Example: Add your lower section content here */}
                    <div className="flex-1 text-white">
                      <h2 className="text-2xl font-bold mb-4">Associate Actions</h2>
                      <ul className="space-y-2">
                        <li>• Review zone forecasts</li>
                        <li>• Monitor event trends</li>
                        <li>• Execute smart substitutions</li>
                        <li>• Provide feedback</li>
                      </ul>
                    </div>
                    <div className="flex-1 text-white">
                      <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
                      <button className="bg-yellow-400 text-[#003087] font-bold px-6 py-3 rounded-full shadow hover:bg-yellow-300 transition mb-3">
                        Go to Inventory
                      </button>
                      <br />
                      <button className="bg-white text-[#0064e1] font-bold px-6 py-3 rounded-full shadow hover:bg-blue-100 transition">
                        View Reports
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="mt-8 px-4 py-2 bg-blue-600 text-white rounded shadow"
                  onClick={handleSidebarForecastZones}
                >
                  Go to Forecast Zones
                </button>
                {/* ...add more blue sections as needed... */}
              </motion.div>
            )}
            {activeView === 'socialPulse' && (
              <SocialPulseView
                key="socialPulse"
                onBack={() => setActiveView('main')}
              />
            )}
            {activeView === 'skuAffinity' && (
              <SkuAffinityGraph
                key="skuAffinity"
                onBack={() => setActiveView('main')}
              />
            )}
            {activeView === 'associateFeedback' && (
              <AssociateFeedbackView
                key="associateFeedback"
                onBack={() => setActiveView('main')}
              />
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Chatbot */}
      <Chatbot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </div>
  );
};



export default Index;

