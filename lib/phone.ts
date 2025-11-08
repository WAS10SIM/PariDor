export function toWhatsApp(numberFR: string) {
  // Ex: "06 70 87 30 60" -> "https://wa.me/212670873060"
  const digits = numberFR.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? "212" + digits.slice(1) : digits;
  return `https://wa.me/${normalized}`;
}

















