export const CART_KEY = "paridor-cart";
export const CUSTOMER_KEY = "paridor-customer";

export function readCart() {
  if (typeof window === "undefined") return [];
  try { 
    const v = JSON.parse(localStorage.getItem(CART_KEY) || "[]"); 
    return Array.isArray(v) ? v : []; 
  } catch { 
    return []; 
  }
}

export function writeCart(items: any[]) {
  try { 
    localStorage.setItem(CART_KEY, JSON.stringify(items)); 
  } catch {}
}

export function readCustomer() {
  if (typeof window === "undefined") return null;
  try { 
    return JSON.parse(localStorage.getItem(CUSTOMER_KEY) || "null"); 
  } catch { 
    return null; 
  }
}

export function writeCustomer(c: any) {
  try { 
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(c)); 
  } catch {}
}
















