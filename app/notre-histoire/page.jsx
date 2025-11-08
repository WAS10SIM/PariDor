"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";

export default function NotreHistoirePage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  return (
    <>
      <div className="min-h-[80vh] bg-[#FAF8F5] pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative py-12 sm:py-20 bg-coal overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#C7A451] rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C7A451] rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-white mb-6">
                Notre <span className="text-[#C7A451]">Histoire</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Plus de 10 ans d'excellence artisanale au service du confort et de l'élégance
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          {/* Story Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            {/* Text Content */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-coal">
                L'artisanat marocain au cœur de notre identité
              </h2>

              <p className="text-base sm:text-lg text-coal/80 leading-relaxed">
                Depuis plus de <span className="font-semibold text-[#C7A451]">dix ans</span>, <strong>Pari Dor</strong> s'impose comme une référence dans l'univers de l'ameublement et de la literie haut de gamme au Maroc. Notre philosophie repose sur un équilibre subtil entre <span className="font-semibold text-[#C7A451]">tradition artisanale</span> et <span className="font-semibold text-[#C7A451]">innovation contemporaine</span>.
              </p>

              <p className="text-base sm:text-lg text-coal/80 leading-relaxed">
                Chaque produit est <span className="font-medium text-[#C7A451]">conçu dans nos ateliers à Agadir</span>, par des artisans passionnés qui maîtrisent l'art du détail. De la mousse haute densité aux tissus nobles, chaque matériau est sélectionné pour sa <span className="font-semibold text-[#C7A451]">durabilité</span> et son <span className="font-semibold text-[#C7A451]">confort exceptionnel</span>.
              </p>

              <p className="text-base sm:text-lg text-coal/80 leading-relaxed">
                Nous façonnons des <span className="font-semibold text-[#C7A451]">matelas</span>, <span className="font-semibold text-[#C7A451]">canapés</span>, <span className="font-semibold text-[#C7A451]">banquettes</span> et <span className="font-semibold text-[#C7A451]">têtes de lit</span> qui allient élégance intemporelle et bien-être au quotidien. Chaque création reflète notre engagement envers la qualité et le raffinement.
              </p>

              <blockquote className="mt-6 pl-6 border-l-4 border-[#C7A451] italic text-coal/70 text-base sm:text-lg">
                "Le vrai luxe réside dans le détail : celui d'une couture invisible, d'un design pensé pour durer."
              </blockquote>
            </motion.div>

            {/* Images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative h-96 sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Atelier artisanal Pari Dor à Agadir - Fabrication de meubles haut de gamme marocains depuis 10+ ans"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-2xl sm:text-3xl font-playfair font-semibold">Artisanat d'excellence</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20"
          >
            {[
              { number: "10+", label: "Années d'expérience", desc: "Un savoir-faire éprouvé" },
              { number: "500+", label: "Clients satisfaits", desc: "Une confiance méritée" },
              { number: "100%", label: "Made in Morocco", desc: "Artisanat local authentique" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-3xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              >
                <p className="text-5xl font-playfair font-bold text-[#C7A451] mb-3">{stat.number}</p>
                <h3 className="text-xl font-semibold text-coal mb-2">{stat.label}</h3>
                <p className="text-coal/60">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-coal mb-6">
              Notre <span className="text-[#C7A451]">Mission</span>
            </h2>
            <p className="text-lg text-coal/80 leading-relaxed mb-6">
              Nous croyons que chaque espace mérite une touche d'<span className="font-semibold text-[#C7A451]">élégance personnalisée</span>, adaptée au style et au confort de chacun.
            </p>
            <p className="text-base text-coal/70 leading-relaxed italic">
              "Créer des pièces qui transforment votre maison en un havre de paix et de raffinement"
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

