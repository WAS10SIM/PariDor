"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ id, message, type = "success", duration = 3000, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onRemove]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "cart":
        return "bg-gold text-coal";
      case "info":
        return "bg-blue-500 text-white";
      default:
        return "bg-coal text-white";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "cart":
        return "🛒";
      case "info":
        return "ℹ️";
      default:
        return "📢";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 300, scale: 0.9 }}
        transition={{ 
          type: "spring", 
          damping: 20, 
          stiffness: 300,
          duration: 0.4 
        }}
        className={`relative rounded-xl px-4 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.08)] ${getTypeStyles()}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{getIcon()}</span>
          <span className="text-sm font-medium">{message}</span>
          <button
            onClick={() => onRemove(id)}
            className="ml-2 text-white/80 hover:text-white transition-colors"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}









