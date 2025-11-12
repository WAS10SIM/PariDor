"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, DollarSign, Calendar, User } from "lucide-react";
import NavbarAdmin from "../../components/NavbarAdmin";

export default function AdminSecretPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
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
      // Chargement différé des commandes après un court délai pour ne pas bloquer le rendu
      setTimeout(() => {
        fetchOrders(savedToken);
      }, 100);
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
        // Chargement différé après connexion
        setTimeout(() => {
          fetchOrders(data.token);
        }, 100);
      } else {
        setError(data.message || "Identifiants incorrects");
      }
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les commandes (chargement différé)
  const fetchOrders = async (authToken) => {
    setOrdersLoading(true);
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
      setOrdersLoading(false);
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

  // Exporter les commandes en CSV
  const handleExportCSV = () => {
    if (orders.length === 0) {
      alert("Aucune commande à exporter");
      return;
    }

    // En-têtes CSV
    const headers = [
      "ID",
      "Date",
      "Client",
      "Email",
      "Téléphone",
      "Adresse",
      "Ville",
      "Statut",
      "Montant Total (MAD)",
      "Articles",
    ];

    // Convertir les commandes en lignes CSV
    const rows = orders.map((order) => {
      const items = order.items
        ? order.items
            .map((item) => `${item.quantity}x ${item.name || item.productName || "N/A"}`)
            .join("; ")
        : "Aucun article";

      return [
        order._id || order.sessionId || order.id || "N/A",
        order.createdAt
          ? new Date(order.createdAt).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A",
        order.customerName || order.customer?.name || "N/A",
        order.customerEmail || order.customer?.email || "N/A",
        order.customerPhone || order.customer?.phone || "N/A",
        order.customerAddress || order.customer?.address || "N/A",
        order.customerCity || order.customer?.city || "N/A",
        order.status || "pending",
        order.totalAmount || order.amount_total || order.amount || "0",
        items,
      ];
    });

    // Créer le contenu CSV
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Créer et télécharger le fichier
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `commandes_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  // Calculer les stats avec useMemo pour optimiser les performances
  const stats = useMemo(() => {
    if (!orders.length) {
      return {
        total: 0,
        paid: 0,
        pending: 0,
        clients: 0,
        totalSales: 0,
      };
    }
    return {
      total: orders.length,
      paid: orders.filter((o) => o.status === "paid" || o.status === "payée").length,
      pending: orders.filter((o) => o.status === "pending" || o.status === "en attente").length,
      clients: new Set(orders.map((o) => o.customerEmail || o.customer?.email).filter(Boolean)).size,
      totalSales: orders.reduce((sum, o) => sum + (o.totalAmount || o.amount_total || o.amount || 0), 0),
    };
  }, [orders]);

  // Si pas authentifié, afficher formulaire de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F0E9] flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 sm:p-10">
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
                <label className="block text-sm font-medium text-[#1E1E1E] mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#1E1E1E]/10 focus:border-[#C7A451] focus:outline-none focus:ring-2 focus:ring-[#C7A451]/20 transition-colors"
                  placeholder="Identifiant"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E1E1E] mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#1E1E1E]/10 focus:border-[#C7A451] focus:outline-none focus:ring-2 focus:ring-[#C7A451]/20 transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-luxury w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Interface admin (après authentification)
  return (
    <>
      <NavbarAdmin onRefresh={handleRefresh} />
      
      <div className="min-h-screen bg-[#FAF8F5] pt-20 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-[#1E1E1E] mb-2">
                Gestion des Commandes
              </h1>
              <p className="text-[#1E1E1E]/60">
                {orders.length} commande{orders.length !== 1 ? "s" : ""} enregistrée{orders.length !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={handleExportCSV}
              disabled={orders.length === 0 || ordersLoading}
              className="btn-luxury-outline flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exporter CSV
            </button>
          </div>

        {/* Stats rapides */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            {
              label: "Total commandes",
              value: stats.total,
              icon: Package,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "Total ventes",
              value: `${(stats.totalSales / 1000).toFixed(1)}k MAD`,
              icon: DollarSign,
              color: "from-green-500 to-green-600",
            },
            {
              label: "En attente",
              value: stats.pending,
              icon: Calendar,
              color: "from-yellow-500 to-yellow-600",
            },
            {
              label: "Clients",
              value: stats.clients,
              icon: User,
              color: "from-purple-500 to-purple-600",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-[#1E1E1E]/60 mb-1">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#1E1E1E]">{stat.value}</p>
                </div>
                <div className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tableau des commandes */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Skeleton loader pendant le chargement */}
          {ordersLoading && orders.length === 0 ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Tableau desktop */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-[#C7A451] to-[#D4B975]">
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white">
                        ID
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white">
                        Client
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white">
                        Montant
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white">
                        Paiement
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white">
                        Statut
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white">
                        Date
                      </th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-white">
                        Articles
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="px-6 py-12 text-center text-[#1E1E1E]/60">
                          Aucune commande pour le moment
                        </td>
                      </tr>
                    ) : (
                      orders.map((order, index) => (
                        <tr
                          key={order._id || order.sessionId || index}
                          className="border-b border-[#1E1E1E]/5 hover:bg-[#fafafa] transition-colors duration-200"
                        >
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <p className="text-xs font-mono text-[#1E1E1E]/60">
                              #{(order._id || order.sessionId || order.id || "N/A").toString().slice(-8)}
                            </p>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <div>
                              <p className="text-sm sm:text-base font-medium text-[#1E1E1E]">
                                {order.customerName || order.customer?.name || "N/A"}
                              </p>
                              <p className="text-xs sm:text-sm text-[#1E1E1E]/60">
                                {order.customerEmail || order.customer?.email || "N/A"}
                              </p>
                              {(order.customerPhone || order.customer?.phone) && (
                                <p className="text-xs sm:text-sm text-[#1E1E1E]/60">
                                  {order.customerPhone || order.customer?.phone}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-base sm:text-lg font-bold text-[#C7A451]">
                              {(order.totalAmount || order.amount_total || order.amount || 0).toLocaleString("fr-MA")} MAD
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs sm:text-sm capitalize">
                              {order.paymentMethod === "carte" ? "💳 Carte" : 
                               order.paymentMethod === "stripe" ? "💳 Stripe" : 
                               "💬 WhatsApp"}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order._id || order.sessionId || order.id, e.target.value)}
                              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-semibold border-2 cursor-pointer transition-all duration-200 ${getStatusColor(
                                order.status
                              )} hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#C7A451]`}
                            >
                              <option value="pending">En attente</option>
                              <option value="paid">Payée</option>
                              <option value="completed">Livrée</option>
                              <option value="cancelled">Annulée</option>
                            </select>
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-[#1E1E1E]/80">
                            {formatDate(order.createdAt || order.date || order.when)}
                          </td>
                          <td className="px-4 sm:px-6 py-3 sm:py-4">
                            <div className="text-xs sm:text-sm">
                              {order.items?.slice(0, 2).map((item, i) => (
                                <div key={i} className="text-[#1E1E1E]/80">
                                  {item.quantity}x {item.name || item.productName || "N/A"}
                                </div>
                              ))}
                              {order.items?.length > 2 && (
                                <div className="text-[#C7A451] font-medium">
                                  +{order.items.length - 2} autre(s)
                                </div>
                              )}
                              {(!order.items || order.items.length === 0) && (
                                <div className="text-[#1E1E1E]/40 italic">Aucun article</div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
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
                    <div
                      key={order._id || order.sessionId || index}
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
                      onChange={(e) => handleStatusChange(order._id || order.sessionId || order.id, e.target.value)}
                      className={`px-2 py-1 rounded-lg text-xs font-semibold border-2 cursor-pointer transition-all duration-200 ${getStatusColor(
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
                    <span className="text-xl font-bold text-[#C7A451]">
                      {(order.totalAmount || order.amount_total || order.amount || 0).toLocaleString("fr-MA")} MAD
                    </span>
                    <span className="text-sm">
                      {order.paymentMethod === "carte" ? "💳 Carte bancaire" : 
                       order.paymentMethod === "stripe" ? "💳 Stripe" : 
                       "💬 WhatsApp"}
                    </span>
                  </div>
                  <div className="text-sm text-[#1a1a1a]/60">
                    {formatDate(order.createdAt || order.date || order.when)}
                  </div>
                  <div className="text-sm border-t border-[#1a1a1a]/10 pt-3">
                    {order.items?.map((item, i) => (
                      <div key={i} className="text-[#1a1a1a]/80">
                        {item.quantity}x {item.name || item.productName || "N/A"}
                      </div>
                    ))}
                  </div>
                </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
        </div>
      </div>
    </>
  );
}

