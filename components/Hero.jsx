"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax + Zoom */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2016&q=80"
          alt="Showroom de meubles haut de gamme Pari Dor - Canapés, matelas et mobilier de luxe marocain"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlay - Plus foncé pour meilleur contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto flex flex-col justify-center min-h-screen">
        {/* Dark overlay behind text for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent blur-2xl -z-10" />
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-playfair font-bold text-white mb-3 sm:mb-4 drop-shadow-2xl tracking-tight"
          style={{ letterSpacing: "0.3px" }}
        >
          PARI DOR
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-sm sm:text-base md:text-lg lg:text-2xl text-white/90 font-light drop-shadow-lg tracking-wide mb-6 sm:mb-8"
          style={{ letterSpacing: "0.3px" }}
        >
          L'art du confort sur mesure
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md px-2"
        >
          Découvrez l'alliance parfaite entre <span className="text-[#C7A451] font-semibold">design</span>, <span className="text-[#C7A451] font-semibold">artisanat marocain</span> et <span className="text-[#C7A451] font-semibold">innovation</span>.
          <br className="hidden sm:block" />
          Chez Pari Dor, chaque création reflète votre style et sublime votre espace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/creations"
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#C7A451] to-[#D4B975] text-[#111] font-semibold rounded-full shadow-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(199,164,81,0.5)] text-sm sm:text-base"
              style={{ letterSpacing: "0.3px" }}
            >
              <span>Découvrir nos créations</span>
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/produits"
              className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 border-2 border-white/90 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] backdrop-blur-sm text-sm sm:text-base"
              style={{ letterSpacing: "0.3px" }}
            >
              <span>Catalogue sur mesure</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
