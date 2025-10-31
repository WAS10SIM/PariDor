const ORDERS_KEY = "paridor-orders";

export function readOrders() {
  if (typeof window === "undefined") return [];
  try { 
    const v = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]"); 
    return Array.isArray(v) ? v : []; 
  } catch { 
    return []; 
  }
}

export function pushOrder(order: any) {
  try {
    const all = readOrders();
    
    // Vérifier si cette commande existe déjà (par ID Stripe)
    const existingOrder = all.find(existingOrder => existingOrder.id === order.id);
    if (existingOrder) {
      console.log('Commande déjà existante, pas de duplication:', order.id);
      return;
    }
    
    all.unshift(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(all.slice(0, 50))); // cap 50
    console.log('Nouvelle commande sauvegardée:', order.id);
  } catch (error) {
    console.error('Erreur sauvegarde commande:', error);
  }
}
