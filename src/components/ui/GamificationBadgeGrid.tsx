import React from "react";

const badges = [
  {
    icon: "🛡️",
    title: "Zone Defender",
    desc: "Awarded for decongesting a hot zone",
    unlocked: true,
  },
  {
    icon: "🎯",
    title: "Suggestion Master",
    desc: "Top substitution suggestion of the day",
    unlocked: true,
  },
  {
    icon: "🚀",
    title: "Quick Responder",
    desc: "Resolved 5 feedbacks in 1 hr",
    unlocked: false,
  },
  {
    icon: "💡",
    title: "Insight Seeker",
    desc: "Asked 3+ explainable AI questions",
    unlocked: false,
  },
  {
    icon: "🤝",
    title: "Team Player",
    desc: "Collaborated on a bundle",
    unlocked: true,
  },
];

const GamificationBadgeGrid: React.FC = () => (
  <div className="w-full max-w-3xl mx-auto mb-8">
    <h3 className="text-lg font-bold text-blue-900 mb-3">Your Achievements</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {badges.map((b, i) => (
        <div
          key={b.title}
          className={`flex flex-col items-center p-4 rounded-xl shadow border-2 transition
            ${b.unlocked ? "bg-yellow-50 border-yellow-400" : "bg-gray-100 border-gray-300 opacity-60"}
          `}
          aria-label={b.title + (b.unlocked ? " unlocked" : " locked")}
        >
          <span className="text-3xl mb-2">{b.icon}</span>
          <span className="font-semibold text-blue-900">{b.title}</span>
          <span className="text-xs text-gray-700 text-center mt-1">{b.desc}</span>
          {!b.unlocked && (
            <span className="mt-2 text-xs text-gray-400 italic">Locked</span>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default GamificationBadgeGrid;
