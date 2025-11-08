"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import products from "../../data/products.json";
import variants from "../../data/productVariants.json";
import { enrichProductsWithVariants } from "../../lib/mergeProducts";

export default function CreationsPage() {
  const enriched = useMemo(() => enrichProductsWithVariants(products, variants), []);
  const [selectedBySlug, setSelectedBySlug] = useState({});

  const getSelectedVariant = (p) => selectedBySlug[p.slug || p.id] || p.variants?.[0] || null;

  if (!enriched || enriched.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-3xl bg-white p-6 shadow-md h-full flex flex-col min-h-[520px] w-full animate-pulse">
                <div className="relative h-80 w-full bg-gray-200 rounded-2xl mb-4" />
                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4" />
                <div className="h-4 bg-gray-200 rounded mb-4 w-full" />
                <div className="h-8 bg-gray-200 rounded mb-4 w-1/2" />
                <div className="mt-auto pt-4">
                  <div className="h-11 bg-gray-200 rounded-xl w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-coal mb-4">
              Nos <span className="text-[#C7A451]">Créations</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-coal/70 max-w-3xl mx-auto leading-relaxed">
              Découvrez notre portfolio de réalisations sur mesure. Chaque pièce raconte une histoire unique, 
              conçue avec passion et savoir-faire artisanal.
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {enriched.map((product, index) => {
              const variant = getSelectedVariant(product);
              const displayImage = variant?.image || product.image;
              const displayPrice = (variant?.price ?? product.basePrice ?? product.price);
              return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ y: -8 }}
                className="group h-full flex"
              >
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:shadow-[#C7A451]/20 h-full flex flex-col w-full min-h-[520px]">
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden flex-shrink-0">
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
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          priority
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-[#C7A451] px-3 py-1 text-sm font-medium text-coal backdrop-blur-sm">
                        {product.category}
                      </span>
                    </div>

                    {/* Sur-mesure Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-coal">
                        Sur mesure
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <h3 className="mb-2 text-xl sm:text-2xl font-light text-coal min-h-[3rem]">
                      {product.title}
                    </h3>
                    
                    <p className="mb-4 text-sm sm:text-base font-light leading-relaxed text-coal/60 min-h-[3rem] line-clamp-2">
                      {product.excerpt || "Confectionné avec soin pour allier élégance et confort incomparable."}
                    </p>
                    
                    <div className="mb-5 text-lg sm:text-xl font-medium text-[#C7A451]">
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
                              (variant?.key || '') === c.key ? 'border-[#C7A451] ring-2 ring-[#C7A451]/30' : 'border-white'
                            }`}
                            style={{ backgroundColor: c.code }}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* CTA unique : Demander un devis */}
                    <div className="mt-auto pt-4">
                      <Link
                        href="/contact"
                        className="btn-luxury w-full inline-flex items-center justify-center"
                      >
                        Demander un devis
                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <div className="inline-block bg-white rounded-3xl p-8 sm:p-12 shadow-xl max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-coal mb-4">
                Une pièce unique pour votre espace
              </h3>
              <p className="text-coal/70 mb-6 leading-relaxed">
                Nos artisans créent des meubles sur mesure adaptés à vos besoins. 
                Contactez-nous pour discuter de votre projet.
              </p>
              <Link
                href="/contact"
                className="btn-luxury-outline inline-flex items-center"
              >
                Discuter de mon projet
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
