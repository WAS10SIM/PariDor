"use client";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/logo.png"
              alt="Pari D'Or"
              width={160}
              height={70}
              className="h-16 w-auto object-contain mb-4"
            />
            <p className="text-sm text-gray-400 text-center md:text-left max-w-xs">
              Créations artisanales marocaines de luxe. Élégance,
 confort et qualité depuis plus de 10 ans.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-[#C6A34F] mb-4">
              Liens Rapides
            </h3>
            <nav className="flex flex-col space-y-2 text-center md:text-left">
              <Link
                href="/"
                className="text-gray-400 hover:text-[#C6A34F] transition-colors duration-300"
              >
                Accueil
              </Link>
              <Link
                href="/creations"
                className="text-gray-400 hover:text-[#C6A34F] transition-colors duration-300"
              >
                Nos Créations
              </Link>
              <Link
                href="/notre-histoire"
                className="text-gray-400 hover:text-[#C6A34F] transition-colors duration-300"
              >
                Notre Histoire
              </Link>
              <Link
                href="/choisir-nous"
                className="text-gray-400 hover:text-[#C6A34F] transition-colors duration-300"
              >
                Pourquoi Nous Choisir
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-[#C6A34F] transition-colors duration-300"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold text-[#C6A34F] mb-4">
              Contactez-nous
            </h3>
            <div className="space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
                <MapPin className="h-5 w-5 text-[#C6A34F]" />
                <span className="text-sm">Casablanca, Maroc</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
                <Phone className="h-5 w-5 text-[#C6A34F]" />
                <span className="text-sm">+212 6 00 00 00 00</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
                <Mail className="h-5 w-5 text-[#C6A34F]" />
                <span className="text-sm">contact@paridor.ma</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center md:justify-start space-x-4 pt-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#C6A34F] transition-colors duration-300"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#C6A34F] transition-colors duration-300"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="https://wa.me/212600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#25D366] transition-colors duration-300"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {currentYear} <span className="text-[#C6A34F]">Pari D'Or</span>. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <Link href="/mentions-legales" className="hover:text-[#C6A34F] transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="hover:text-[#C6A34F] transition-colors">
                Confidentialité
              </Link>
              <Link href="/cgv" className="hover:text-[#C6A34F] transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
