export function formatMAD(v: number) {
  try { 
    return new Intl.NumberFormat("fr-MA", { 
      style: "currency", 
      currency: "MAD", 
      maximumFractionDigits: 0 
    }).format(v); 
  } catch { 
    return `${v} MAD`; 
  }
}






