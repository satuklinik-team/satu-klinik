export const API_WHATSAPP_URL = "https://api.whatsapp.com/send/?";

export const getWhatsappUrl = (phoneNumber: string, text?: string): string => {
  return `${API_WHATSAPP_URL}phone=${phoneNumber}&text=${text ?? ""}`;
};
