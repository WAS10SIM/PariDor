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
        return "bg-gradient-to-r from-[#fff8ec]/95 to-[#fef5e7]/95 border border-[#C7A451]/40 text-[#1E1E1E] shadow-lg shadow-[#C7A451]/20 backdrop-blur-sm";
      case "error":
        return "bg-gradient-to-r from-red-50/95 to-rose-50/95 border border-red-200/30 text-red-800 shadow-lg shadow-red-100/30 backdrop-blur-sm";
      case "cart":
        return "bg-gradient-to-r from-[#fff8ec]/95 to-[#fef5e7]/95 border border-[#C7A451]/50 text-[#1E1E1E] shadow-lg shadow-[#C7A451]/25 backdrop-blur-sm";
      case "info":
        return "bg-gradient-to-r from-blue-50/95 to-cyan-50/95 border border-blue-200/30 text-blue-800 shadow-lg shadow-blue-100/30 backdrop-blur-sm";
      default:
        return "bg-gradient-to-r from-gray-50/95 to-slate-50/95 border border-gray-200/30 text-gray-800 shadow-lg backdrop-blur-sm";
    }
  };

  const getIcon = () => {
    const iconProps = { className: "w-5 h-5 flex-shrink-0" };
    switch (type) {
      case "success":
        return <CheckCircle2 {...iconProps} className="w-5 h-5 text-[#C7A451]" />;
      case "error":
        return <XCircle {...iconProps} className="w-5 h-5 text-red-600" />;
      case "cart":
        return (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 15,
              duration: 0.4
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
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`relative rounded-2xl px-5 py-4 shadow-xl backdrop-blur-sm ${getTypeStyles()}`}
        style={{ borderRadius: "16px" }}
      >
        <div className="flex items-center gap-3">
          {getIcon()}
          <span className="text-sm font-medium flex-1">{message}</span>
          <button
            onClick={() => onRemove(id)}
            className="ml-2 opacity-70 hover:opacity-100 transition-opacity duration-200"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}















