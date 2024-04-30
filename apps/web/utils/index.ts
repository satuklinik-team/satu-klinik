export const API_WHATSAPP_URL = "https://api.whatsapp.com/send/?";

export const redirectToWhatsapp = (phoneNumber: string, text?: string) => {
  window.open(`${API_WHATSAPP_URL}phone=${phoneNumber}&text=${text}`, "_blank");
};

export const getWhatsappUrl = (phoneNumber: string, text?: string): string => {
  return `${API_WHATSAPP_URL}phone=${phoneNumber}&text=${text}`;
};
