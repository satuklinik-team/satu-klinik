export const API_WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=628158078550";

export const getWhatsappUrl = (text?: string): string => {
  return `${API_WHATSAPP_URL}&text=${text}`;
};
