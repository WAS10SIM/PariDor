"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../components/toast/ToastProvider";
import products from "../../data/products.json";
import variants from "../../data/productVariants.json";
import { enrichProductsWithVariants } from "../../lib/mergeProducts";
import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react";

const ITEMS_PER_PAGE = 9;

const categories = ["Tous", "Matelas", "Canapés", "Banquettes", "Têtes de lit"];
const priceRanges = [
  { label: "Tous les prix", min: 0, max: Infinity },
  { label: "0 - 2000 MAD", min: 0, max: 2000 },
  { label: "2000 - 5000 MAD", min: 2000, max: 5000 },
  { label: "5000 - 10000 MAD", min: 5000, max: 10000 },
  { label: "10000+ MAD", min: 10000, max: Infinity },
];

export default function CataloguePage() {
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
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Chargement...
      </div>
    );
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

  const handleAddToCart = (product) => {
    const variant = product._variant;
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
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
    <>
      <div className="min-h-[80vh] bg-beige pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-coal mb-4">
              Notre <span className="text-[#C7A451]">Catalogue</span>
            </h1>
            <p className="text-lg md:text-xl text-coal/70 max-w-3xl mx-auto">
              Explorez notre collection complète de meubles d'exception. Filtrez par catégorie et prix pour trouver la pièce parfaite.
            </p>
          </motion.div>

          {/* Filtres mobiles - bouton toggle */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden mb-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-white rounded-full shadow-md text-coal font-medium hover:bg-[#C7A451]/10 transition-colors"
          >
            {showFilters ? <X className="h-5 w-5" /> : <Filter className="h-5 w-5" />}
            {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          </motion.button>

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-coal/70 text-lg">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} trouvé{filteredProducts.length > 1 ? "s" : ""}
            </p>
          </motion.div>

          {/* Grille de produits */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12 items-stretch">
            <AnimatePresence mode="wait">
              {paginatedProducts.map((product, index) => {
                const variant = getSelectedVariant(product);
                const displayImage = variant?.image || product.image;
                const displayPrice = (variant?.price ?? product.basePrice ?? product.price);
                return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -8 }}
                  className="group h-full flex"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-500 hover:shadow-xl hover:shadow-[#C7A451]/20 h-full flex flex-col w-full min-h-[520px]">
                    {/* Image */}
                    <div className="relative h-80 overflow-hidden">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      
                      {/* Badge catégorie */}
                      <div className="absolute top-4 left-4">
                        <span className="rounded-full bg-[#C7A451] px-3 py-1 text-sm font-medium text-coal">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="mb-2 text-2xl font-light text-coal min-h-[3rem]">
                        {product.title}
                      </h3>
                      
                      <p className="mb-4 text-base font-light leading-relaxed text-coal/60 min-h-[3rem] line-clamp-2">
                        {product.excerpt || "Confectionné avec soin pour allier élégance et confort incomparable."}
                      </p>
                      
                      <div className="mb-4 text-2xl font-medium text-[#C7A451]">
                        {displayPrice.toLocaleString("fr-MA")} MAD
                      </div>

                      {product.variants && (
                        <div className="mb-6 flex flex-wrap gap-2">
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
                      
                      <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-4">
                        <Link
                          href={`/products/${product.slug}`}
                          className="btn-luxury-outline flex-1 inline-flex items-center justify-center"
                        >
                          Découvrir
                        </Link>
                        <button
                          onClick={() => handleAddToCart({
                            ...product,
                            price: displayPrice,
                            image: displayImage,
                            _variant: variant,
                          })}
                          className="btn-luxury flex-1"
                        >
                          Ajouter au panier
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center items-center gap-4"
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-coal font-medium transition-all duration-300 hover:bg-[#C7A451] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                <ChevronLeft className="h-5 w-5" />
                Précédent
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-12 w-12 rounded-full font-medium transition-all duration-300 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-[#C7A451] to-[#D4B975] text-coal shadow-lg"
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
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-coal font-medium transition-all duration-300 hover:bg-[#C7A451] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                Suivant
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

