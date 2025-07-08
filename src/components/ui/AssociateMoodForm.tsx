import React, { useState } from "react";

const moods = [
  { emoji: "😫", label: "Too many substitutions today" },
  { emoji: "😕", label: "Can’t find stock in Zone X" },
  { emoji: "🙂", label: "Checkout smooth today" },
];

const AssociateMoodForm: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    setSelected(null);
    setComment("");
    alert("Thank you for your feedback!");
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <h3 className="text-lg font-bold text-blue-900 mb-3">How are you feeling today?</h3>
      <div className="flex flex-row gap-6 justify-center mb-4">
        {moods.map((m, i) => (
          <button
            key={m.emoji}
            className={`flex flex-col items-center px-4 py-2 rounded-lg border-2 transition
              ${selected === i ? "bg-blue-100 border-blue-500" : "bg-white border-blue-200 hover:bg-blue-50"}
            `}
            aria-label={m.label}
            onClick={() => setSelected(i)}
          >
            <span className="text-3xl">{m.emoji}</span>
            <span className="text-xs mt-1 text-blue-900">{m.label}</span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
          <textarea
            className="w-full rounded border border-blue-200 p-2"
            rows={2}
            placeholder="Tell us more…"
            value={comment}
            onChange={e => setComment(e.target.value)}
            aria-label="Additional comments"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      )}
      {submitted && (
        <div className="mt-3 text-green-700 font-semibold">Thank you for your feedback!</div>
      )}
    </div>
  );
};

export default AssociateMoodForm;
