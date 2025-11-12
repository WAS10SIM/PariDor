"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function ProductCard({
  product,
  variant,
  displayImage,
  displayPrice,
  onVariantChange,
  onAddToCart,
  isAdded = false,
  index = 0,
  showFullActions = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="h-full flex"
      suppressHydrationWarning
    >
      <div className="flex flex-col justify-between h-full w-full bg-white rounded-2xl shadow-sm p-5 hover:shadow-[0_0_15px_rgba(199,164,81,0.15)] transition-all duration-300 group" suppressHydrationWarning>
        {/* Content Section */}
        <div className="flex flex-col gap-2 flex-grow">
          {/* Image Container - Fixed Height */}
          <div className="relative w-full h-[280px] overflow-hidden rounded-xl mb-3 flex-shrink-0">
            <AnimatePresence mode="wait">
              <motion.div 
                key={displayImage} 
                initial={{ opacity: 0, scale: 0.98 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeInOut" }} 
                className="absolute inset-0"
              >
                <Image
                  src={displayImage}
                  alt={`${product.title || 'Produit'} - ${product.category} - Pari D'Or - Meubles haut de gamme marocains`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={index < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading={index < 3 ? "eager" : "lazy"}
                  fetchPriority={index < 3 ? "high" : "auto"}
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
          {product.variants && product.variants.length > 0 && onVariantChange && (
            <div className="flex flex-wrap gap-2 mb-3">
              {product.variants.map((c) => (
                <button
                  key={c.key}
                  onClick={() => onVariantChange(c)}
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
          {showFullActions ? (
            <>
              <Link
                href={`/products/${product.slug}`}
                prefetch
                className="btn-luxury-outline flex-1 text-center"
              >
                Découvrir
              </Link>
              <button
                onClick={onAddToCart}
                className="btn-luxury flex-1"
              >
                {isAdded ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Ajouté</span>
                  </span>
                ) : (
                  "Ajouter"
                )}
              </button>
            </>
          ) : (
            <Link
              href="/contact"
              className="btn-luxury w-full text-center"
            >
              Demander un devis
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

