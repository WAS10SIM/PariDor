"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "../../../context/CartContext";

export default function SuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    // Vider le panier après paiement réussi
    clear();
  }, [clear]);

  return (
    <div className="min-h-screen bg-[#F8F4EC] flex items-center justify-center px-6 pt-24">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
            className="mb-6 flex justify-center"
          >
            <CheckCircle2 className="w-16 h-16 text-[#C7A451]" strokeWidth={1.5} />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-[#C7A451] mt-4 mb-3">
              Merci pour votre commande !
            </h1>
            <p className="text-lg text-coal/80 mb-2 mt-2">
              Votre paiement a été validé avec succès.
            </p>
            <p className="text-base text-coal/60 mb-8">
              Nous vous contacterons bientôt pour confirmer les détails de livraison.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href="/" className="btn-luxury">
              Retour à l'accueil
            </Link>
            <Link href="/contact" className="btn-luxury-outline">
              Nous contacter
            </Link>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 p-6 bg-white/60 rounded-2xl shadow-sm"
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
