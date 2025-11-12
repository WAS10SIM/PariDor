/**
 * Script pour charger Stripe uniquement après TTI (Time to Interactive)
 * Évite de bloquer le rendu initial
 */

export function loadStripeScript() {
  // Vérifier si Stripe est déjà chargé
  if (typeof window !== 'undefined' && window.Stripe) {
    return Promise.resolve(window.Stripe);
  }

  return new Promise((resolve, reject) => {
    // Attendre que la page soit interactive
    if (document.readyState === 'complete') {
      loadStripe();
    } else {
      window.addEventListener('load', loadStripe);
    }

    function loadStripe() {
      // Charger Stripe.js de manière asynchrone
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.Stripe) {
          resolve(window.Stripe);
        } else {
          reject(new Error('Stripe failed to load'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load Stripe script'));
      document.head.appendChild(script);
    }
  });
}

