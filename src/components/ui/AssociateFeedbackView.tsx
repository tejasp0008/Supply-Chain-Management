import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import AssociateMoodForm from "./AssociateMoodForm";
import GamificationBadgeGrid from "./GamificationBadgeGrid";
import GenAIExplainBox from "./GenAIExplainBox";

const AssociateFeedbackView: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <motion.div
    className="w-full min-h-screen flex flex-col items-center justify-start p-4 md:p-8 bg-blue-50"
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -40 }}
    transition={{ duration: 0.4 }}
  >
    {/* Back Button */}
    <div className="w-full flex">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-6 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition"
        onClick={onBack}
        aria-label="Back to Dashboard"
        style={{ alignSelf: "flex-start" }}
      >
        ← Back
      </motion.button>
    </div>

    {/* Mood Form */}
    <AssociateMoodForm />

    {/* Achievements */}
    <GamificationBadgeGrid />

    {/* Explainable Chat */}
    <GenAIExplainBox />
  </motion.div>
);

export default AssociateFeedbackView;
