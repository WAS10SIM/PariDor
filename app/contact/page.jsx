"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { COMPANY, PHONE_URL, EMAIL_URL, WHATSAPP_URL } from "../../data/company";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Merci, votre message a été envoyé !");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-bone">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-coal via-coal/95 to-coal/90">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20" />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white"
        >
          <h1 className="mb-6 text-5xl font-light md:text-6xl">
            Contactez-nous
          </h1>
          <p className="max-w-2xl text-lg font-light leading-relaxed text-white/80">
            Découvrez l'excellence de l'ameublement marocain dans notre showroom à Agadir.
          </p>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-12 lg:grid-cols-2"
          >
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="rounded-3xl bg-white p-8 shadow-xl">
                <h2 className="mb-6 text-3xl font-light text-coal">Nos coordonnées</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                      📍
                    </div>
                    <div>
                      <h3 className="font-medium text-coal">Adresse</h3>
                      <p className="text-coal/70">{COMPANY.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                      📞
                    </div>
                    <div>
                      <h3 className="font-medium text-coal">Téléphones</h3>
                      <div className="space-y-1 text-coal/70">
                        {COMPANY.phones.map((phone, index) => (
                          <a
                            key={index}
                            href={PHONE_URL(phone)}
                            className="block hover:text-gold transition-colors"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                      💬
                    </div>
                    <div>
                      <h3 className="font-medium text-coal">WhatsApp</h3>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-coal/70 hover:text-gold transition-colors"
                      >
                        {COMPANY.whatsapp}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                      ✉️
                    </div>
                    <div>
                      <h3 className="font-medium text-coal">Email</h3>
                      <a
                        href={EMAIL_URL(COMPANY.email)}
                        className="text-coal/70 hover:text-gold transition-colors"
                      >
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
                      🌐
                    </div>
                    <div>
                      <h3 className="font-medium text-coal">Facebook</h3>
                      <a
                        href={COMPANY.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-coal/70 hover:text-gold transition-colors"
                      >
                        Pari Dor Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="rounded-3xl bg-white p-8 shadow-xl">
                <h2 className="mb-6 text-3xl font-light text-coal">Envoyez-nous un message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-coal mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-coal/20 px-4 py-3 focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-coal mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-lg border border-coal/20 px-4 py-3 focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-coal mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-coal/20 px-4 py-3 focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-coal mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full rounded-lg border border-coal/20 px-4 py-3 focus:border-gold focus:ring-1 focus:ring-gold transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-gradient-to-r from-gold to-lightGold px-8 py-4 font-medium text-coal shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>

          {/* Showroom Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h2 className="mb-4 text-3xl font-light text-coal">Notre showroom</h2>
              <p className="text-coal/70">
                Visitez notre showroom pour découvrir nos créations en personne.
              </p>
            </div>
            
            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.123456789!2d-9.598107!3d30.427755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDI1JzM5LjkiTiA5wrAzNSc1My4yIlc!5e0!3m2!1sfr!2sma!4v1234567890"
                width="100%"
                height="520"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full min-h-[360px] md:min-h-[520px]"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}