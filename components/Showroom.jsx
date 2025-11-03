"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import products from "../data/products.json";
import variants from "../data/productVariants.json";
import { enrichProductsWithVariants } from "../lib/mergeProducts";
import { useCart } from "../context/CartContext";
import { useToast } from "./toast/ToastProvider";

function Showroom() {
  const { addItem } = useCart();
  const toast = useToast();

  const enriched = useMemo(() => enrichProductsWithVariants(products, variants), []);
  const [selectedBySlug, setSelectedBySlug] = useState({});

  const getSelectedVariant = (p) => selectedBySlug[p.slug || p.id] || p.variants?.[0] || null;

  const handleAddToCart = (product) => {
    const variant = getSelectedVariant(product);
    const finalPrice = variant?.price ?? product.basePrice ?? product.price;
    addItem({
      id: product.id,
      name: product.title,
      price: finalPrice,
      image: variant?.image || product.image,
      quantity: 1,
      options: variant ? { color: variant.name, colorKey: variant.key } : {}
    });
    // Toast notification
    toast.cart(`${product.title} ajouté au panier !`);
  };

  return (
    <section id="creations" className="py-20 md:py-28 bg-bone">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-coal mb-4">
            Nos <span className="text-[#C6A34F]">créations</span>
          </h2>
          <div className="h-1 w-24 bg-[#C6A34F] mx-auto rounded-full mb-6" />
          <p className="mx-auto max-w-3xl text-base sm:text-lg leading-relaxed text-coal/70">
            Découvrez notre collection exclusive où chaque pièce est conçue avec <span className="font-semibold text-[#C6A34F]">passion</span> et <span className="font-semibold text-[#C6A34F]">savoir-faire</span>, 
            alliant esthétique contemporaine, artisanat marocain et confort exceptionnel.
          </p>
        </motion.div>

        {/* Products Grid - show only 3 items on homepage */}
        <div className="grid gap-8 lg:grid-cols-3">
          {enriched.slice(0, 3).map((product, index) => {
            const variant = getSelectedVariant(product);
            const displayImage = variant?.image || product.image;
            const displayPrice = variant?.price ?? product.basePrice ?? product.price;
            return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                damping: 18,
                stiffness: 160,
                delay: index * 0.1
              }}
              className="group h-full"
            >
              <motion.div
                layoutId={`product-${product.id}`}
                whileHover={{ 
                  scale: 1.03,
                  y: -8,
                  boxShadow: "0 8px 24px rgba(198, 163, 79, 0.15)",
                  transition: { duration: 0.3 }
                }}
                className="relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 h-full flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden flex-shrink-0">
                  <motion.div 
                    key={displayImage} 
                    initial={{ opacity: 0, scale: 1.05 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }} 
                    className="absolute inset-0"
                  >
                    <Image
                      src={displayImage}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </motion.div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="rounded-full bg-gradient-to-r from-[#C6A34F] to-[#E3C97F] px-3 py-1 text-sm font-semibold text-[#1a1a1a] shadow-md">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="mb-3 text-2xl font-light text-coal min-h-[3rem]">
                    {product.title}
                  </h3>
                  
                  <p className="mb-4 text-base font-light leading-relaxed text-coal/60 min-h-[3rem] line-clamp-2">
                    {product.excerpt || "Confectionné avec soin pour allier élégance et confort incomparable."}
                  </p>
                  
                  <div className="mb-5 text-2xl font-semibold text-[#C6A34F]">
                    À partir de {displayPrice.toLocaleString("fr-MA")} MAD
                  </div>

                  {product.variants && product.variants.length > 0 && (
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
                            (variant?.key || '') === c.key ? 'border-[#C6A34F] ring-2 ring-[#C6A34F]/30' : 'border-white'
                          }`}
                          style={{ backgroundColor: c.code }}
                        />
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-3 mt-auto">
                    <Link
                      href={`/products/${product.slug}`}
                      className="flex-1 inline-flex items-center justify-center rounded-full border-2 border-[#C6A34F] px-4 py-3 font-semibold text-[#C6A34F] transition-all duration-300 hover:bg-[#C6A34F] hover:text-white hover:shadow-md"
                    >
                      Découvrir
                      <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#C6A34F] to-[#E3C97F] text-[#1a1a1a] px-4 py-3 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <Link 
            href="/produits"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#C6A34F] to-[#E3C97F] text-[#1a1a1a] font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:shadow-[#C6A34F]/30"
          >
            Voir tout le catalogue
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Showroom;
