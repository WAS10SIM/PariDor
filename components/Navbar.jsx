"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import SmartLink from "./SmartLink";
import HamburgerMenu from "./HamburgerMenu";
import MobileDrawer from "./MobileDrawer";
import { ShoppingCart } from "lucide-react";

const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/notre-histoire", label: "Notre histoire" },
  { href: "/creations", label: "Créations" },
  { href: "/#testimonials", label: "Témoignages" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("#hero");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { mounted, totalItems } = useCart();

  useEffect(() => {
    const ids = LINKS.map(l => l.href.replace("#", ""));
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) setActive(`#${id}`);
      }, { threshold: 0.6 });
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o && o.disconnect());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled 
          ? "bg-[#111]/90 backdrop-blur-sm shadow-md" 
          : "bg-transparent md:bg-transparent bg-[#111]/70 backdrop-blur-sm"
      }`}>
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <nav className="flex items-center justify-between py-3 md:py-4 transition-all duration-300 ease-in-out">
            {/* Logo centré sur mobile, à gauche sur desktop */}
            <Link 
              href="/" 
              prefetch 
              className="relative inline-flex items-center group transition-all duration-300 logo-enter md:order-none order-2"
            >
              <img 
                src="/logo.png" 
                alt="Pari Dor" 
                className={`h-12 md:h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-hover:rotate-1 ${
                  scrolled ? "brightness-0 invert" : ""
                }`}
                style={{ 
                  maxHeight: "60px",
                  filter: scrolled 
                    ? "drop-shadow(0 0 8px rgba(198,163,79,0.4))" 
                    : "drop-shadow(0 0 8px rgba(198,163,79,0.4))"
                }} 
              />
            </Link>

          {/* Liens centrés */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {LINKS.map(({ href, label }) => {
              const isActive = href.startsWith('/#') 
                ? active === href 
                : pathname === href;
              
              return (
                <SmartLink
                  key={href}
                  href={href}
                  className={`relative text-sm font-medium transition-all duration-200 ease-in-out group ${
                    isActive 
                      ? "text-[#C6A34F] font-semibold" 
                      : "text-white hover:text-[#C6A34F]"
                  }`}
                  style={{
                    textDecorationLine: 'none'
                  }}
                >
                  {label}
                  <span 
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#C6A34F] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    style={{ textUnderlineOffset: '6px' }}
                  />
                </SmartLink>
              );
            })}
          </div>

          {/* Actions à droite */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/mes-commandes" 
              className="relative text-sm font-medium text-white transition-all duration-300 group hover:scale-110"
            >
              <span className="relative group-hover:text-[#C6A34F]">
                Mes commandes
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C6A34F] transition-all duration-300 group-hover:w-full" style={{ bottom: '-6px' }} />
              </span>
            </Link>

            <Link href="/panier" className="relative group">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C6A34F] text-[#1a1a1a] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#C6A34F]/50 hover:bg-[#E3C97F] hover:scale-110">
                <ShoppingCart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </div>

              <span
                className={`absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#1a1a1a] text-xs font-bold transition-all duration-300 ${
                  mounted && totalItems > 0 ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
              >
                {mounted ? totalItems : 0}
              </span>
            </Link>

            <Link
              href="/produits"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#C6A34F] to-[#E3C97F] text-[#1a1a1a] font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-md animate-glow"
            >
              Catalogue
            </Link>
          </div>

            {/* Panier mobile (à gauche) */}
            <Link href="/panier" className="md:hidden relative group order-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C6A34F] text-[#1a1a1a] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#C6A34F]/50 hover:scale-110">
                <ShoppingCart className="h-4 w-4" />
              </div>
              <span
                className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#1a1a1a] text-xs font-bold transition-all duration-300 ${
                  mounted && totalItems > 0 ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
              >
                {mounted ? totalItems : 0}
              </span>
            </Link>

            {/* Hamburger menu (à droite) */}
            <div className="md:hidden order-3">
              <HamburgerMenu isOpen={open} onClick={() => setOpen(!open)} />
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={open} onClose={() => setOpen(false)} active={active} />
    </>
  );
}


