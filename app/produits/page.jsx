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
      <main className="min-h-[80vh] bg-[#FAF8F5] py-12 pt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-3xl bg-white p-6 shadow-md h-full flex flex-col min-h-[520px] w-full animate-pulse">
                <div className="relative h-64 w-full bg-gray-200 rounded-2xl mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4" />
                <div className="h-4 bg-gray-200 rounded mb-4 w-full" />
                <div className="h-8 bg-gray-200 rounded mb-4 w-1/2" />
                <div className="flex gap-2 mb-4">
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                </div>
                <div className="mt-auto flex gap-3 pt-4">
                  <div className="h-11 bg-gray-200 rounded-xl flex-1" />
                  <div className="h-11 bg-gray-200 rounded-xl flex-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] bg-[#FAF8F5] py-12 pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-5xl font-light text-coal md:text-6xl"
        >
          Nos Créations
        </motion.h1>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {enriched.map((product, index) => {
            const variant = getSelectedVariant(product);
            const displayImage = variant?.image || product.image;
            const displayPrice = variant?.price ?? product.basePrice ?? product.price;
            return (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="h-full flex"
            >
              <div className="flex flex-col justify-between h-full w-full bg-white rounded-2xl shadow-sm p-5 hover:shadow-lg transition-all duration-200 group">
                {/* Content Section */}
                <div className="flex flex-col gap-2 flex-grow">
                  {/* Image Container - Fixed Height */}
                  <div className="relative w-full h-[280px] overflow-hidden rounded-xl mb-3 flex-shrink-0">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={displayImage} 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }} 
                        className="absolute inset-0"
                      >
                        <Image
                          src={displayImage}
                          alt={`${product.title} - ${product.category} - Pari D'Or - Meubles haut de gamme marocains`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-gradient-to-r from-[#C7A451] to-[#D4B975] px-3 py-1 text-xs font-semibold text-[#111] shadow-md">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Title - Fixed Height */}
                  <h3 className="font-playfair text-lg font-semibold text-coal min-h-[56px] line-clamp-2">
                    {product.title}
                  </h3>
                  
                  {/* Description - Fixed Height */}
                  <p className="text-sm text-gray-500 min-h-[48px] line-clamp-2">
                    {product.excerpt || "Confectionné avec soin pour allier élégance et confort incomparable."}
                  </p>
                  
                  {/* Price */}
                  <div className="text-lg font-semibold text-[#C7A451] mb-2">
                    {displayPrice.toLocaleString("fr-MA")} MAD
                  </div>

                  {/* Color Variants */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {product.variants.map((c) => (
                        <button
                          key={c.key}
                          onClick={() => setSelectedBySlug((s) => ({ ...s, [product.slug || product.id]: c }))}
                          aria-label={c.name}
                          title={c.name}
                          className={`h-8 w-8 rounded-full border-2 transition-all duration-200 ${
                            (variant?.key || '') === c.key 
                              ? 'border-[#C7A451] ring-2 ring-[#C7A451]/30 shadow-md scale-110' 
                              : 'border-gray-200 hover:border-[#C7A451]/50'
                          }`}
                          style={{ backgroundColor: c.code }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions - Fixed at Bottom */}
                <div className="mt-auto flex gap-3 pt-4 border-t border-gray-100">
                  <Link
                    href={`/products/${product.slug}`}
                    prefetch
                    className="btn-luxury-outline flex-1 text-center"
                  >
                    Découvrir
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn-luxury flex-1"
                  >
                    {addedProducts[product.id || product.slug] ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Ajouté</span>
                      </span>
                    ) : (
                      "Ajouter"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}