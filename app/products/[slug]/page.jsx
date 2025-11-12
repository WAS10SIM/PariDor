"use client";
import { useState, use, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../../context/CartContext";
import { useToast } from "../../../components/toast/ToastProvider";
import products from "../../../data/products.json";
import variants from "../../../data/productVariants.json";
import { enrichProductsWithVariants } from "../../../lib/mergeProducts";
import { notFound } from "next/navigation";

export default function ProductPage({ params }) {
  const { slug } = use(params);
  const enriched = useMemo(() => enrichProductsWithVariants(products, variants), []);
  const product = enriched.find(p => p.slug === slug);
  
  if (!product) {
    notFound();
  }

  const { addItem } = useCart();
  const toast = useToast();
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const displayImage = selectedVariant?.image || product.image;
  const displayPrice = selectedVariant?.price ?? product.basePrice ?? product.price;

  // Calculate total price
  const calculatePrice = () => {
    let total = displayPrice;
    Object.entries(selectedOptions).forEach(([key, value]) => {
      const option = (product.options?.[key] || []).find(opt => opt.value === value);
      if (option) {
        total += option.price || 0;
      }
    });
    return total * quantity;
  };

  const handleAddToCart = () => {
    const selectedPrice = calculatePrice() / quantity;
    
    addItem({
      id: product.id,
      name: product.title,
      image: displayImage,
      price: selectedPrice,
      quantity: quantity,
      options: {
        ...selectedOptions,
        ...(selectedVariant ? { color: selectedVariant.name, colorKey: selectedVariant.key } : {})
      }
    });
    
    // Toast notification au lieu d'alert
    toast.cart(`${product.title} ajouté au panier !`);
  };

  return (
      <div className="min-h-[80vh] bg-[#FAF8F5]">
      {/* Hero Product */}
      <section className="relative h-[60vh] overflow-hidden">
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
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        
        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto max-w-7xl px-6 pb-16">
            <div className="text-white">
              <div className="mb-2 text-sm font-medium text-gold">
                {product.category}
              </div>
              <h1 className="mb-4 text-5xl font-light md:text-6xl">
                {product.title}
              </h1>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-white/90">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Configuration */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative h-96 overflow-hidden rounded-3xl">
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
                    alt={`${product.title || 'Produit'} - ${product.category} - Pari D'Or - Meubles haut de gamme marocains - Agadir`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Product Configuration */}
            <div className="space-y-8">
              {/* Price */}
              <div className="text-3xl font-light text-gold">
                {calculatePrice().toLocaleString("fr-MA")} MAD
              </div>

              {/* Variants couleurs */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <label className="mb-3 block text-lg font-medium text-coal">
                    Couleur
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((v) => (
                      <button
                        key={v.key}
                        onClick={() => setSelectedVariant(v)}
                        className={`h-12 w-12 rounded-full border-2 transition-all duration-200 hover:scale-110 active:scale-95 ${
                          selectedVariant?.key === v.key ? 'border-[#C7A451] ring-2 ring-[#C7A451]/30 scale-110 shadow-md' : 'border-coal/20 hover:border-[#C7A451]/50'
                        }`}
                        style={{ backgroundColor: v.code }}
                        title={v.name}
                        aria-label={v.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Options */}
              {Object.entries(product.options || {}).map(([optionKey, options]) => (
                <div key={optionKey}>
                  <label className="mb-3 block text-lg font-medium text-coal">
                    {optionKey.charAt(0).toUpperCase() + optionKey.slice(1)}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedOptions(prev => ({
                          ...prev,
                          [optionKey]: option.value
                        }))}
                        className={`rounded-xl border-2 p-3 text-left transition-all duration-300 ${
                          selectedOptions[optionKey] === option.value
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-coal/20 bg-white text-coal hover:border-gold/50"
                        }`}
                      >
                        <div className="font-medium">{option.label}</div>
                        {option.price > 0 && (
                          <div className="text-sm text-coal/60">
                            +{option.price.toLocaleString("fr-MA")} MAD
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity */}
              <div>
                <label className="mb-3 block text-lg font-medium text-coal">
                  Quantité
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-coal/20 bg-white text-coal transition-colors hover:border-gold"
                  >
                    -
                  </button>
                  <span className="text-xl font-medium text-coal">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-coal/20 bg-white text-coal transition-colors hover:border-gold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="btn-luxury w-full"
              >
                Ajouter au panier
              </button>

              {/* Back to Catalog */}
              <Link
                href="/produits"
                prefetch
                className="block text-center text-coal/60 transition-colors duration-200 hover:text-[#C7A451]"
              >
                ← Retour au catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
