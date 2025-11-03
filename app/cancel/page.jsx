"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-beige flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-orange-500 text-7xl mb-6"
        >
          ⚠️
        </motion.div>
        
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-coal mb-3"
        >
          Paiement annulé
        </motion.h1>
        
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-coal/80 mb-8"
        >
          Votre panier est intact. Vous pouvez réessayer quand vous le souhaitez.
        </motion.p>
        
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link href="/panier" className="btn-luxury px-6 py-3">
            Retour au panier
          </Link>
          <Link href="/" className="btn-luxury-outline px-6 py-3">
            Retour à l'accueil
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}







