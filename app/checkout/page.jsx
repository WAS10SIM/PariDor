"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../components/toast/ToastProvider";
import Link from "next/link";
import { formatMAD } from "../../lib/money";
import { toWhatsApp } from "../../lib/phone";
import { COMPANY } from "../../data/company";

export default function CheckoutPage() {
  const { mounted, items, subtotal, clear, customer, updateCustomer } = useCart();
  const toast = useToast();
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false);

  // Skeleton pendant le chargement
  if (!mounted) {
    return (
      <div className="bg-[#FAF8F5] py-24 min-h-screen">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-lg animate-pulse h-[600px]">
              <div className="h-8 bg-gray-200 rounded mb-6 w-1/3" />
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 rounded" />
                <div className="h-12 bg-gray-200 rounded" />
                <div className="h-12 bg-gray-200 rounded" />
                <div className="h-12 bg-gray-200 rounded" />
                <div className="h-12 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="rounded-3xl bg-white p-8 shadow-lg animate-pulse h-[400px]">
              <div className="h-8 bg-gray-200 rounded mb-6 w-1/2" />
              <div className="space-y-4">
                <div className="h-20 bg-gray-200 rounded" />
                <div className="h-20 bg-gray-200 rounded" />
              </div>
              <div className="mt-8 h-12 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Panier vide
  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-[#FAF8F5]">
        <h1 className="text-4xl font-playfair font-bold text-coal mb-4">Votre panier est vide</h1>
        <p className="text-lg text-coal/70 mb-8">Impossible de finaliser une commande sans articles.</p>
        <Link href="/#creations" className="btn-luxury">Retour au catalogue</Link>
      </div>
    );
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateCustomer(name, value);
  };

  const handleWhatsAppOrder = () => {
    setIsWhatsAppLoading(true);

    if (!customer.fullName || !customer.phone) {
      toast.error("Veuillez remplir au minimum le nom complet et le téléphone pour la commande WhatsApp.");
      setIsWhatsAppLoading(false);
      return;
    }

    const orderMessage = `Bonjour, je souhaite commander :
${items.map(item => `• ${item.name} x${item.quantity} ${item.options ? `(${Object.values(item.options).join(', ')})` : ''} — ${formatMAD(item.price * item.quantity)}`).join('\n')}

Total: ${formatMAD(subtotal)}

Mes coordonnées :
Nom: ${customer.fullName}
Téléphone: ${customer.phone}
Email: ${customer.email || 'Non fourni'}
Adresse: ${customer.address || 'Non fournie'}
Ville: ${customer.city || 'Non fournie'}

Merci de me contacter pour finaliser la commande.`;

    window.open(`${toWhatsApp(COMPANY.whatsapp)}?text=${encodeURIComponent(orderMessage)}`, '_blank');
    toast.info("Votre commande WhatsApp est prête — complétez l'envoi dans WhatsApp.");
    
    setTimeout(() => {
      setIsWhatsAppLoading(false);
    }, 1000);
  };

  const handleStripeCheckout = async () => {
    try {
      setIsStripeLoading(true);
      
      // Validation minimale client
      if (!customer.fullName || !customer.email || !customer.phone || !customer.address || !customer.city) {
        toast.error("Veuillez compléter vos informations.");
        return;
      }
      if (!items || items.length === 0) {
        toast.error("Votre panier est vide.");
        return;
      }

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items,
          customerInfo: {
            name: customer.fullName,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
          }
        }),
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || `HTTP ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data?.url) {
        window.location.assign(data.url);
      } else {
        toast.error("Impossible d'ouvrir le paiement.");
      }
    } catch (e) {
      toast.error(`Erreur paiement: ${e.message}. Réessayez.`);
    } finally {
      setIsStripeLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] py-24 pb-32 md:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-5xl font-light text-coal md:text-6xl"
        >
          Finaliser ma commande
        </motion.h1>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left Column: Customer Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-white p-8 shadow-lg"
          >
            <h2 className="mb-6 text-3xl font-light text-coal">Vos coordonnées</h2>
            <form className="space-y-8">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-coal/70 mb-2">Nom complet*</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={customer.fullName}
                  onChange={handleInputChange}
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-coal/20 bg-bone px-4 py-3 text-coal focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                  aria-label="Nom complet"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-coal/70 mb-2">Email*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customer.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  className="w-full rounded-lg border border-coal/20 bg-bone px-4 py-3 text-coal focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                  aria-label="Email"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-coal/70 mb-2">Téléphone*</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  value={customer.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-coal/20 bg-bone px-4 py-3 text-coal focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                  aria-label="Téléphone"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-coal/70 mb-2">Adresse</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={customer.address}
                  onChange={handleInputChange}
                  autoComplete="street-address"
                  className="w-full rounded-lg border border-coal/20 bg-bone px-4 py-3 text-coal focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                  aria-label="Adresse de livraison"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-coal/70 mb-2">Ville</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={customer.city}
                  onChange={handleInputChange}
                  autoComplete="address-level2"
                  className="w-full rounded-lg border border-coal/20 bg-bone px-4 py-3 text-coal focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                  aria-label="Ville"
                />
              </div>
            </form>
          </motion.div>

          {/* Right Column: Cart Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-white p-8 shadow-lg sticky top-28 h-fit"
          >
            <h2 className="mb-6 text-3xl font-light text-coal">Résumé de la commande</h2>
            
            {/* Articles */}
            <div className="mb-6 space-y-4">
              {items.map((item) => {
                // Créer la clé unique pour cet item
                const optionsStr = item.options ? JSON.stringify(item.options) : '';
                const itemKey = `${item.id}_${optionsStr}`;
                
                return (
                  <div key={itemKey} className="flex items-start sm:items-center gap-3 sm:gap-4">
                    {item.image ? (
                      <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-bone flex items-center justify-center flex-shrink-0 shadow-md">
                        <span className="text-xl sm:text-2xl">🛋️</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-1">
                        <h3 className="text-sm sm:text-base font-medium text-coal truncate flex-1">{item.name}</h3>
                        <div className="text-base sm:text-lg font-semibold text-[#C7A451] flex-shrink-0">
                          {(item.price * item.quantity).toLocaleString("fr-MA")} MAD
                        </div>
                      </div>
                      <p className="text-sm text-coal/60 mb-1">Quantité: {item.quantity}</p>
                      {item.options && Object.entries(item.options).length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap mt-1">
                          {item.options.color && (
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs text-coal/60">Couleur:</span>
                              <div 
                                className="h-4 w-4 rounded-full border border-white shadow-sm" 
                                style={{ backgroundColor: item.options.colorCode || item.options.colorKey || item.options.color }}
                                title={item.options.color}
                                aria-label={`Couleur ${item.options.color}`}
                              />
                              <span className="text-xs text-coal/70 font-medium">{item.options.color}</span>
                            </div>
                          )}
                          {Object.entries(item.options)
                            .filter(([key]) => key !== 'color' && key !== 'colorCode' && key !== 'colorKey')
                            .map(([key, value]) => (
                              <span key={key} className="text-xs text-coal/60">
                                {key}: {value}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Totaux */}
            <div className="border-t border-[#C7A451]/30 pt-6 mb-8">
              <div className="flex justify-between text-lg text-coal/80 mb-2">
                <span>Sous-total:</span>
                <span className="pr-2">{formatMAD(subtotal)}</span>
              </div>
              <div className="flex justify-between text-lg text-coal/80 mb-4">
                <span>Frais de livraison:</span>
                <span className="pr-2">Gratuit</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-coal/10">
                <span className="text-lg sm:text-xl font-semibold text-coal">Total:</span>
                <span className="text-2xl sm:text-3xl font-bold text-[#C7A451] pr-2">{formatMAD(subtotal)}</span>
              </div>
            </div>
            
            {/* Boutons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleStripeCheckout}
                disabled={isStripeLoading || isWhatsAppLoading}
                className="btn-luxury w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                aria-label="Payer par carte bancaire"
                style={{ letterSpacing: "0.3px" }}
              >
                {isStripeLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-coal border-t-transparent rounded-full"
                    />
                    <span>Redirection vers le paiement...</span>
                  </>
                ) : (
                  "Payer par carte"
                )}
              </button>
              {/* Desktop: Bouton WhatsApp (caché sur mobile car fixe en bas) */}
              <button
                onClick={handleWhatsAppOrder}
                disabled={isStripeLoading || isWhatsAppLoading}
                className="hidden md:flex w-full rounded-xl bg-green-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-600 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center gap-2"
                aria-label="Commander via WhatsApp"
                style={{ letterSpacing: "0.3px" }}
              >
                {isWhatsAppLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Ouverture...</span>
                  </>
                ) : (
                  <>
                    <span>📱</span>
                    <span>Commander via WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile: Bouton WhatsApp fixe en bas */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-x-0 bottom-0 z-30 md:hidden bg-white border-t border-coal/10 shadow-2xl pb-[env(safe-area-inset-bottom)]"
      >
        <div className="px-4 py-3">
          <button
            onClick={handleWhatsAppOrder}
            disabled={isStripeLoading || isWhatsAppLoading}
            className="w-full rounded-xl bg-green-500 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            aria-label="Commander via WhatsApp"
            style={{ letterSpacing: "0.3px" }}
          >
            {isWhatsAppLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Ouverture...</span>
              </>
            ) : (
              <>
                <span>📱</span>
                <span>Commander via WhatsApp</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}