export const API_WHATSAPP_URL = "https://api.whatsapp.com/send/?";

export const redirectToWhatsapp = (phoneNumber: string, text?: string) => {
  window.open(`${API_WHATSAPP_URL}phone=${phoneNumber}&text=${text}`, "_blank");
};
