"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bone">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
          alt="Pari Dor - Notre histoire"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        
        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto max-w-7xl px-6 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 className="mb-4 text-5xl font-light md:text-6xl">
                Notre histoire
              </h1>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-white/90">
                Depuis plus de 10 ans, nous créons des meubles d'exception qui allient 
                tradition marocaine et design contemporain.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-3xl font-light text-coal">Notre mission</h2>
              <p className="text-lg font-light leading-relaxed text-coal/80">
                Chez Pari Dor, nous croyons que chaque espace mérite d'être transformé en un havre de confort et d'élégance. 
                Notre mission est de créer des meubles d'exception qui allient savoir-faire artisanal marocain et design contemporain.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-3xl font-light text-coal">Notre savoir-faire</h2>
              <p className="text-lg font-light leading-relaxed text-coal/80">
                Chaque pièce est conçue avec passion par nos artisans expérimentés. Nous utilisons uniquement des matériaux 
                de première qualité et des techniques traditionnelles transmises de génération en génération.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-3xl font-light text-coal">Notre engagement</h2>
              <p className="text-lg font-light leading-relaxed text-coal/80">
                100% fabriqué au Maroc, nous nous engageons à soutenir l'artisanat local et à offrir des emplois 
                de qualité dans notre région. Chaque achat contribue à préserver notre patrimoine artisanal.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}








