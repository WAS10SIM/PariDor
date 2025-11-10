"use client";
import { useEffect } from "react";

/**
 * Composant pour nettoyer les attributs ajoutés par les extensions de navigateur
 * qui causent des erreurs d'hydratation React
 */
export default function HydrationFix() {
  useEffect(() => {
    // Nettoyer les attributs ajoutés par les extensions après l'hydratation
    const cleanup = () => {
      const allElements = document.querySelectorAll("*");
      allElements.forEach((el) => {
        Array.from(el.attributes).forEach((attr) => {
          if (
            attr.name.startsWith("bis_") ||
            attr.name.startsWith("__processed_") ||
            attr.name.startsWith("data-new-gr-c-s-")
          ) {
            el.removeAttribute(attr.name);
          }
        });
      });
    };

    // Nettoyer immédiatement et après un court délai pour les extensions qui s'exécutent plus tard
    cleanup();
    const timeoutId = setTimeout(cleanup, 100);
    const timeoutId2 = setTimeout(cleanup, 500);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(timeoutId2);
    };
  }, []);

  return null;
}

