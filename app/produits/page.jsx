"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import products from "../../data/products.json";
import variants from "../../data/productVariants.json";
import { enrichProductsWithVariants } from "../../lib/mergeProducts";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../components/toast/ToastProvider";

export default function ProduitsPage() {
  const { addItem } = useCart();
  const toast = useToast();

  const enriched = useMemo(() => enrichProductsWithVariants(products, variants), []);
  const [selectedBySlug, setSelectedBySlug] = useState({});
  const [addedProducts, setAddedProducts] = useState({});

  const getSelectedVariant = (p) => {
    const key = p.slug || p.id;
    const fromState = selectedBySlug[key];
    if (fromState) return fromState;
    return p.variants?.[0] || null;
  };

  const handleAddToCart = (product) => {
    const variant = getSelectedVariant(product);
    const finalPrice = variant?.price ?? product.basePrice ?? product.price;
    const item = {
      id: product.id || product.slug,
      name: product.title,
      price: finalPrice,
      image: variant?.image || product.image,
      quantity: 1,
      options: variant ? { color: variant.name, colorKey: variant.key } : {}
    };
    
    addItem(item);
    const productKey = product.id || product.slug;
    setAddedProducts(prev => ({ ...prev, [productKey]: true }));
    setTimeout(() => {
      setAddedProducts(prev => ({ ...prev, [productKey]: false }));
    }, 1000);
    toast.cart(`${product.title} ajouté au panier !`);
  };

  if (!enriched || enriched.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Chargement...
      </div>
    );
  }

  return (
    <main className="min-h-[80vh] bg-beige py-12 pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-5xl font-light text-coal md:text-6xl"
        >
          Nos Créations
        </motion.h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {enriched.map((product, index) => {
            const variant = getSelectedVariant(product);
            const displayImage = variant?.image || product.image;
            const displayPrice = variant?.price ?? product.basePrice ?? product.price;
            return (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.03, 
                y: -8,
                boxShadow: "0 8px 24px rgba(199, 164, 81, 0.15)",
                transition: { duration: 0.3 }
              }}
              className="rounded-3xl bg-white p-6 shadow-md h-full flex flex-col min-h-[520px] w-full"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-2xl mb-4 shadow-md flex-shrink-0">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={displayImage} 
                    initial={{ opacity: 0, scale: 0.98 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }} 
                    className="absolute inset-0"
                  >
                    <Image
                      src={displayImage}
                      alt={product.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <h3 className="mb-2 text-2xl font-light text-coal">{product.title}</h3>
              <p className="mb-4 text-sm text-coal/60">{product.excerpt || "Confectionné avec soin pour allier élégance et confort incomparable."}</p>

              <motion.div 
                key={`price-${product.id}-${variant?.key || 'default'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="mb-6 flex items-center justify-between"
              >
                <span className="text-2xl font-bold text-[#C7A451]">{displayPrice.toLocaleString("fr-MA")} MAD</span>
              </motion.div>

              {product.variants && (
                <div className="mb-5 flex flex-wrap gap-2">
                  {product.variants.map((c) => (
                    <motion.button
                      key={c.key}
                      onClick={() => setSelectedBySlug((s) => ({ ...s, [product.slug || product.id]: c }))}
                      aria-label={c.name}
                      title={c.name}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        scale: (variant?.key || '') === c.key ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className={`h-8 w-8 rounded-full border-2 transition-all ${
                        (variant?.key || '') === c.key ? 'border-gold ring-2 ring-gold/30' : 'border-white'
                      }`}
                      style={{ backgroundColor: c.code }}
                    />
                  ))}
                </div>
              )}

              <div className="mt-auto flex gap-3 pt-4">
                <Link
                  href={`/products/${product.slug}`}
                  className="btn-luxury-outline flex-1 inline-flex items-center justify-center"
                >
                  Découvrir
                </Link>
                <motion.button
                  onClick={() => handleAddToCart(product)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-luxury flex-1"
                >
                  {addedProducts[product.id || product.slug] ? (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Ajouté</span>
                    </motion.span>
                  ) : (
                    "Ajouter au panier"
                  )}
                </motion.button>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}