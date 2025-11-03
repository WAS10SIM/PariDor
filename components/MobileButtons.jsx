"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function MobileButtons() {
  return (
    <>
      {/* Bouton WhatsApp - Toutes les pages */}
      <motion.a
        href="https://wa.me/212678978999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", damping: 18, stiffness: 160 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Contacter via WhatsApp"
      >
        <div 
          className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl" 
          style={{ backgroundColor: "#25D366" }}
        >
          <MessageCircle className="h-6 w-6 text-white transition-transform" />
        </div>
      </motion.a>
    </>
  );
}
