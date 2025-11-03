export const COMPANY = {
  name: "Pari Dor",
  address: "BLOC A3 N° 80, Hay Al Qods – Agadir",
  phones: ["06 70 87 37 18", "06 70 87 30 60", "06 65 99 73 97"],
  whatsapp: "06 70 87 30 60", // primary for WA orders
  email: "societeparidor@gmail.com",
  facebook: "https://web.facebook.com/p/PARI-DOR-100077978182757/",
  showroomMapUrl: "https://maps.app.goo.gl/UKmmgeJKeg6ph3qF6"
};

export const WHATSAPP_URL = `https://wa.me/212670873060`;
export const PHONE_URL = (phone: string) => `tel:${phone.replace(/\s/g, '')}`;
export const EMAIL_URL = (email: string) => `mailto:${email}`;










