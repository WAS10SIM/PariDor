"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Loader d'accueil luxueux optimisé pour la performance
 * - Apparaît instantanément au chargement
 * - Disparaît automatiquement après chargement des ressources critiques (max 1.2s)
 * - Transition fluide fade + slide up sans blocage du rendu
 * - GPU-optimized pour performance maximale
 * - Ne bloque jamais l'hydratation React
 */
export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Vérifier que nous sommes côté client
    if (typeof window === 'undefined') return;

    // Fonction pour masquer le loader de manière optimisée
    const hideLoader = () => {
      setIsVisible(false);
      // Supprimer du DOM après l'animation de sortie (800ms)
      setTimeout(() => {
        setShouldRender(false);
      }, 800);
    };

    // Temps maximum d'affichage : 1 seconde (1000ms) comme demandé
    const maxDisplayTime = 1000;

    // Vérifier l'état initial du DOM
    const startTime = Date.now();
    
    const handleReady = () => {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, maxDisplayTime - elapsed);
      
      // Attendre le temps restant avant de masquer (max 1s)
      setTimeout(hideLoader, remainingTime);
    };

    if (document.readyState === 'complete') {
      // Si le DOM est déjà prêt, masquer rapidement (max 1s)
      const timer = setTimeout(handleReady, maxDisplayTime);
      return () => clearTimeout(timer);
    } else {
      // Attendre que le DOM soit complètement chargé
      window.addEventListener('load', handleReady, { once: true });
      
      // Timer de sécurité : maximum 1s d'affichage
      const maxTimer = setTimeout(hideLoader, maxDisplayTime);
      
      return () => {
        window.removeEventListener('load', handleReady);
        clearTimeout(maxTimer);
      };
    }
  }, []);

  // Ne pas rendre si on ne doit plus afficher (optimisation mémoire)
  if (!shouldRender) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut"
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F0F0F] loader-container"
          aria-label="Chargement"
          role="status"
          aria-live="polite"
          suppressHydrationWarning
        >
          <div className="text-center">
            {/* Logo avec animation subtile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                ease: "easeOut",
                delay: 0.1 
              }}
              className="mb-8"
            >
              <div className="relative h-20 w-auto mx-auto">
                <Image
                  src="/logo.png"
                  alt="Pari Dor - Logo"
                  width={200}
                  height={85}
                  className="h-20 w-auto object-contain mx-auto"
                  priority
                  fetchPriority="high"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(199, 164, 81, 0.4))',
                  }}
                />
              </div>
            </motion.div>

            {/* Ligne dorée fine */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 120, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: 0.3 
              }}
              className="h-[2px] bg-gradient-to-r from-[#C7A451] via-[#C7A451] to-[#C7A45150] mx-auto mb-6"
            />

            {/* Texte "L'ART DU CONFORT" */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                ease: "easeOut",
                delay: 0.4 
              }}
              className="text-[#C7A451] font-playfair text-lg font-light"
              style={{
                letterSpacing: '2px',
              }}
            >
              L'ART DU CONFORT
            </motion.p>

            {/* Barre de chargement subtile */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ 
                duration: 1, 
                ease: "easeInOut",
                delay: 0.5 
              }}
              className="h-[1px] bg-gradient-to-r from-transparent via-[#C7A451] to-transparent mx-auto mt-8 max-w-[200px]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
