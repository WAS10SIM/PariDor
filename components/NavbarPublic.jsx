"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { usePathname } from "next/navigation";

function NavbarPublic() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useCart();
  const pathname = usePathname();

  // Détection du scroll avec shrinkage
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Vérifier si on est sur la page d'accueil
  const isHomePage = pathname === "/";

  // Classes dynamiques selon le scroll et la page avec shrinkage
  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
    scrolled || !isHomePage
      ? "bg-[#FAF8F5]/95 backdrop-blur-lg shadow-md"
      : "bg-transparent"
  }`;

  const textClasses = `transition-colors duration-300 ${
    scrolled || !isHomePage ? "text-[#1E1E1E]" : "text-white"
  }`;

  // Logo blanc sur hero, couleur sur fond clair
  const logoFilter = scrolled || !isHomePage ? "" : "brightness(0) invert(1)";

  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/#choisir-nous", label: "Pourquoi nous" },
    { href: "/creations", label: "Créations" },
    { href: "/notre-histoire", label: "Notre histoire" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className={navClasses} suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled || !isHomePage ? 'h-16' : 'h-20'}`} suppressHydrationWarning>
          {/* Logo avec animation hover dorée */}
          <Link href="/" className="flex-shrink-0 group/logo" prefetch>
            <motion.div
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0 0 20px rgba(199, 164, 81, 0.6))"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
            >
              <Image
                src="/logo.png"
                alt="Pari D'Or - Logo - Meubles et literie haut de gamme marocains"
                width={140}
                height={60}
                className="h-14 w-auto object-contain transition-all duration-300 group-hover/logo:brightness-110"
                style={{ 
                  filter: logoFilter,
                  maxHeight: "56px"
                }}
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === "/" && pathname === "/") || (link.href.startsWith("/#") && pathname === "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch
                  className={`${textClasses} font-medium hover:text-[#C7A451] transition-colors duration-200 relative group`}
                  style={{ letterSpacing: "0.3px" }}
                >
                  {link.label}
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-[#C7A451]"
                    initial={{ width: isActive ? "100%" : "0%" }}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/mes-commandes"
              prefetch
              className={`${textClasses} font-medium hover:text-[#C7A451] transition-colors duration-200 relative group`}
              style={{ letterSpacing: "0.3px" }}
            >
              Mes commandes
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-[#C7A451]"
                initial={{ width: pathname === "/mes-commandes" ? "100%" : "0%" }}
                animate={{ width: pathname === "/mes-commandes" ? "100%" : "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              />
            </Link>

            <Link
              href="/panier"
              prefetch
              className={`${textClasses} relative hover:text-[#C7A451] transition-all duration-200 group/cart`}
              aria-label="Panier"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ShoppingCart className="h-6 w-6 transition-all duration-200 group-hover/cart:text-[#C7A451]" />
              </motion.div>
              <AnimatePresence mode="wait">
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 15,
                      duration: 0.3
                    }}
                    className="absolute -top-2 -right-2 bg-[#C7A451] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg"
                  >
                    {totalItems > 9 ? "9+" : totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <Link
              href="/produits"
              prefetch
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C7A451] to-[#D4B975] text-[#111] font-semibold shadow-md hover:shadow-[0_0_15px_rgba(199,164,81,0.3)] hover:scale-105 transition-all duration-200"
              style={{ letterSpacing: "0.3px" }}
            >
              Catalogue
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden ${textClasses} p-2 rounded-md hover:bg-white/10 transition-colors duration-200 active:scale-95`}
            aria-label="Menu mobile"
          >
            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[#FAF8F5]/98 backdrop-blur-xl z-50 lg:hidden shadow-2xl border-l border-[#C7A451]/20 overflow-y-auto"
            >
              <div className="px-6 py-8 space-y-4">
                {/* Close Button */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-black/10 transition-colors"
                    aria-label="Fermer le menu"
                  >
                    <X className="h-6 w-6 text-[#1a1a1a]" />
                  </button>
                </div>

                {/* Navigation Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch
                    onClick={() => setIsOpen(false)}
                    className="block text-[#1A1A1A] font-medium hover:text-[#C7A451] transition-colors duration-200 py-3 border-b border-[#1A1A1A]/10 text-lg relative group"
                    style={{ letterSpacing: "0.3px" }}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-0.5 bg-[#C7A451] w-0 group-hover:w-full transition-all duration-200" />
                  </Link>
                ))}

                <Link
                  href="/mes-commandes"
                  prefetch
                  onClick={() => setIsOpen(false)}
                  className="block text-[#1A1A1A] font-medium hover:text-[#C7A451] transition-colors duration-200 py-3 border-b border-[#1A1A1A]/10 text-lg relative group"
                  style={{ letterSpacing: "0.3px" }}
                >
                  Mes commandes
                  <span className="absolute bottom-0 left-0 h-0.5 bg-[#C7A451] w-0 group-hover:w-full transition-all duration-200" />
                </Link>

                <Link
                  href="/panier"
                  prefetch
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between text-[#1A1A1A] font-medium hover:text-[#C7A451] transition-colors duration-200 py-3 border-b border-[#1A1A1A]/10 text-lg relative group"
                  style={{ letterSpacing: "0.3px" }}
                >
                  <span>Panier</span>
                  {totalItems > 0 && (
                    <span className="bg-[#C7A451] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                  <span className="absolute bottom-0 left-0 h-0.5 bg-[#C7A451] w-0 group-hover:w-full transition-all duration-200" />
                </Link>

                <div className="pt-4">
                  <Link
                    href="/produits"
                    prefetch
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-6 py-4 rounded-full bg-gradient-to-r from-[#C7A451] to-[#D4B975] text-[#111] font-semibold shadow-md hover:shadow-[0_0_15px_rgba(199,164,81,0.3)] hover:scale-105 active:scale-95 transition-all duration-200"
                    style={{ letterSpacing: "0.3px" }}
                  >
                    Catalogue
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default NavbarPublic;
