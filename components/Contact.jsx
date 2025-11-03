"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageCircle, Mail, Globe } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative bg-coal py-20 md:py-28 overflow-hidden">
      {/* Gradient overlay top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
            Contactez-<span className="text-[#C7A451]">nous</span>
          </h2>
          <div className="h-1 w-24 bg-[#C7A451] mx-auto rounded-full mb-6" />
          <p className="mx-auto max-w-3xl text-base sm:text-lg leading-relaxed text-white/80" style={{ letterSpacing: "0.3px" }}>
            Visitez notre <span className="font-semibold text-[#C7A451]">showroom à Agadir, Maroc</span> pour découvrir nos créations en personne, 
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
              <h3 className="mb-6 text-2xl font-semibold text-[#C7A451]">Nos coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C7A451]/20">
                    <MapPin className="h-6 w-6 text-[#C7A451]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Adresse</h4>
                    <p className="text-white/70">BLOC A3 N° 80, Hay Al Qods – Agadir, Maroc</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C7A451]/20">
                    <Phone className="h-6 w-6 text-[#C7A451]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Téléphones</h4>
                    <div className="space-y-1 text-white/70">
                      <p>06 70 87 37 18</p>
                      <p>06 70 87 30 60</p>
                      <p>06 65 99 73 97</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C7A451]/20">
                    <MessageCircle className="h-6 w-6 text-[#C7A451]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">WhatsApp</h4>
                    <p className="text-white/70">06 70 87 30 60</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C7A451]/20">
                    <Mail className="h-6 w-6 text-[#C7A451]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Email</h4>
                    <p className="text-white/70">societeparidor@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C7A451]/20">
                    <Globe className="h-6 w-6 text-[#C7A451]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Facebook</h4>
                    <a 
                      href="https://web.facebook.com/p/PARI-DOR-100077978182757/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#C7A451] hover:text-[#D4B975] transition-colors"
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
              <h3 className="mb-4 text-2xl font-semibold text-[#C7A451]">Notre showroom</h3>
              <p className="text-white/70 mb-6" style={{ letterSpacing: "0.3px" }}>
                Visitez notre showroom à Agadir pour découvrir nos créations en personne.
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=30.427755,-9.598107"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C7A451] to-[#D4B975] text-[#111] font-semibold rounded-full shadow-md hover:shadow-lg hover:shadow-[#C7A451]/40 transition-all duration-300 hover:scale-105"
                style={{ letterSpacing: "0.3px" }}
              >
                <MapPin className="h-5 w-5" />
                <span>Itinéraire Google Maps</span>
              </a>
            </div>
            
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.123456789!2d-9.598107!3d30.427755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDI1JzM5LjkiTiA5wrAzNSc1My4yIlc!5e0!3m2!1sfr!2sma!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title="Showroom Pari Dor Agadir"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}