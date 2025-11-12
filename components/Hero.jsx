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
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2016&q=80"
          alt="Showroom de meubles haut de gamme Pari Dor - Canapés, matelas et mobilier de luxe marocain - Agadir, Maroc"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={85}
        />
        {/* Gradient Overlay - Plus foncé pour meilleur contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto flex flex-col justify-center min-h-screen" suppressHydrationWarning>
        {/* Dark overlay behind text for better readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-transparent blur-2xl -z-10" suppressHydrationWarning />
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-playfair font-bold text-white mb-3 sm:mb-4 drop-shadow-2xl tracking-tight"
          style={{ letterSpacing: "0.3px" }}
        >
          PARI DOR
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-sm sm:text-base md:text-lg lg:text-2xl text-white/90 font-light drop-shadow-lg tracking-wide mb-6 sm:mb-8"
          style={{ letterSpacing: "0.3px" }}
        >
          L'art du confort sur mesure
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md px-2"
        >
          Découvrez l'alliance parfaite entre <span className="text-[#C7A451] font-semibold">design</span>, <span className="text-[#C7A451] font-semibold">artisanat marocain</span> et <span className="text-[#C7A451] font-semibold">innovation</span>.
          <br className="hidden sm:block" />
          Chez Pari Dor, chaque création reflète votre style et sublime votre espace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4"
        >
          <Link
            href="/creations"
            prefetch
            className="btn-luxury inline-flex items-center w-full sm:w-auto"
          >
            Découvrir nos créations
            <span className="ml-2">→</span>
          </Link>

          <Link
            href="/produits"
            prefetch
            className="group relative inline-flex items-center justify-center w-full sm:w-auto h-12 px-8 border-2 border-white/90 text-white font-semibold rounded-2xl transition-all duration-200 hover:bg-white/10 hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] backdrop-blur-sm text-sm sm:text-base"
            style={{ letterSpacing: "0.3px" }}
          >
            Catalogue sur mesure
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator - Simplified */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
