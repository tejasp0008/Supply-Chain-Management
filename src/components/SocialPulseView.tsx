import React from "react";
import { motion } from "framer-motion";

const redditTopics = [
  {
    subreddit: "r/retail",
    text: "‘In‑store pickup delays spike 30%’",
    upvotes: 412,
    time: "2h ago",
  },
  {
    subreddit: "r/supplies",
    text: "‘Best home holiday décor ideas 2025’",
    upvotes: 188,
    time: "1h ago",
  },
];

const twitterTrends = [
  { hashtag: "#RainyDaySale", volume: "+1500 tweets", sentiment: "Positive" },
  { hashtag: "#GiftGuide", volume: "+3000 tweets", sentiment: "Mixed" },
  { hashtag: "#TechDeals", volume: "+900 tweets", sentiment: "Positive" },
];

const instagramMentions = [
  {
    caption: "Love these festive treats!",
    user: "@snackqueen",
    likes: 1200,
    img: "",
  },
  {
    caption: "Holiday décor goals 🎄",
    user: "@homedreams",
    likes: 980,
    img: "",
  },
  {
    caption: "Best pickup experience ever!",
    user: "@shopperlife",
    likes: 760,
    img: "",
  },
];

const sentimentColor = (sentiment: string) => {
  if (sentiment === "Positive") return "bg-green-100 text-green-700";
  if (sentiment === "Mixed") return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

const SocialPulseView: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <motion.div
    className="w-full min-h-screen flex flex-col items-center justify-start p-4 md:p-8 bg-blue-50"
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
      {/* Reddit Hot Topics */}
      <motion.section
        className="bg-white rounded-xl shadow p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">👥 r/retail & r/supplies Highlights</h2>
        <ul className="space-y-3">
          {redditTopics.map((topic, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="text-blue-700 font-semibold">{topic.subreddit}:</span>
              <span className="text-blue-900">{topic.text}</span>
              <span className="ml-auto flex items-center gap-2 text-xs text-gray-500">
                <span className="bg-gray-100 px-2 py-0.5 rounded">{topic.upvotes}⬆</span>
                <span>{topic.time}</span>
              </span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Twitter Hashtag Surge */}
      <motion.section
        className="bg-white rounded-xl shadow p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">🐦 Trending Hashtags</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-600 text-sm">
                <th className="py-1 pr-4">Hashtag</th>
                <th className="py-1 pr-4">Volume Change</th>
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
        </div>
      </motion.section>

      {/* Instagram Viral Mentions */}
      <motion.section
        className="bg-white rounded-xl shadow p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">📸 Instagram Mentions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {instagramMentions.map((post, i) => (
            <div key={i} className="bg-blue-50 rounded-lg p-4 flex flex-col items-center shadow">
              <div className="w-16 h-16 bg-gray-200 rounded mb-2 flex items-center justify-center text-gray-400 text-2xl">
                {/* Placeholder image box */}
                <span>📷</span>
              </div>
              <div className="text-blue-900 text-sm font-semibold text-center mb-1">"{post.caption}"</div>
              <div className="text-xs text-gray-600">@{post.user.replace("@", "")}</div>
              <div className="text-xs text-gray-500">{post.likes} likes</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* AI Action Recommendations */}
      <motion.section
        className="bg-white rounded-xl shadow p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-bold mb-2 flex items-center gap-2">🤖 AI‑Powered Insights</h2>
        <div className="text-blue-900 leading-relaxed">
          Reddit users report 30% pickup delays. Twitter shows #RainyDaySale surging—positive sentiment. Instagram mentions spike around festive snacks.
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>🔄 Allocate more cashiers for pickup lanes.</li>
            <li>📦 Pre‑bundle festive snack packs near entrance.</li>
            <li>📣 Promote #RainyDaySale in‑app banner for next 2 hrs.</li>
          </ul>
        </div>
      </motion.section>
    </div>
  </motion.div>
);

export default SocialPulseView;
