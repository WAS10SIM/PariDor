"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Réduire le temps de chargement pour éviter les pages blanches
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1a1a]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Logo avec animation */}
            <motion.img
              src="/logo.png"
              alt="Pari Dor"
              className="h-24 w-auto object-contain mx-auto mb-6"
              animate={{
                filter: [
                  "drop-shadow(0 0 8px rgba(199,164,81,0.4))",
                  "drop-shadow(0 0 20px rgba(199,164,81,0.8))",
                  "drop-shadow(0 0 8px rgba(199,164,81,0.4))",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Barre de chargement dorée */}
            <div className="w-48 h-1 bg-[#1a1a1a] rounded-full overflow-hidden mx-auto border border-[#C7A451]/30">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-[#C7A451] to-[#D4B975]"
              />
            </div>

            {/* Texte élégant */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-[#C7A451] font-light tracking-widest text-sm"
            >
              L'ART DU CONFORT
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}












