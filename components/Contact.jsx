"use client";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="bg-coal py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
            Contactez-<span className="text-[#C6A34F]">nous</span>
          </h2>
          <div className="h-1 w-24 bg-[#C6A34F] mx-auto rounded-full mb-6" />
          <p className="mx-auto max-w-3xl text-base sm:text-lg leading-relaxed text-white/80">
            Visitez notre <span className="font-semibold text-[#C6A34F]">showroom à Agadir</span> pour découvrir nos créations en personne, 
            ou contactez-nous pour un projet sur mesure. Notre équipe est à votre écoute.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 18, stiffness: 160, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="rounded-3xl bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-2xl font-semibold text-[#C6A34F]">Nos coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C6A34F]/20">
                    📍
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Adresse</h4>
                    <p className="text-white/70">BLOC A3 N° 80, Hay Al Qods – Agadir</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C6A34F]/20">
                    📞
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Téléphones</h4>
                    <div className="space-y-1 text-white/70">
                      <p>06 70 87 37 18</p>
                      <p>06 70 87 30 60</p>
                      <p>06 65 99 73 97</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C6A34F]/20">
                    💬
                  </div>
                  <div>
                    <h4 className="font-medium text-white">WhatsApp</h4>
                    <p className="text-white/70">06 70 87 30 60</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C6A34F]/20">
                    ✉️
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Email</h4>
                    <p className="text-white/70">societeparidor@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C6A34F]/20">
                    🌐
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Facebook</h4>
                    <a 
                      href="https://web.facebook.com/p/PARI-DOR-100077978182757/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#C6A34F] hover:text-[#E3C97F] transition-colors"
                    >
                      Pari Dor Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 18, stiffness: 160, delay: 0.4 }}
            className="space-y-6"
          >
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-[#C6A34F]">Notre showroom</h3>
              <p className="text-white/70 mb-6">
                Visitez notre showroom pour découvrir nos créations en personne.
              </p>
            </div>
            
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.123456789!2d-9.598107!3d30.427755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDI1JzM5LjkiTiA5wrAzNSc1My4yIlc!5e0!3m2!1sfr!2sma!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}