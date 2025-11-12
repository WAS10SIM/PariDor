"use client";
import { useState, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../components/toast/ToastProvider";
import products from "../../data/products.json";
import variants from "../../data/productVariants.json";
import { enrichProductsWithVariants } from "../../lib/mergeProducts";
import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import SkeletonCard from "../../components/SkeletonCard";

const ITEMS_PER_PAGE = 9;

const categories = ["Tous", "Matelas", "Canapés", "Banquettes", "Têtes de lit"];
const priceRanges = [
  { label: "Tous les prix", min: 0, max: Infinity },
  { label: "0 - 2000 MAD", min: 0, max: 2000 },
  { label: "2000 - 5000 MAD", min: 2000, max: 5000 },
  { label: "5000 - 10000 MAD", min: 5000, max: 10000 },
  { label: "10000+ MAD", min: 10000, max: Infinity },
];

// Composant de chargement élégant avec skeleton doré
function CatalogueSkeleton() {
  return (
    <div className="min-h-[80vh] bg-[#FAF8F5] pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-12 text-center">
          <div className="h-12 bg-gray-200/50 rounded w-1/3 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-gray-200/30 rounded w-2/3 mx-auto animate-pulse" />
        </div>
        {/* Grid skeleton */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CatalogueContent() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  const { addItem } = useCart();
  const toast = useToast();

  const enriched = useMemo(() => enrichProductsWithVariants(products, variants), []);
  const [selectedBySlug, setSelectedBySlug] = useState({});

  const getSelectedVariant = (p) => selectedBySlug[p.slug || p.id] || p.variants?.[0] || null;

  if (!enriched || enriched.length === 0) {
    return <CatalogueSkeleton />;
  }

  // Filtrer les produits
  const filteredProducts = useMemo(() => {
    return enriched.filter((product) => {
      const categoryMatch = selectedCategory === "Tous" || product.category === selectedCategory;
      const price = (getSelectedVariant(product)?.price ?? product.basePrice ?? product.price);
      const priceMatch = price >= selectedPriceRange.min && price <= selectedPriceRange.max;
      return categoryMatch && priceMatch;
    });
  }, [selectedCategory, selectedPriceRange, enriched, selectedBySlug]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddToCart = (product, variant, displayPrice, displayImage) => {
    addItem({
      id: product.id,
      name: product.title,
      price: displayPrice,
      image: displayImage,
      quantity: 1,
      options: variant ? { color: variant.name, colorKey: variant.key } : {}
    });
    toast.cart(`${product.title} ajouté au panier !`);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-[80vh] bg-[#FAF8F5] pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 sm:mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-coal mb-4">
              Notre <span className="text-[#C7A451]">Catalogue</span>
            </h1>
            <div className="h-1 w-24 bg-[#C7A451] mx-auto mb-4 rounded-full" />
            <p className="text-base sm:text-lg md:text-xl text-coal/70 max-w-3xl mx-auto">
              Explorez notre collection complète de meubles d'exception. Filtrez par catégorie et prix pour trouver la pièce parfaite.
            </p>
          </div>

          {/* Filtres mobiles - bouton toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden mb-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-2xl shadow-sm text-coal font-medium hover:bg-[#C7A451]/10 transition-colors duration-200"
          >
            {showFilters ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
            {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          </button>

          {/* Filtres - Desktop always visible, Mobile accordion */}
          <div className="hidden md:block mb-12">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              {/* Catégories */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-coal mb-4">Catégorie</h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-[#C7A451] to-[#D4B975] text-coal shadow-lg"
                          : "bg-bone text-coal/70 hover:bg-coal/10"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prix */}
              <div>
                <h3 className="text-lg font-medium text-coal mb-4">Prix</h3>
                <div className="flex flex-wrap gap-3">
                  {priceRanges.map((range, index) => (
                    <button
                      key={index}
                      onClick={() => handlePriceRangeChange(range)}
                      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                        selectedPriceRange === range
                          ? "bg-gradient-to-r from-[#C7A451] to-[#D4B975] text-coal shadow-lg"
                          : "bg-bone text-coal/70 hover:bg-coal/10"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile filters accordion */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden mb-8 overflow-hidden"
              >
                <div className="bg-white rounded-3xl p-6 shadow-lg space-y-6">
                  {/* Catégories */}
                  <div>
                    <h3 className="text-base font-medium text-coal mb-3">Catégorie</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
                            selectedCategory === category
                              ? "bg-gradient-to-r from-[#C7A451] to-[#D4B975] text-coal shadow-md"
                              : "bg-bone text-coal/70"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Prix */}
                  <div>
                    <h3 className="text-base font-medium text-coal mb-3">Prix</h3>
                    <div className="space-y-2">
                      {priceRanges.map((range, index) => (
                        <button
                          key={index}
                          onClick={() => handlePriceRangeChange(range)}
                          className={`w-full px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 text-left ${
                            selectedPriceRange === range
                              ? "bg-gradient-to-r from-[#C7A451] to-[#D4B975] text-coal shadow-md"
                              : "bg-bone text-coal/70"
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Résultats */}
          <div className="mb-6 sm:mb-8">
            <p className="text-coal/70 text-base sm:text-lg">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé{filteredProducts.length > 1 ? "s" : ""}
            </p>
          </div>

          {/* Grille de produits */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12 items-stretch">
            {paginatedProducts.map((product, index) => {
              const variant = getSelectedVariant(product);
              const displayImage = variant?.image || product.image;
              const displayPrice = (variant?.price ?? product.basePrice ?? product.price);
              return (
                <ProductCard
                  key={`${product.id}-${index}`}
                  product={product}
                  variant={variant}
                  displayImage={displayImage}
                  displayPrice={displayPrice}
                  onVariantChange={(c) => setSelectedBySlug((s) => ({ ...s, [product.slug || product.id]: c }))}
                  onAddToCart={() => handleAddToCart(product, variant, displayPrice, displayImage)}
                  index={index}
                  showFullActions={true}
                />
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl bg-white text-coal font-medium transition-all duration-200 hover:bg-[#C7A451] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm sm:text-base"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                Précédent
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full font-medium transition-all duration-200 text-sm sm:text-base ${
                      currentPage === page
                        ? "bg-gradient-to-r from-[#C7A451] to-[#D4B975] text-coal shadow-md"
                        : "bg-white text-coal hover:bg-coal/10"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl bg-white text-coal font-medium transition-all duration-200 hover:bg-[#C7A451] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-sm text-sm sm:text-base"
              >
                Suivant
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          )}
      </div>
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense fallback={<CatalogueSkeleton />}>
      <CatalogueContent />
    </Suspense>
  );
}

