"use client";
import { motion } from "framer-motion";

export default function HamburgerMenu({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative h-10 w-10 flex flex-col items-center justify-center gap-1.5 md:hidden"
      aria-label="Menu"
    >
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="block h-0.5 w-6 bg-white transition-colors"
      />
      <motion.span
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="block h-0.5 w-6 bg-white"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="block h-0.5 w-6 bg-white"
      />
    </button>
  );
}






