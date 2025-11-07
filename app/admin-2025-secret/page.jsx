"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, DollarSign, Calendar, User } from "lucide-react";
import NavbarAdmin from "../../components/NavbarAdmin";

export default function AdminSecretPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  
  // Formulaire de connexion
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Vérifier si déjà authentifié au chargement
  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
      fetchOrders(savedToken);
    }
  }, []);

  // Auto-refresh toutes les 30 secondes
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const interval = setInterval(() => {
      fetchOrders(token);
    }, 30000); // 30 secondes

    return () => clearInterval(interval);
  }, [isAuthenticated, token]);

  // Connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        setToken(data.token);
        setIsAuthenticated(true);
        localStorage.setItem("admin_token", data.token);
        fetchOrders(data.token);
      } else {
        setError(data.message || "Identifiants incorrects");
      }
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les commandes
  const fetchOrders = async (authToken) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders || []);
      } else {
        setError(data.message || "Erreur de chargement");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setToken("");
    setOrders([]);
    setUsername("");
    setPassword("");
  };

  // Rafraîchir
  const handleRefresh = () => {
    fetchOrders(token);
  };

  // Changer le statut d'une commande
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      // Convertir le statut en français pour orders.json
      const statusMap = {
        pending: "en attente",
        paid: "payée",
        completed: "livrée",
        cancelled: "annulée",
      };

      const frenchStatus = statusMap[newStatus] || newStatus;

      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: frenchStatus }),
      });

      const data = await res.json();

      if (data.success) {
        // Mettre à jour localement
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        console.error("❌ Erreur:", data.message);
        alert(`Erreur: ${data.message}`);
      }
    } catch (error) {
      console.error("❌ Erreur lors du changement de statut:", error);
      alert("Erreur lors de la mise à jour du statut");
    }
  };

  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Formater le statut
  const getStatusLabel = (status) => {
    const labels = {
      paid: "Payée",
      pending: "En attente",
      cancelled: "Annulée",
      completed: "Livrée",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      paid: "bg-green-100 text-green-700 border-green-300",
      pending: "bg-[#C7A451]/20 text-[#C7A451] border-[#C7A451]/40",
      cancelled: "bg-red-100 text-red-700 border-red-300",
      completed: "bg-blue-100 text-blue-700 border-blue-300",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  // Si pas authentifié, afficher formulaire de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F0E9] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-[#C6A34F] to-[#E3C97F] mb-4">
                <Package className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-playfair font-bold text-[#1a1a1a] mb-2">
                Administration
              </h1>
              <p className="text-sm text-[#1a1a1a]/60">
                Accès réservé aux administrateurs
              </p>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#1a1a1a]/10 focus:border-[#C6A34F] focus:outline-none transition-colors"
                  placeholder="Identifiant"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#1a1a1a]/10 focus:border-[#C6A34F] focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-50 border border-red-200"
                >
                  <p className="text-sm text-red-800">{error}</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#C6A34F] to-[#E3C97F] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Interface admin (après authentification)
  return (
    <>
      <NavbarAdmin onRefresh={handleRefresh} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen bg-[#F5F0E9] pt-24 pb-8 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-[#1a1a1a] mb-2">
              Gestion des Commandes
            </h1>
            <p className="text-[#1a1a1a]/60">
              {orders.length} commande{orders.length !== 1 ? "s" : ""} enregistrée{orders.length !== 1 ? "s" : ""}
            </p>
          </motion.div>

        {/* Stats rapides */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            {
              label: "Total commandes",
              value: orders.length,
              icon: Package,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "Payées",
              value: orders.filter((o) => o.status === "paid").length,
              icon: DollarSign,
              color: "from-green-500 to-green-600",
            },
            {
              label: "En attente",
              value: orders.filter((o) => o.status === "pending").length,
              icon: Calendar,
              color: "from-yellow-500 to-yellow-600",
            },
            {
              label: "Clients",
              value: new Set(orders.map((o) => o.customerEmail)).size,
              icon: User,
              color: "from-purple-500 to-purple-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#1a1a1a]/60 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-[#1a1a1a]">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tableau des commandes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Tableau desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#C6A34F] to-[#E3C97F]">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Montant
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Paiement
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Articles
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-[#1a1a1a]/60">
                        Aucune commande pour le moment
                      </td>
                    </tr>
                  ) : (
                    orders.map((order, index) => (
                      <motion.tr
                        key={order._id || order.sessionId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-b border-[#1a1a1a]/5 hover:bg-[#fafafa] transition-colors ${
                          index % 2 === 0 ? "bg-white" : "bg-white"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-[#1a1a1a]">
                              {order.customerName}
                            </p>
                            <p className="text-sm text-[#1a1a1a]/60">
                              {order.customerEmail}
                            </p>
                            {order.customerPhone && (
                              <p className="text-sm text-[#1a1a1a]/60">
                                {order.customerPhone}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-lg font-bold text-[#C6A34F]">
                            {order.totalAmount} MAD
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="capitalize">
                            {order.paymentMethod === "carte" ? "💳 Carte bancaire" : 
                             order.paymentMethod === "stripe" ? "💳 Stripe" : 
                             "💬 WhatsApp"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            className={`px-3 py-2 rounded-lg text-xs font-semibold border-2 cursor-pointer transition-all duration-300 ${getStatusColor(
                              order.status
                            )} hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#C7A451]`}
                          >
                            <option value="pending">En attente</option>
                            <option value="paid">Payée</option>
                            <option value="completed">Livrée</option>
                            <option value="cancelled">Annulée</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#1a1a1a]/80">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            {order.items?.slice(0, 2).map((item, i) => (
                              <div key={i} className="text-[#1a1a1a]/80">
                                {item.quantity}x {item.name}
                              </div>
                            ))}
                            {order.items?.length > 2 && (
                              <div className="text-[#C6A34F] font-medium">
                                +{order.items.length - 2} autre(s)
                              </div>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Vue mobile */}
          <div className="lg:hidden p-4 space-y-4">
            {orders.length === 0 ? (
              <p className="text-center text-[#1a1a1a]/60 py-12">
                Aucune commande pour le moment
              </p>
            ) : (
              orders.map((order, index) => (
                <motion.div
                  key={order._id || order.sessionId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#FAF7F3] rounded-2xl p-4 space-y-3"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-[#1a1a1a]">
                        {order.customerName}
                      </p>
                      <p className="text-sm text-[#1a1a1a]/60">
                        {order.customerEmail}
                      </p>
                    </div>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`px-2 py-1 rounded-lg text-xs font-semibold border-2 cursor-pointer transition-all duration-300 ${getStatusColor(
                        order.status
                      )} hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#C7A451]`}
                    >
                      <option value="pending">En attente</option>
                      <option value="paid">Payée</option>
                      <option value="completed">Livrée</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-[#C6A34F]">
                      {order.totalAmount} MAD
                    </span>
                    <span className="text-sm">
                      {order.paymentMethod === "carte" ? "💳 Carte bancaire" : 
                       order.paymentMethod === "stripe" ? "💳 Stripe" : 
                       "💬 WhatsApp"}
                    </span>
                  </div>
                  <div className="text-sm text-[#1a1a1a]/60">
                    {formatDate(order.createdAt)}
                  </div>
                  <div className="text-sm border-t border-[#1a1a1a]/10 pt-3">
                    {order.items?.map((item, i) => (
                      <div key={i} className="text-[#1a1a1a]/80">
                        {item.quantity}x {item.name}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
        </div>
      </motion.div>
    </>
  );
}

