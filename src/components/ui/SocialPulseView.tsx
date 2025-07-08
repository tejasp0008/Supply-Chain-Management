import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const redditTopics = [
  {
    subreddit: "r/retail",
    text: "In‑store pickup delays spike 30%",
    upvotes: 1200,
  },
  {
    subreddit: "r/supplies",
    text: "Best holiday décor ideas 2025",
    upvotes: 940,
  },
  {
    subreddit: "r/retail",
    text: "Self-checkout feedback: 20% want more staff help",
    upvotes: 860,
  },
  {
    subreddit: "r/supplies",
    text: "Bulk snack deals trending for school events",
    upvotes: 790,
  },
  {
    subreddit: "r/retail",
    text: "Store hours extended for holiday rush",
    upvotes: 670,
  },
];

const twitterTrends = [
  { hashtag: "#RainyDaySale", volume: "+1.5K", sentiment: "Positive" },
  { hashtag: "#GiftGuide", volume: "+3.0K", sentiment: "Mixed" },
  { hashtag: "#TechDeals", volume: "+900", sentiment: "Positive" },
];

const instagramMentions = [
  {
    caption: "Love these festive treats!",
    user: "@shopaholic",
    likes: 420,
  },
  {
    caption: "DIY holiday décor hacks!",
    user: "@homedecor",
    likes: 310,
  },
  {
    caption: "Top 5 gadgets for gifts!",
    user: "@techguru",
    likes: 285,
  },
];

const sentimentColor = (sentiment: string) => {
  if (sentiment === "Positive") return "bg-green-200 text-green-800";
  if (sentiment === "Mixed") return "bg-yellow-200 text-yellow-800";
  return "bg-red-200 text-red-800";
};

