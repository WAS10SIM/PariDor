"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
    toast.cart(`${product.title} ajouté au panier !`);
  };

  return (
    <main className="min-h-screen bg-beige py-12 pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-5xl font-light text-coal md:text-6xl"
        >
          Nos Créations
        </motion.h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                boxShadow: "0 8px 24px rgba(198, 163, 79, 0.15)",
                transition: { duration: 0.3 }
              }}
              className="rounded-3xl bg-white p-6 shadow-lg"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-2xl mb-4">
                <motion.div key={displayImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="absolute inset-0">
                  <Image
                    src={displayImage}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>

              <h3 className="mb-2 text-2xl font-light text-coal">{product.title}</h3>
              <p className="mb-4 text-sm text-coal/60">{product.excerpt}</p>

              <div className="mb-6 flex items-center justify-between">
                <span className="text-2xl font-bold text-gold">{displayPrice} MAD</span>
              </div>

              {product.variants && (
                <div className="mb-5 flex flex-wrap gap-2">
                  {product.variants.map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setSelectedBySlug((s) => ({ ...s, [product.slug || product.id]: c }))}
                      aria-label={c.name}
                      title={c.name}
                      className={`h-8 w-8 rounded-full border-2 transition-all ${
                        (variant?.key || '') === c.key ? 'border-gold ring-2 ring-gold/30' : 'border-white'
                      }`}
                      style={{ backgroundColor: c.code }}
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                <Link
                  href={`/products/${product.slug}`}
                  className="flex-1 rounded-full border-2 border-gold bg-transparent px-4 py-3 text-center font-medium text-gold transition-all duration-300 hover:bg-gold hover:text-coal"
                >
                  Découvrir
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 rounded-full bg-gradient-to-r from-gold to-lightGold px-4 py-3 font-medium text-coal shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  Ajouter au panier
                </button>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}