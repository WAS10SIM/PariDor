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
        return "bg-green-50 border border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border border-red-200 text-red-800";
      case "cart":
        return "bg-[#fff8ec] border border-[#C7A451]/30 text-[#1A1A1A]";
      case "info":
        return "bg-blue-50 border border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border border-gray-200 text-gray-800";
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
        return <ShoppingBag {...iconProps} className="w-5 h-5 text-[#C7A451]" />;
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
        className={`relative rounded-xl px-4 py-3 shadow-lg ${getTypeStyles()}`}
        style={{ borderRadius: "12px" }}
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















