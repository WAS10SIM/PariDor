"use client";
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function SuccessPage() {
  const { clear } = useCart();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateOrder = async () => {
        try {
          // Lire les paramètres de l'URL pour la session ID
          const params = new URLSearchParams(window.location.search);
          const sessionId = params.get("session_id");

          // Récupérer le panier avant de le vider
          const CART_KEY = "paridor-cart";
          const savedCart = localStorage.getItem(CART_KEY);
          const cartItems = savedCart ? JSON.parse(savedCart) : [];

          // Calculer le total réel
          const totalAmount = cartItems.reduce((sum, item) => {
            return sum + (item.price || 0) * (item.quantity || 1);
          }, 0);

          // Mettre à jour le statut dans orders.json
          if (sessionId) {
            try {
              await fetch("/api/orders/update-status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sessionId }),
              });
              console.log("✅ Statut commande mis à jour dans orders.json");
            } catch (fileError) {
              console.error("⚠️ Erreur mise à jour orders.json:", fileError);
            }
          }

          // Sauvegarder la commande dans localStorage
          if (sessionId || cartItems.length > 0) {
            const ORDERS_KEY = "paridor_orders";
            const existingOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
            
            // Vérifier si la commande existe déjà
            const exists = existingOrders.find((o) => o.id === sessionId);
            if (!exists) {
              // Créer un objet commande avec les détails réels
              const order = {
                id: sessionId || `local_${Date.now()}`,
                when: new Date().toISOString(),
                amount_total: totalAmount,
                amount: totalAmount,
                status: "paid",
                items: cartItems.map(item => ({
                  name: item.name,
                  quantity: item.quantity || 1,
                  unitPrice: item.price || 0,
                  size: item.options?.taille || "",
                  color: item.options?.couleur || "",
                })),
              };
              
              existingOrders.unshift(order);
              localStorage.setItem(ORDERS_KEY, JSON.stringify(existingOrders));
            }
          }

          // 🧹 Vider le panier via le Context (synchronisation automatique)
          clear();
          console.log("🧹 Panier vidé automatiquement après paiement réussi");

          // Vider aussi les données client
          localStorage.removeItem("paridor-customer");
        } catch (err) {
          console.error("Erreur lors de la sauvegarde de la commande:", err);
        }
      };

      updateOrder();
    }
  }, [clear]);

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
          className="text-green-500 text-7xl mb-6"
        >
          ✅
        </motion.div>
        
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-gold mb-3"
        >
          Merci pour votre commande !
        </motion.h1>
        
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-coal/80 mb-4"
        >
          Votre commande a été enregistrée avec succès.
        </motion.p>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-base text-coal/60 mb-8"
        >
          Votre panier a été vidé automatiquement. 🧹
        </motion.p>
        
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link href="/mes-commandes" className="btn-luxury px-6 py-3">
            Voir mes commandes
          </Link>
          <Link href="/" className="btn-luxury-outline px-6 py-3">
            Retour à l'accueil
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}