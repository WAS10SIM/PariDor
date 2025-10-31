"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { readOrders } from "../../lib/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const allOrders = readOrders();
    // Trier par date (plus récent en premier)
    const sortedOrders = allOrders.sort((a, b) => new Date(b.when) - new Date(a.when));
    setOrders(sortedOrders);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-beige py-24 flex items-center justify-center">
        <div className="text-coal text-xl">Chargement de vos commandes...</div>
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
              <div className="mb-6 text-6xl">📦</div>
              <h2 className="mb-4 text-2xl font-medium text-coal">Aucune commande</h2>
              <p className="mb-8 text-coal/60">Vous n'avez pas encore passé de commande.</p>
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
              key={order.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="rounded-3xl bg-white p-8 shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-xl font-medium text-coal mb-2">
                    Commande #{order.id.slice(-8)}
                  </h3>
                  <p className="text-coal/60">
                    {new Date(order.when).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gold">
                    {(order.amount_total / 100).toLocaleString("fr-MA")} MAD
                  </p>
                  <p className="text-sm text-coal/60 capitalize">
                    {order.payment_status}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div>
                  <h4 className="font-medium text-coal mb-2">Articles</h4>
                  <div className="space-y-2">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between text-sm">
                        <span className="text-coal/70">
                          {item.description} x{item.quantity}
                        </span>
                        <span className="text-coal">
                          {(item.amount_total / 100).toLocaleString("fr-MA")} MAD
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-coal mb-2">Livraison</h4>
                  <p className="text-sm text-coal/70">
                    {order.customer.name}
                  </p>
                  <p className="text-sm text-coal/70">
                    {order.customer.email}
                  </p>
                  <p className="text-sm text-coal/70">
                    {order.customer.phone}
                  </p>
                  {order.customer.address && (
                    <p className="text-sm text-coal/70">
                      {order.customer.address}
                      {order.customer.city && `, ${order.customer.city}`}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/#creations"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-gold to-lightGold px-8 py-4 font-medium text-coal shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            Continuer mes achats
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