// --- InfoCard, QuickJump, SimpleBarChart, AccordionCard (reuse from Index.tsx) ---
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
    className="sticky top-4 z-20 bg-white/80 rounded-xl shadow px-4 py-3 mb-6 flex flex-row gap-2 justify-center"
    aria-label="Quick Jump"
  >
    {sections.map((s) => (
      <button
        key={s.id}
        className={`flex items-center gap-2 px-4 py-2 rounded transition
          ${activeSection === s.id
            ? "bg-blue-100 text-blue-900 font-bold border-b-4 border-blue-600"
            : "hover:bg-blue-50 text-blue-700 border-b-4 border-transparent"}
        `}
        onClick={() => onJump(s.id)}
        aria-current={activeSection === s.id}
        aria-label={`Jump to ${s.label}`}
        style={{ minWidth: 0 }}
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
      <line x1="0" y1="120" x2={data.length * 70} y2="120" stroke="#d1d5db" strokeWidth="2" />
      {data.map((d, i) => {
        const barHeight = (d.value / maxValue) * 100 + 20;
        return (
          <g key={d.label}>
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
            <text
              x={i * 70 + 38}
              y={132}
              textAnchor="middle"
              fontSize="14"
              fill="#555"
            >
              {d.label}
            </text>
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

const SocialPulseView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  // Section refs and state for quick jump and accordions
  const sectionRefs = {
    reddit: useRef<HTMLDivElement>(null),
    twitter: useRef<HTMLDivElement>(null),
    instagram: useRef<HTMLDivElement>(null),
    ai: useRef<HTMLDivElement>(null),
  };
  const [activeSection, setActiveSection] = useState("reddit");
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

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

  // Example chart data for Twitter
  const twitterChartData = [
    { label: "#RainyDaySale", value: 1500 },
    { label: "#GiftGuide", value: 3000 },
    { label: "#TechDeals", value: 900 },
  ];

  return (
    <motion.div
      className="w-full min-h-screen flex flex-col items-center justify-start p-4 md:p-8 bg-blue-50"
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
        onClick={onBack}
        aria-label="Back to Dashboard"
      >
        ← Back to Dashboard
      </motion.button>

      {/* Quick Jump Menu (now horizontal) */}
      <QuickJump
        sections={[
          { id: "reddit", label: "Reddit Hot Topics", icon: <span>👥</span> },
          { id: "twitter", label: "Trending Hashtags", icon: <span>🐦</span> },
          { id: "instagram", label: "Instagram Viral Mentions", icon: <span>📸</span> },
          { id: "ai", label: "AI Recommendations", icon: <span>🤖</span> },
        ]}
        activeSection={activeSection}
        onJump={handleJump}
      />

      {/* Cards/Accordions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Reddit */}
        <div ref={sectionRefs.reddit}>
          {isMobile ? (
            <AccordionCard
              id="reddit"
              title="👥 Reddit Hot Topics"
              icon={<span>👥</span>}
              open={activeSection === "reddit"}
              onToggle={() => setActiveSection("reddit")}
            >
              <InfoCard
                id="reddit"
                title="Reddit Hot Topics"
                subtitle="Latest trending discussions from r/retail and r/supplies."
              >
                <ul className="space-y-3">
                  {redditTopics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-blue-700 font-semibold">{topic.subreddit}:</span>
                      <span className="text-blue-900">{topic.text}</span>
                      <span className="ml-auto flex items-center gap-2 text-xs text-gray-500">
                        <span className="bg-gray-100 px-2 py-0.5 rounded">{topic.upvotes}⬆</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </InfoCard>
            </AccordionCard>
          ) : (
            <InfoCard
              id="reddit"
              title="Reddit Hot Topics"
              subtitle="Latest trending discussions from r/retail and r/supplies."
              icon={<span>👥</span>}
            >
              <ul className="space-y-3">
                {redditTopics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-blue-700 font-semibold">{topic.subreddit}:</span>
                    <span className="text-blue-900">{topic.text}</span>
                    <span className="ml-auto flex items-center gap-2 text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-0.5 rounded">{topic.upvotes}⬆</span>
                    </span>
                  </li>
                ))}
              </ul>
            </InfoCard>
          )}
        </div>
        {/* Twitter */}
        <div ref={sectionRefs.twitter}>
          {isMobile ? (
            <AccordionCard
              id="twitter"
              title="🐦 Trending Hashtags"
              icon={<span>🐦</span>}
              open={activeSection === "twitter"}
              onToggle={() => setActiveSection("twitter")}
            >
              <InfoCard
                id="twitter"
                title="Trending Hashtags"
                subtitle="Live surge in retail-related hashtags."
                chart={
                  <SimpleBarChart
                    data={twitterChartData}
                    colors={["#1b9e77", "#d95f02", "#7570b3"]}
                    ariaLabel="Hashtag tweet volume"
                  />
                }
              >
                <table className="min-w-full text-left mt-2" aria-label="Twitter hashtag table">
                  <thead>
                    <tr className="text-gray-600 text-sm">
                      <th className="py-1 pr-4">Hashtag</th>
                      <th className="py-1 pr-4">Tweet Volume</th>
                      <th className="py-1">Sentiment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {twitterTrends.map((row) => (
                      <tr key={row.hashtag} className="border-b last:border-b-0">
                        <td className="py-2 pr-4 font-medium">{row.hashtag}</td>
                        <td className="py-2 pr-4">{row.volume}</td>
                        <td className="py-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${sentimentColor(row.sentiment)}`}>
                            {row.sentiment}
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
              id="twitter"
              title="Trending Hashtags"
              subtitle="Live surge in retail-related hashtags."
              icon={<span>🐦</span>}
              chart={
                <SimpleBarChart
                  data={twitterChartData}
                  colors={["#1b9e77", "#d95f02", "#7570b3"]}
                  ariaLabel="Hashtag tweet volume"
                />
              }
            >
              <table className="min-w-full text-left mt-2" aria-label="Twitter hashtag table">
                <thead>
                  <tr className="text-gray-600 text-sm">
                    <th className="py-1 pr-4">Hashtag</th>
                    <th className="py-1 pr-4">Tweet Volume</th>
                    <th className="py-1">Sentiment</th>
                  </tr>
                </thead>
                <tbody>
                  {twitterTrends.map((row) => (
                    <tr key={row.hashtag} className="border-b last:border-b-0">
                      <td className="py-2 pr-4 font-medium">{row.hashtag}</td>
                      <td className="py-2 pr-4">{row.volume}</td>
                      <td className="py-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${sentimentColor(row.sentiment)}`}>
                          {row.sentiment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </InfoCard>
          )}
        </div>
        {/* Instagram */}
        <div ref={sectionRefs.instagram}>
          {isMobile ? (
            <AccordionCard
              id="instagram"
              title="📸 Instagram Viral Mentions"
              icon={<span>📸</span>}
              open={activeSection === "instagram"}
              onToggle={() => setActiveSection("instagram")}
            >
              <InfoCard
                id="instagram"
                title="Instagram Viral Mentions"
                subtitle="Top trending posts and mentions."
              >
                <div className="grid grid-cols-1 gap-4">
                  {instagramMentions.map((post, i) => (
                    <div key={i} className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow">
                      <div className="w-16 h-16 bg-gray-200 rounded mb-2 flex items-center justify-center text-gray-400 text-2xl">
                        <span>📷</span>
                      </div>
                      <div className="text-blue-900 text-sm font-semibold text-center mb-1">"{post.caption}"</div>
                      <div className="text-xs text-gray-600">{post.user}</div>
                      <div className="text-xs text-gray-500">{post.likes} likes</div>
                    </div>
                  ))}
                </div>
              </InfoCard>
            </AccordionCard>
          ) : (
            <InfoCard
              id="instagram"
              title="Instagram Viral Mentions"
              subtitle="Top trending posts and mentions."
              icon={<span>📸</span>}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {instagramMentions.map((post, i) => (
                  <div key={i} className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow">
                    <div className="w-16 h-16 bg-gray-200 rounded mb-2 flex items-center justify-center text-gray-400 text-2xl">
                      <span>📷</span>
                    </div>
                    <div className="text-blue-900 text-sm font-semibold text-center mb-1">"{post.caption}"</div>
                    <div className="text-xs text-gray-600">{post.user}</div>
                    <div className="text-xs text-gray-500">{post.likes} likes</div>
                  </div>
                ))}
              </div>
            </InfoCard>
          )}
        </div>
        {/* AI Recommendations */}
        <div ref={sectionRefs.ai}>
          {isMobile ? (
            <AccordionCard
              id="ai"
              title="🤖 AI‑Driven Recommendations"
              icon={<span>🤖</span>}
              open={activeSection === "ai"}
              onToggle={() => setActiveSection("ai")}
            >
              <InfoCard
                id="ai"
                title="AI‑Driven Recommendations"
              >
                <div className="text-blue-900 leading-relaxed">
                  Reddit reports 30% pickup delays, Twitter’s #RainyDaySale spikes with positive sentiment, and Instagram buzz around festive snacks.
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Allocate extra staff to pickup lanes.</li>
                    <li>Pre‑stage umbrella & snack bundles at entrances.</li>
                    <li>Launch in‑app #RainyDaySale banner for 2 hrs.</li>
                  </ul>
                </div>
              </InfoCard>
            </AccordionCard>
          ) : (
            <InfoCard
              id="ai"
              title="AI‑Driven Recommendations"
              icon={<span>🤖</span>}
            >
              <div className="text-blue-900 leading-relaxed">
                Reddit reports 30% pickup delays, Twitter’s #RainyDaySale spikes with positive sentiment, and Instagram buzz around festive snacks.
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Allocate extra staff to pickup lanes.</li>
                  <li>Pre‑stage umbrella & snack bundles at entrances.</li>
                  <li>Launch in‑app #RainyDaySale banner for 2 hrs.</li>
                </ul>
              </div>
            </InfoCard>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SocialPulseView;
