"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import SmartLink from "./SmartLink";
import { X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/notre-histoire", label: "Notre histoire" },
  { href: "/creations", label: "Créations" },
  { href: "/#testimonials", label: "Témoignages" },
  { href: "/#contact", label: "Contact" },
  { href: "/mes-commandes", label: "Mes commandes" },
];

export default function MobileDrawer({ isOpen, onClose, active }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-[85%] max-w-sm bg-[#FAF8F5] shadow-2xl md:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#C6A34F]/20">
              <img
                src="/logo.png"
                alt="Pari Dor"
                className="h-12 w-auto object-contain"
              />
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C6A34F]/10 text-[#C6A34F] transition-all duration-300 hover:bg-[#C6A34F] hover:text-white"
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-6 space-y-2">
              {LINKS.map(({ href, label }) => (
                <SmartLink
                  key={href}
                  href={href}
                  onClick={onClose}
                  className={`block py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    active === href
                      ? "bg-[#C6A34F] text-white shadow-md"
                      : "text-[#1a1a1a] hover:bg-[#C6A34F]/10 hover:text-[#C6A34F]"
                  }`}
                >
                  {label}
                </SmartLink>
              ))}
            </nav>

            {/* Catalogue Button */}
            <div className="p-6 border-t border-[#C6A34F]/20">
              <Link
                href="/produits"
                onClick={onClose}
                className="block w-full px-6 py-4 rounded-full bg-gradient-to-r from-[#C6A34F] to-[#E3C97F] text-center text-[#1a1a1a] font-medium shadow-lg transition-all duration-300 hover:scale-105"
              >
                Voir le Catalogue
              </Link>
            </div>

            {/* Footer info */}
            <div className="p-6 text-center text-sm text-[#1a1a1a]/60">
              <p className="font-playfair italic">L'art du confort sur mesure</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

