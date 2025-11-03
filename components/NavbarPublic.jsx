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
      ? "bg-black/80 backdrop-blur-lg shadow-xl"
      : "bg-transparent"
  }`;

  const textClasses = `transition-colors duration-300 ${
    scrolled || !isHomePage ? "text-white" : "text-white"
  }`;

  // Pas de filtre - le logo est déjà doré
  const logoFilter = "";

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
              style={{ filter: logoFilter }}
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
                >
                  {link.label}
                  <motion.span 
                    className="absolute bottom-0 left-0 h-0.5 bg-[#C7A451]"
                    initial={{ width: isActive ? "100%" : "0%" }}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
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
            >
              Mes commandes
              {pathname === "/mes-commandes" && (
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C7A451]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>

            <Link
              href="/panier"
              className={`${textClasses} relative hover:text-[#C7A451] transition-colors duration-300`}
              aria-label="Panier"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C7A451] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              href="/produits"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C6A34F] to-[#E3C97F] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Catalogue
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden ${textClasses} p-2 rounded-md hover:bg-white/10 transition-colors`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[#FAF8F5] border-t border-[#C6A34F]/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-[#1a1a1a] font-medium hover:text-[#C6A34F] transition-colors py-2 border-b border-[#1a1a1a]/10 last:border-0"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/mes-commandes"
                onClick={() => setIsOpen(false)}
                className="block text-[#1a1a1a] font-medium hover:text-[#C6A34F] transition-colors py-2 border-b border-[#1a1a1a]/10"
              >
                Mes commandes
              </Link>

              <Link
                href="/panier"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between text-[#1a1a1a] font-medium hover:text-[#C6A34F] transition-colors py-2 border-b border-[#1a1a1a]/10"
              >
                <span>Panier</span>
                {totalItems > 0 && (
                  <span className="bg-[#C6A34F] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link
                href="/produits"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-[#C6A34F] to-[#E3C97F] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Catalogue
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default NavbarPublic;
