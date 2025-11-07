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
      ? "bg-[#F8F4EC]/95 backdrop-blur-lg shadow-md"
      : "bg-transparent"
  }`;

  const textClasses = `transition-colors duration-300 ${
    scrolled || !isHomePage ? "text-[#1A1A1A]" : "text-white"
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
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled || !isHomePage ? 'h-16' : 'h-20'}`}>
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Pari D'Or"
              width={140}
              height={60}
              className="h-14 w-auto object-contain transition-all duration-300"
              style={{ 
                filter: logoFilter,
                maxHeight: "56px"
              }}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href === "/" && pathname === "/") || (link.href.startsWith("/#") && pathname === "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${textClasses} font-medium hover:text-[#C7A451] transition-colors duration-300 relative group`}
                  style={{ letterSpacing: "0.3px" }}
                >
                  {link.label}
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-[#C7A451]"
                    initial={{ width: isActive ? "100%" : "0%" }}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/mes-commandes"
              className={`${textClasses} font-medium hover:text-[#C7A451] transition-colors duration-300 relative group`}
              style={{ letterSpacing: "0.3px" }}
            >
              Mes commandes
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-[#C7A451]"
                initial={{ width: pathname === "/mes-commandes" ? "100%" : "0%" }}
                animate={{ width: pathname === "/mes-commandes" ? "100%" : "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            </Link>

            <motion.div
              animate={totalItems > 0 ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/panier"
                className={`${textClasses} relative hover:text-[#C7A451] transition-colors duration-300`}
                aria-label="Panier"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-[#C7A451] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            <Link
              href="/produits"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C7A451] to-[#D4B975] text-[#111] font-semibold shadow-md hover:shadow-lg hover:shadow-[#C7A451]/40 hover:scale-105 transition-all duration-300"
              style={{ letterSpacing: "0.3px" }}
            >
              Catalogue
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden ${textClasses} p-2 rounded-md hover:bg-white/10 transition-colors`}
            whileTap={{ scale: 0.95 }}
            aria-label="Menu mobile"
          >
            <motion.div
              animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.div>
          </motion.button>
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
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[#F8F4EC]/98 backdrop-blur-xl z-50 lg:hidden shadow-2xl border-l border-[#C7A451]/20 overflow-y-auto"
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
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-[#1A1A1A] font-medium hover:text-[#C7A451] transition-colors py-3 border-b border-[#1A1A1A]/10 text-lg relative group"
                      style={{ letterSpacing: "0.3px" }}
                    >
                      {link.label}
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-[#C7A451]"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <Link
                    href="/mes-commandes"
                    onClick={() => setIsOpen(false)}
                    className="block text-[#1A1A1A] font-medium hover:text-[#C7A451] transition-colors py-3 border-b border-[#1A1A1A]/10 text-lg relative group"
                    style={{ letterSpacing: "0.3px" }}
                  >
                    Mes commandes
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-[#C7A451]"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.1 }}
                >
                  <Link
                    href="/panier"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between text-[#1A1A1A] font-medium hover:text-[#C7A451] transition-colors py-3 border-b border-[#1A1A1A]/10 text-lg relative group"
                    style={{ letterSpacing: "0.3px" }}
                  >
                    <span>Panier</span>
                    {totalItems > 0 && (
                      <span className="bg-[#C7A451] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 bg-[#C7A451]"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 2) * 0.1 }}
                  className="pt-4"
                >
                  <Link
                    href="/produits"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-6 py-4 rounded-full bg-gradient-to-r from-[#C7A451] to-[#D4B975] text-[#111] font-semibold shadow-md hover:shadow-lg hover:shadow-[#C7A451]/40 transition-all duration-300"
                    style={{ letterSpacing: "0.3px" }}
                  >
                    Catalogue
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default NavbarPublic;
