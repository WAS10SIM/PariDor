"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "../../../context/CartContext";

export default function SuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    // Vider le panier après paiement réussi
    clear();
  }, [clear]);

  return (
    <div className="min-h-screen bg-bone flex items-center justify-center py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"
          >
            <div className="text-4xl">✅</div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h1 className="mb-4 text-4xl font-light text-coal">
              Merci pour votre commande !
            </h1>
            <p className="text-lg text-coal/70 mb-8">
              Votre paiement a été validé avec succès. Nous vous contacterons bientôt pour confirmer les détails de livraison.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold to-lightGold px-8 py-4 font-medium text-coal shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Retour à l'accueil
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-gold px-8 py-4 font-medium text-gold transition-all duration-300 hover:bg-gold hover:text-coal"
            >
              Nous contacter
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-12 p-6 bg-white/50 rounded-2xl"
          >
            <h3 className="text-lg font-medium text-coal mb-4">Prochaines étapes</h3>
            <div className="text-sm text-coal/70 space-y-2">
              <p>• Vous recevrez un email de confirmation</p>
              <p>• Notre équipe vous contactera sous 24h</p>
              <p>• Livraison selon vos préférences</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
