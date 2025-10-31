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
      <div className="min-h-screen bg-beige py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center text-coal text-xl">Chargement...</div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-beige py-24">
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
    <div className="min-h-screen bg-beige py-24">
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
                  <p className="text-2xl font-bold" style={{ color: "#C6A34F" }}>
                    {order.amount_total || order.amount || 0} MAD
                  </p>
                  <p className="text-sm text-coal/60 capitalize">
                    {order.status === "paid" ? "Payée" : order.status || "En attente"}
                  </p>
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
                <div className="border-t border-coal/10 pt-4">
                  <h3 className="mb-2 font-medium text-coal">Articles commandés :</h3>
                  <ul className="space-y-3">
                    {order.items.map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between text-sm text-coal/70">
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <div className="h-12 w-12 overflow-hidden rounded-md">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={item.image} alt={item.name || 'Produit'} className="h-full w-full object-cover" />
                            </div>
                          )}
                          <span>
                            {item.name || item.productName} {item.size && `(${item.size})`}{" "}
                            {item.color && `- ${item.color}`} × {item.quantity}
                          </span>
                        </div>
                        <span className="font-medium">{(item.unitPrice || item.price || 0) * (item.quantity || 1)} MAD</span>
                      </li>
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
