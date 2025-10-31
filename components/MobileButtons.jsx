"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function MobileButtons() {
  return (
    <>
      {/* Bouton Appeler maintenant - Mobile uniquement */}
      <motion.a
        href="tel:0670873718"
        className="fixed bottom-24 left-4 z-50 md:hidden"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", damping: 18, stiffness: 160 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-3 rounded-full bg-gradient-to-r from-gold to-lightGold px-6 py-4 shadow-2xl ring-1 ring-gold/40">
          <div className="text-2xl">📞</div>
          <span className="font-medium text-coal">Appeler maintenant</span>
        </div>
      </motion.a>

      {/* Bouton WhatsApp - Toutes les pages */}
      <motion.a
        href="https://wa.me/212678978999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 group"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", damping: 18, stiffness: 160 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div 
          className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl animate-pulse" 
          style={{ backgroundColor: "#25D366", animationDuration: "2s" }}
        >
          <MessageCircle className="h-6 w-6 text-white transition-transform group-hover:scale-105" />
        </div>
        <span className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full whitespace-nowrap rounded-lg bg-coal px-3 py-2 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none shadow-lg hidden sm:block">
          Discuter sur WhatsApp
        </span>
      </motion.a>
    </>
  );
}
