"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ShoppingBag, Info, X } from "lucide-react";

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
        return "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 text-green-800 shadow-lg shadow-green-100/50";
      case "error":
        return "bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/50 text-red-800 shadow-lg shadow-red-100/50";
      case "cart":
        return "bg-gradient-to-r from-[#fff8ec] to-[#fef5e7] border border-[#C7A451]/40 text-[#1E1E1E] shadow-lg shadow-[#C7A451]/20";
      case "info":
        return "bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 text-blue-800 shadow-lg shadow-blue-100/50";
      default:
        return "bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200/50 text-gray-800 shadow-lg";
    }
  };

  const getIcon = () => {
    const iconProps = { className: "w-5 h-5 flex-shrink-0" };
    switch (type) {
      case "success":
        return <CheckCircle2 {...iconProps} className="w-5 h-5 text-green-600" />;
      case "error":
        return <XCircle {...iconProps} className="w-5 h-5 text-red-600" />;
      case "cart":
        return (
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            <ShoppingBag {...iconProps} className="w-5 h-5 text-[#C7A451]" />
          </motion.div>
        );
      case "info":
        return <Info {...iconProps} className="w-5 h-5 text-blue-600" />;
      default:
        return null;
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
        className={`relative rounded-2xl px-5 py-4 shadow-xl backdrop-blur-sm ${getTypeStyles()}`}
        style={{ borderRadius: "16px" }}
      >
        <div className="flex items-center gap-3">
          {getIcon()}
          <span className="text-sm font-medium flex-1">{message}</span>
          <button
            onClick={() => onRemove(id)}
            className="ml-2 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}















