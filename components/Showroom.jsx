"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import products from "../data/products.json";
import variants from "../data/productVariants.json";
import { enrichProductsWithVariants } from "../lib/mergeProducts";
import { useCart } from "../context/CartContext";
import { useToast } from "./toast/ToastProvider";
import ProductCard from "./ProductCard";

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
    <section id="creations" className="py-20 md:py-28 bg-[#FAF8F5]" suppressHydrationWarning>
      <div className="mx-auto max-w-7xl px-6 lg:px-8" suppressHydrationWarning>
        {/* Header */}
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="mb-12 sm:mb-16 text-center"
              suppressHydrationWarning
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-coal mb-4">
            Nos <span className="text-[#C7A451]">créations</span>
          </h2>
          <div className="h-1 w-24 bg-[#C7A451] mx-auto rounded-full mb-6" />
          <p className="mx-auto max-w-3xl text-base sm:text-lg leading-relaxed text-coal/70" style={{ letterSpacing: "0.3px" }}>
            Découvrez notre collection exclusive où chaque pièce est conçue avec <span className="font-semibold text-[#C7A451]">passion</span> et <span className="font-semibold text-[#C7A451]">savoir-faire</span>, 
            alliant esthétique contemporaine, artisanat marocain et confort exceptionnel.
          </p>
        </motion.div>

        {/* Products Grid - show only 3 items on homepage */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 items-stretch">
          {enriched.slice(0, 3).map((product, index) => {
            const variant = getSelectedVariant(product);
            const displayImage = variant?.image || product.image;
            const displayPrice = variant?.price ?? product.basePrice ?? product.price;
            return (
              <ProductCard
                key={product.id}
                product={product}
                variant={variant}
                displayImage={displayImage}
                displayPrice={displayPrice}
                onVariantChange={(newVariant) => setSelectedBySlug((s) => ({ ...s, [product.slug || product.id]: newVariant }))}
                onAddToCart={() => handleAddToCart(product)}
                index={index}
                showFullActions={true}
              />
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <Link 
            href="/produits"
            prefetch
            className="btn-luxury inline-flex items-center"
          >
            Voir tout le catalogue
            <span className="ml-2">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Showroom;
