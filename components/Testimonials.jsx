"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Fatima Alami",
    city: "Casablanca",
    text: "Service exceptionnel et qualité remarquable. Mon matelas Royal me procure un sommeil parfait depuis 2 ans. L'attention aux détails et le savoir-faire artisanal sont incomparables.",
    rating: 5
  },
  {
    name: "Ahmed Benali",
    city: "Rabat",
    text: "Le canapé doré transforme complètement mon salon. Un investissement qui en vaut vraiment la peine. La finition et le confort dépassent toutes mes attentes.",
    rating: 5
  },
  {
    name: "Aicha Mansouri",
    city: "Marrakech",
    text: "Meubles haut de gamme et service client impeccable. Je recommande fortement Pari Dor. Chaque pièce raconte une histoire d'excellence et de passion.",
    rating: 5
  },
  {
    name: "Youssef El Mansouri",
    city: "Agadir",
    text: "Visite du showroom impressionnante ! L'équipe est très professionnelle et les produits d'une qualité exceptionnelle. Je recommande vivement.",
    rating: 5
  },
  {
    name: "Khadija Tazi",
    city: "Fès",
    text: "Commande personnalisée parfaite. L'équipe a su comprendre mes besoins et créer exactement ce que je souhaitais. Un service de luxe !",
    rating: 5
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    
    return () => clearInterval(timerRef.current);
  }, [isPaused, currentIndex]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section 
      id="testimonials" 
      className="py-20 md:py-28 bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Témoignages clients"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-coal mb-4">
            Ce que disent nos <span className="text-[#C7A451]">clients</span>
          </h2>
          <div className="h-1 w-24 bg-[#C7A451] mx-auto rounded-full mb-4" />
          <p className="mx-auto max-w-3xl text-base sm:text-lg leading-relaxed text-coal/70 mb-2" style={{ letterSpacing: "0.3px" }}>
            Des centaines de clients satisfaits nous font confiance pour transformer leur intérieur. 
            Découvrez leurs expériences avec <span className="font-semibold text-[#C7A451]">Pari Dor</span>.
          </p>
          <p className="text-sm text-[#C7A451] font-medium mt-2" style={{ letterSpacing: "0.3px" }}>
            +500 clients satisfaits à travers le Maroc
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring", 
            damping: 18, 
            stiffness: 160,
            delay: 0.2
          }}
          className="relative mx-auto max-w-4xl"
          aria-roledescription="carousel"
          aria-live="polite"
        >
          {/* Navigation Arrows */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:block">
            <motion.button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-md hover:bg-white transition-colors border border-[#C7A451]/20"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="h-5 w-5 text-[#C7A451]" />
            </motion.button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:block">
            <motion.button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-md hover:bg-white transition-colors border border-[#C7A451]/20"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="h-5 w-5 text-[#C7A451]" />
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ 
                opacity: 0, 
                x: 50,
                scale: 0.95
              }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: 1
              }}
              exit={{ 
                opacity: 0, 
                x: -50,
                scale: 0.95
              }}
              transition={{ 
                duration: 0.6, 
                ease: "easeInOut" 
              }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[#FAF7F3] p-12 shadow-md"
            >
              {/* Stars */}
              <motion.div 
                className="mb-6 flex justify-center gap-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 18, stiffness: 160 }}
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonials[currentIndex].rating 
                        ? "fill-[#C7A451] text-[#C7A451]" 
                        : "fill-none text-coal/20"
                    }`}
                    strokeWidth={1.5}
                  />
                ))}
              </motion.div>

              {/* Quote */}
              <motion.blockquote 
                className="mb-8 text-xl md:text-2xl font-light italic text-coal leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ letterSpacing: "0.3px" }}
              >
                "{testimonials[currentIndex].text}"
              </motion.blockquote>

              {/* Author */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-lg md:text-xl font-medium text-coal mb-1">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-[#C7A451] font-medium">
                  {testimonials[currentIndex].city}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? "bg-[#C7A451] scale-125 shadow-md" 
                    : "bg-coal/30 hover:bg-coal/50"
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
                tabIndex={0}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Testimonials;

