"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { WHATSAPP_URL } from "../../data/company";

export default function PanierPage() {
  const { mounted, items, removeItem, updateQty, clear, subtotal, totalItems } = useCart();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bone py-24 flex items-center justify-center">
        <div className="text-coal text-xl">Chargement du panier...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-bone py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-8 text-4xl font-light text-coal">Votre panier</h1>
            <div className="rounded-3xl bg-white p-12 shadow-lg">
              <div className="mb-6 text-6xl">🛒</div>
              <h2 className="mb-4 text-2xl font-medium text-coal">Votre panier est vide</h2>
              <p className="mb-8 text-coal/60">Découvrez nos créations et ajoutez vos articles préférés.</p>
              <Link
                href="/#creations"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-gold to-lightGold px-8 py-4 font-medium text-coal shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                Découvrir nos créations
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mb-8 text-4xl font-light text-coal">Votre panier</h1>
          
          <div className="space-y-6">
            {items.map((item, index) => {
              // Créer la clé unique pour cet item
              const optionsStr = item.options ? JSON.stringify(item.options) : '';
              const itemKey = `${item.id}_${optionsStr}`;
              
              return (
                <motion.div
                  key={itemKey}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center gap-6 rounded-3xl bg-white p-6 shadow-lg"
                >
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.name || "Produit"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-coal">{item.name}</h3>
                    <div className="mt-1 text-sm text-coal/60">
                      {item.options && Object.entries(item.options).map(([key, value]) => (
                        <span key={key} className="mr-2">
                          {key}: {value}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(itemKey, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-coal/20 bg-white text-coal transition-colors hover:border-gold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(itemKey, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-coal/20 bg-white text-coal transition-colors hover:border-gold"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="text-xl font-medium text-gold">
                      {(item.price * item.quantity).toLocaleString("fr-MA")} MAD
                    </div>
                    
                    <button
                      onClick={() => removeItem(itemKey)}
                      className="text-coal/60 transition-colors hover:text-coal"
                    >
                      ✕
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 rounded-3xl bg-white p-8 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-medium text-coal">Total</h2>
              <div className="text-3xl font-bold text-gold">
                {subtotal.toLocaleString("fr-MA")} MAD
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={clear}
                className="flex-1 rounded-full border-2 border-coal/20 px-6 py-3 font-medium text-coal transition-all duration-300 hover:border-gold hover:bg-coal/5"
              >
                Vider le panier
              </button>
              
              <Link
                href="/checkout"
                className="flex-1 rounded-full bg-gradient-to-r from-gold to-lightGold px-6 py-3 text-center font-medium text-coal shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-opacity-90"
              >
                Passer à la commande
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
