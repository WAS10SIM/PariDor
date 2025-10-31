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
          alt="Luxury furniture showroom"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay - Plus foncé pour meilleur contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/30" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-playfair font-bold text-white mb-3 sm:mb-4 drop-shadow-2xl tracking-tight">
            PARI DOR
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-white/90 font-light drop-shadow-lg tracking-wide">
            L'art du confort sur mesure
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[15px] sm:text-base md:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md px-2"
        >
          Découvrez l'alliance parfaite entre <span className="text-[#C6A34F] font-semibold">design</span>, <span className="text-[#C6A34F] font-semibold">artisanat marocain</span> et <span className="text-[#C6A34F] font-semibold">innovation</span>.
          <br className="hidden sm:block" />
          Chez Pari Dor, chaque création reflète votre style et sublime votre espace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
        >
          <Link
            href="/creations"
            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#C6A34F] to-[#E3C97F] text-[#1a1a1a] font-semibold rounded-full shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_#C6A34F] hover:scale-105"
          >
            <span className="text-sm sm:text-base">Découvrir nos créations</span>
            <motion.span
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>

          <Link
            href="/produits"
            className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/10 hover:border-[#C6A34F] hover:text-white hover:shadow-[0_0_20px_rgba(198,163,79,0.5)] hover:scale-105 backdrop-blur-sm"
          >
            <span className="text-sm sm:text-base">Catalogue sur mesure</span>
          </Link>
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
