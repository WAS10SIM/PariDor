"use client";
import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import products from "../../data/products.json";
import variants from "../../data/productVariants.json";
import { enrichProductsWithVariants } from "../../lib/mergeProducts";
import ProductCard from "../../components/ProductCard";
import SkeletonCard from "../../components/SkeletonCard";

// Composant de chargement élégant avec skeleton doré
function CreationsSkeleton() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-12 text-center">
          <div className="h-12 bg-gray-200/50 rounded w-1/3 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200/30 rounded w-2/3 mx-auto animate-pulse" />
        </div>
        {/* Grid skeleton */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CreationsContent() {
  const enriched = useMemo(() => enrichProductsWithVariants(products, variants), []);
  const [selectedBySlug, setSelectedBySlug] = useState({});

  const getSelectedVariant = (p) => selectedBySlug[p.slug || p.id] || p.variants?.[0] || null;

  if (!enriched || enriched.length === 0) {
    return <CreationsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-coal mb-4">
            Nos <span className="text-[#C7A451]">Créations</span>
          </h1>
          <div className="h-1 w-24 bg-[#C7A451] mx-auto mb-4 rounded-full" />
          <p className="text-base sm:text-lg md:text-xl text-coal/70 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre portfolio de réalisations sur mesure. Chaque pièce raconte une histoire unique, 
            conçue avec passion et savoir-faire artisanal.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {enriched.map((product, index) => {
            const variant = getSelectedVariant(product);
            const displayImage = variant?.image || product.image;
            const displayPrice = (variant?.price ?? product.basePrice ?? product.price);
            return (
              <ProductCard
                key={product.id}
                product={product}
                variant={variant}
                displayImage={displayImage}
                displayPrice={displayPrice}
                onVariantChange={(c) => setSelectedBySlug((s) => ({ ...s, [product.slug || product.id]: c }))}
                onAddToCart={() => {}}
                index={index}
                showFullActions={false}
              />
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
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
              prefetch
              className="btn-luxury-outline inline-flex items-center"
            >
              Discuter de mon projet
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreationsPage() {
  return (
    <Suspense fallback={<CreationsSkeleton />}>
      <CreationsContent />
    </Suspense>
  );
}
