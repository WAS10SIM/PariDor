"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Package, MapPin } from "lucide-react";

const ORDERS_KEY = "paridor_orders";

function readOrders() {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(ORDERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Erreur lecture commandes:", error);
    return [];
  }
}

export default function MesCommandesPage() {
  const [orders, setOrders] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const all = readOrders();
    const sorted = all.sort((a, b) => new Date(b.when || b.createdAt || 0) - new Date(a.when || a.createdAt || 0));
    setOrders(sorted);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center text-coal text-xl">Chargement...</div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-8 text-4xl font-light text-coal">Mes commandes</h1>
            <div className="rounded-3xl bg-white p-12 shadow-lg">
              <Package className="mx-auto h-16 w-16 text-coal/30 mb-4" />
              <h2 className="mb-4 text-2xl font-medium text-coal">Aucune commande</h2>
              <p className="mb-8 text-coal/60">Vous n'avez pas encore passé de commande.</p>
              <Link href="/#creations" className="btn-luxury inline-flex items-center">
                Découvrir nos créations
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#FAF8F5] py-24">
      <div className="mx-auto max-w-4xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center text-4xl font-light text-coal"
        >
          Mes commandes
        </motion.h1>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id || index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="rounded-3xl bg-white p-6 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold text-gold">Commande #{order.id?.slice(-6) || "N/A"}</p>
                  <div className="flex items-center gap-2 text-sm text-coal/60 mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {order.when
                        ? new Date(order.when).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "Date inconnue"}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#C7A451] mb-2">
                    {order.amount_total || order.amount || 0} MAD
                  </p>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
                      order.status === "paid" || order.status === "complete"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : order.status === "processing" || order.status === "preparation"
                        ? "bg-[#C7A451]/20 text-[#C7A451] border-[#C7A451]/40"
                        : order.status === "delivered" || order.status === "livree"
                        ? "bg-blue-100 text-blue-700 border-blue-300"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                    }`}
                  >
                    {order.status === "paid" || order.status === "complete"
                      ? "Payée"
                      : order.status === "processing" || order.status === "preparation"
                      ? "En préparation"
                      : order.status === "delivered" || order.status === "livree"
                      ? "Livrée"
                      : order.status || "En attente"}
                  </motion.span>
                </div>
              </div>

              {order.customer && (
                <div className="mb-4 rounded-lg bg-beige/50 p-3">
                  <div className="flex items-center gap-2 text-sm text-coal/70">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">{order.customer.name || "Client"}</span>
                    {order.customer.city && <span className="text-coal/50">• {order.customer.city}</span>}
                  </div>
                </div>
              )}

              {order.items && order.items.length > 0 && (
                <div className="border-t border-coal/10 pt-6 mt-6">
                  <h3 className="mb-4 font-medium text-coal">Articles commandés :</h3>
                  <ul className="space-y-4">
                    {order.items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        className="flex items-center justify-between gap-4 text-sm text-coal/70 bg-[#FAF7F3]/50 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          {item.image && (
                            <div className="relative h-14 w-14 overflow-hidden rounded-lg flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name || 'Produit'}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                          )}
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-medium text-coal">
                              {item.name || item.productName}
                            </span>
                            {item.size && <span className="text-coal/60">({item.size})</span>}
                            {item.color && (
                              <div className="flex items-center gap-2">
                                <span className="text-coal/60">Couleur:</span>
                                <div 
                                  className="h-5 w-5 rounded-full border-2 border-white shadow-sm" 
                                  style={{ backgroundColor: item.colorCode || item.color }}
                                  title={item.color}
                                  aria-label={`Couleur ${item.color}`}
                                />
                              </div>
                            )}
                            <span className="text-coal/60">× {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-semibold text-coal">{(item.unitPrice || item.price || 0) * (item.quantity || 1)} MAD</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link href="/#creations" className="btn-luxury-outline inline-flex items-center">
            Continuer mes achats
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
