"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#C7A451]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C7A451]/5 rounded-full blur-3xl" />

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
                <span className="text-[#C7A451]">histoire</span>
              </h2>
              <div className="h-1 w-20 bg-[#C7A451] rounded-full mt-2" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="font-inter text-base sm:text-lg md:text-xl text-[#1a1a1a]/80 leading-relaxed"
            >
              Depuis plus de <span className="font-semibold text-[#C7A451]">10 ans</span>, Pari Dor façonne l'art du confort sur mesure à travers des créations de{" "}
              <span className="font-medium text-[#C7A451]">matelas</span>,{" "}
              <span className="font-medium text-[#C7A451]">canapés</span>,{" "}
              <span className="font-medium text-[#C7A451]">banquettes</span> et{" "}
              <span className="font-medium text-[#C7A451]">têtes de lit</span> de haute qualité, alliant tradition artisanale marocaine et innovation moderne.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="font-inter text-base sm:text-lg md:text-xl text-[#1a1a1a]/90 leading-relaxed font-medium italic"
            >
              <span className="inline-block w-1 h-6 bg-[#C7A451] mr-4 align-middle"></span>
              Nous croyons que chaque espace mérite une touche d'<span className="text-[#C7A451] font-semibold not-italic">élégance personnalisée</span>, adaptée au style et au confort de chacun.
            </motion.p>

            <motion.div variants={itemVariants} className="pt-6">
              <Link
                href="/notre-histoire"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C7A451] to-[#D4B975] text-[#111] font-semibold rounded-full shadow-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(199,164,81,0.5)] hover:scale-105"
              >
                <span>Découvrir notre histoire</span>
                <span>→</span>
              </Link>
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
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Atelier artisanal Pari Dor à Agadir - Fabrication de meubles haut de gamme marocains"
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <p className="font-playfair text-2xl font-semibold">Artisanat d'excellence</p>
                </div>
              </div>

              {/* Images secondaires */}
              <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Matériaux premium pour meubles haut de gamme - Tissus nobles et mousse haute densité"
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              <div className="relative h-48 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Confort sur mesure - Canapés et matelas personnalisés Pari Dor"
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>

            {/* Badge flottant */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6, type: "spring", bounce: 0.5 }}
              className="absolute -top-6 -right-6 bg-white rounded-full p-6 shadow-2xl border-4 border-[#C7A451]/20 bounce-in"
            >
              <div className="text-center">
                <p className="text-[#C7A451] font-playfair text-3xl font-bold">100%</p>
                <p className="text-[#1a1a1a] text-xs font-medium mt-1">Made in<br />Morocco</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

