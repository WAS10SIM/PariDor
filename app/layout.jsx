export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://paridor.vercel.app'),
  title: "Pari Dor — L'art du confort sur mesure au Maroc | Meubles & Literie Haut de Gamme",
  description:
    "Fabricant marocain de meubles et literie haut de gamme : Pari Dor unit élégance et savoir-faire local. Canapés, matelas et mobilier de luxe fabriqués à Agadir, Maroc.",
  keywords: "meubles maroc, canapés sur mesure, matelas premium, banquettes, têtes de lit, ameublement Agadir, mobilier marocain, artisanat maroc, literie haut de gamme",
  authors: [{ name: "Pari Dor" }],
  openGraph: {
    title: "Pari Dor — Meubles & Literie Haut de Gamme",
    description:
      "Canapés, matelas et mobilier de luxe fabriqués au Maroc. Artisanat d'exception depuis 10+ ans.",
    url: "https://paridor.vercel.app",
    type: "website",
    locale: "fr_FR",
    siteName: "Pari Dor",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://paridor.vercel.app'}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Pari Dor - Meubles haut de gamme marocains - Showroom Agadir",
        type: "image/jpeg",
      },
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://paridor.vercel.app'}/logo.png`,
        width: 800,
        height: 400,
        alt: "Pari Dor Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pari Dor — L'art du confort sur mesure",
    description: "Meubles et literie premium conçus à Agadir, Maroc.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://paridor.vercel.app'}/og-image.jpg`],
    creator: "@paridor",
    site: "@paridor",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || 'https://paridor.vercel.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import "./globals.css";
import LayoutClient from "./LayoutClient";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../components/toast/ToastProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Préconnexion DNS pour améliorer le temps de chargement */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Préchargement des routes critiques */}
        <link rel="prefetch" href="/creations" as="document" />
        <link rel="prefetch" href="/produits" as="document" />
        <link rel="prefetch" href="/notre-histoire" as="document" />
        <link rel="prefetch" href="/contact" as="document" />
        <link rel="prefetch" href="/panier" as="document" />
        
        {/* Polices optimisées - chargement non bloquant avec media="print" trick */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" 
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link 
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" 
            rel="stylesheet"
          />
        </noscript>
        
        {/* Manifest et favicon avec animation */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#C7A451" />
        
        {/* Preload de l'image hero pour améliorer LCP */}
        <link 
          rel="preload" 
          as="image" 
          href="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2016&q=80"
          fetchPriority="high"
        />
        {/* Preload du logo pour le loader */}
        <link 
          rel="preload" 
          as="image" 
          href="/logo.png"
          fetchPriority="high"
        />
        
        {/* Scripts d'optimisation */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                
                // Nettoyage des attributs injectés par les extensions
                const cleanup = () => {
                  const allElements = document.querySelectorAll('*');
                  allElements.forEach((el) => {
                    Array.from(el.attributes).forEach((attr) => {
                      if (
                        attr.name.startsWith('bis_') ||
                        attr.name.startsWith('__processed_') ||
                        attr.name.startsWith('data-new-gr-c-s-')
                      ) {
                        el.removeAttribute(attr.name);
                      }
                    });
                  });
                };
                
                // Nettoyer immédiatement
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', cleanup);
                } else {
                  cleanup();
                }
                // Nettoyer aussi après un court délai pour les extensions qui s'exécutent plus tard
                setTimeout(cleanup, 0);
                setTimeout(cleanup, 50);
                
                // Animation favicon pulse (toutes les 8 secondes)
                let favicon = document.querySelector('link[rel="icon"]');
                if (!favicon) {
                  favicon = document.createElement('link');
                  favicon.rel = 'icon';
                  favicon.type = 'image/png';
                  favicon.href = '/favicon.ico';
                  document.head.appendChild(favicon);
                }
                
                let pulseInterval = null;
                let isVisible = true;
                
                const pulseFavicon = () => {
                  if (!isVisible || pulseInterval) return;
                  let scale = 1;
                  let direction = 1;
                  const originalHref = favicon.href;
                  
                  pulseInterval = setInterval(() => {
                    if (!isVisible) return;
                    scale += direction * 0.03;
                    if (scale >= 1.15) direction = -1;
                    if (scale <= 1) {
                      direction = 1;
                      scale = 1;
                      clearInterval(pulseInterval);
                      pulseInterval = null;
                    }
                  }, 30);
                };
                
                // Démarrer après 2 secondes, puis toutes les 8 secondes
                setTimeout(() => {
                  pulseFavicon();
                  setInterval(pulseFavicon, 8000);
                }, 2000);
                
                // Gérer la visibilité de la page
                document.addEventListener('visibilitychange', () => {
                  isVisible = !document.hidden;
                });
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#FAF8F5]" suppressHydrationWarning>
        <ToastProvider>
          <CartProvider>
            <LayoutClient>{children}</LayoutClient>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}


