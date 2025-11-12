"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Mini-panier sticky affichant le total et les boutons d'action
 * Visible uniquement quand le panier contient des articles
 */
export default function MiniCart() {
  const { items, getTotal } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Afficher le mini-panier si le panier contient des articles
    setIsVisible(items.length > 0);
  }, [items]);

  if (!mounted || !isVisible || items.length === 0) {
    return null;
  }

  const total = getTotal();
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#C7A451]/20 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:hidden"
          style={{
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              {/* Panier info */}
              <div className="flex items-center gap-3 flex-1">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-[#C7A451]" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-[#C7A451] text-white text-xs font-bold flex items-center justify-center">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-coal">
                    {total.toLocaleString("fr-MA")} MAD
                  </p>
                  <p className="text-xs text-coal/60">
                    {totalItems} article{totalItems > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href="/panier"
                  prefetch
                  className="px-4 py-2 text-sm font-medium text-[#C7A451] border border-[#C7A451] rounded-xl hover:bg-[#C7A451]/10 transition-colors duration-200"
                >
                  Voir
                </Link>
                <Link
                  href="/checkout"
                  prefetch
                  className="btn-luxury px-6 py-2 text-sm"
                >
                  Commander
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

