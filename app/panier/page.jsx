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
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 rounded-3xl bg-white p-4 sm:p-6 shadow-lg"
                >
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name || "Produit"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0 pr-2 w-full sm:w-auto">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                      <h3 className="text-lg sm:text-xl font-medium text-coal flex-1">{item.name}</h3>
                      <div className="text-lg sm:text-xl font-semibold text-[#C7A451] flex-shrink-0">
                        {(item.price * item.quantity).toLocaleString("fr-MA")} MAD
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      {item.options?.color && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-coal/60">Couleur:</span>
                          <div className="flex items-center gap-1.5">
                            <div 
                              className="h-5 w-5 rounded-full border-2 border-white shadow-sm" 
                              style={{ backgroundColor: item.options.colorCode || item.options.colorKey || item.options.color }}
                              title={item.options.color}
                              aria-label={`Couleur ${item.options.color}`}
                            />
                            <span className="text-sm text-coal/70 font-medium">{item.options.color}</span>
                          </div>
                        </div>
                      )}
                      {item.options && Object.entries(item.options)
                        .filter(([key]) => key !== 'color' && key !== 'colorCode' && key !== 'colorKey')
                        .map(([key, value]) => (
                          <span key={key} className="text-sm text-coal/60">
                            {key}: {value}
                          </span>
                        ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(itemKey, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-coal/20 bg-white text-coal transition-colors hover:border-[#C7A451]"
                        aria-label="Diminuer la quantité"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(itemKey, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-coal/20 bg-white text-coal transition-colors hover:border-[#C7A451]"
                        aria-label="Augmenter la quantité"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      onClick={() => removeItem(itemKey)}
                      className="text-coal/60 transition-colors hover:text-coal p-1"
                      aria-label="Supprimer l'article"
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
            className="mt-8 rounded-3xl bg-[#FAF7F3] p-8 shadow-md"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-medium text-coal mb-1">Total TTC</h2>
                <p className="text-sm text-coal/60">Toutes taxes comprises</p>
              </div>
              <div className="text-3xl font-bold text-[#C7A451]">
                {subtotal.toLocaleString("fr-MA")} MAD
              </div>
            </div>
            
            <div className="flex gap-4">
              <motion.button
                onClick={clear}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 rounded-full border-2 border-[#C7A451] px-6 py-3 font-medium text-[#C7A451] transition-all duration-300 hover:bg-[#C7A451]/10 hover:shadow-md"
                style={{ letterSpacing: "0.3px" }}
              >
                Vider le panier
              </motion.button>
              
              <motion.div
                className="flex-1"
                animate={items.length > 0 ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Link
                  href="/checkout"
                  className="block rounded-full bg-gradient-to-r from-[#C7A451] to-[#D4B975] px-6 py-3 text-center font-semibold text-[#111] shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-[#C7A451]/40 hover:scale-105"
                  style={{ letterSpacing: "0.3px" }}
                >
                  Passer à la commande
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
