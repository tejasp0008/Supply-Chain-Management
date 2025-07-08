import React from "react";

const chat = [
  {
    user: "Why was I reassigned to Snacks zone?",
    bot: "Because Snacks saw a 2× dwell increase and no staff for 12 min.",
  },
  {
    user: "Why did I get a substitution task?",
    bot: "High demand for Oat Milk and low stock in Dairy triggered the assignment.",
  },
  {
    user: "Why did checkout get extra staff?",
    bot: "Checkout congestion exceeded 90% for 10 min, so extra help was dispatched.",
  },
];

const GenAIExplainBox: React.FC = () => (
  <div className="w-full max-w-2xl mx-auto mb-8">
    <h3 className="text-lg font-bold text-blue-900 mb-3">Why did I get this assignment?</h3>
    <div
      className="bg-white rounded-xl border border-blue-100 shadow p-4 h-56 overflow-y-auto flex flex-col gap-4"
      role="log"
      aria-live="polite"
    >
      {chat.map((q, i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="self-start bg-blue-100 text-blue-900 px-3 py-2 rounded-lg max-w-[80%]" aria-label="User question">
            <span className="font-semibold">You:</span> {q.user}
          </div>
          <div className="self-end bg-yellow-100 text-yellow-900 px-3 py-2 rounded-lg max-w-[80%]" aria-label="AI answer">
            <span className="font-semibold">AI:</span> {q.bot}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default GenAIExplainBox;
