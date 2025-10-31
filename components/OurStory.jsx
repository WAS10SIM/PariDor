"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function OurStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="notre-histoire"
      ref={ref}
      className="relative py-12 sm:py-20 md:py-28 bg-[#FAF8F5] overflow-hidden"
    >
      {/* Décorations subtiles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#C6A34F]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C6A34F]/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center"
        >
          {/* Contenu texte */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
            <motion.div variants={itemVariants}>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-3">
                Notre{" "}
                <span className="text-[#C6A34F]">histoire</span>
              </h2>
              <div className="h-1 w-20 bg-[#C6A34F] rounded-full mt-2" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="font-inter text-[15px] sm:text-base md:text-lg lg:text-xl text-[#1a1a1a]/80 leading-relaxed"
            >
              Depuis plus de <span className="font-semibold text-[#C6A34F]">deux décennies</span>, Pari Dor façonne l'art du confort sur mesure à travers des créations de{" "}
              <span className="font-medium text-[#C6A34F]">matelas</span>,{" "}
              <span className="font-medium text-[#C6A34F]">canapés</span>,{" "}
              <span className="font-medium text-[#C6A34F]">banquettes</span> et{" "}
              <span className="font-medium text-[#C6A34F]">têtes de lit</span> de haute qualité.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-inter text-lg md:text-xl text-[#1a1a1a]/80 leading-relaxed"
            >
              Située au cœur du <span className="font-semibold text-[#C6A34F]">Maroc</span>, notre entreprise combine{" "}
              <span className="font-medium text-[#C6A34F]">tradition artisanale marocaine</span> et{" "}
              <span className="font-medium text-[#C6A34F]">innovation moderne</span> pour offrir des produits uniques alliant élégance, durabilité et bien-être.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-inter text-lg md:text-xl text-[#1a1a1a]/80 leading-relaxed"
            >
              Chaque pièce que nous réalisons est conçue à partir de{" "}
              <span className="font-semibold text-[#C6A34F]">mousses premium</span>,{" "}
              <span className="font-semibold text-[#C6A34F]">tissus haut de gamme</span>, et d'un{" "}
              <span className="font-semibold text-[#C6A34F]">savoir-faire artisanal</span> qui reflète la passion de nos maîtres artisans.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-inter text-lg md:text-xl text-[#1a1a1a]/90 leading-relaxed font-medium italic"
            >
              Nous croyons que chaque espace mérite une touche d'<span className="text-[#C6A34F] font-semibold not-italic">élégance personnalisée</span>, adaptée au style et au confort de chacun.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-4">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C6A34F] to-[#E3C97F] rounded-full shadow-lg">
                <span className="text-[#1a1a1a] font-bold text-2xl">10+</span>
                <span className="text-[#1a1a1a]/80 text-sm font-medium">
                  années d'excellence
                </span>
              </div>
            </motion.div>
          </div>

          {/* Images */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative order-1 lg:order-2"
          >
            <div className="relative grid grid-cols-2 gap-4">
              {/* Image principale */}
              <div className="col-span-2 relative h-80 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Atelier artisanal Pari Dor"
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="font-playfair text-2xl font-semibold">Artisanat d'excellence</p>
                </div>
              </div>

              {/* Images secondaires */}
              <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Matériaux premium"
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Confort sur mesure"
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>

            {/* Badge flottant */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6, type: "spring", bounce: 0.5 }}
              className="absolute -top-6 -right-6 bg-white rounded-full p-6 shadow-2xl border-4 border-[#C6A34F]/20 bounce-in"
            >
              <div className="text-center">
                <p className="text-[#C6A34F] font-playfair text-3xl font-bold">100%</p>
                <p className="text-[#1a1a1a] text-xs font-medium mt-1">Made in<br />Morocco</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

