"use client";
import { motion } from "framer-motion";
import { Award, Leaf, Star } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Expertise Artisanale",
    description: "Plus de 10 ans de <strong>savoir-faire</strong> dans la création de meubles d'exception, transmis de génération en génération.",
    color: "from-[#C7A451] to-[#D4B975]",
    keyword: "savoir-faire"
  },
  {
    icon: Star,
    title: "Qualité Premium",
    description: "Sélection rigoureuse des meilleurs <strong>matériaux</strong> : bois nobles, tissus haut de gamme et finitions impeccables.",
    color: "from-[#C7A451] to-[#D4B975]",
    keyword: "matériaux"
  },
  {
    icon: Leaf,
    title: "Innovation & Durabilité",
    description: "Nos créations allient élégance, longévité et respect de l'<strong>environnement</strong> à travers une sélection responsable de matériaux.",
    color: "from-[#C7A451] to-[#D4B975]",
    keyword: "environnement"
  }
];

export default function ChoisirNous() {
  return (
    <section id="choisir-nous" className="py-16 md:py-20 bg-gradient-to-b from-white to-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-[#1a1a1a] mb-4">
            Pourquoi <span className="text-[#C6A34F]">nous choisir</span>
          </h2>
          <div className="h-1 w-20 bg-[#C6A34F] mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-[#1a1a1a]/70 mx-auto max-w-3xl leading-relaxed">
            Découvrez ce qui fait de Pari D'Or votre partenaire privilégié pour des meubles d'exception.
          </p>
        </motion.div>

        {/* Grid des raisons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-[#C7A451]/20 hover:border-[#C7A451]/40 relative overflow-hidden group-hover:shadow-[0_8px_30px_rgba(199,164,81,0.2)]">
                {/* Decorative gold line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C7A451] via-[#D4B975] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${reason.color} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <reason.icon className="w-7 h-7 md:w-8 md:h-8 text-white stroke-[1.5]" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-[#111] mb-3 group-hover:text-[#C7A451] transition-colors duration-300">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] md:text-base text-[#1a1a1a]/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: reason.description }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-[#1a1a1a]/80 mb-6">
            Prêt à transformer votre intérieur ?
          </p>
          <a
            href="/produits"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#C6A34F] to-[#E3C97F] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Découvrir notre catalogue
          </a>
        </motion.div>
      </div>
    </section>
  );
}
