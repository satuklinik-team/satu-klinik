export const API_WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=628158078550";

export const redirectToWhatsapp = (text?: string) => {
  window.open(`${API_WHATSAPP_URL}&text=${text}`, "_blank");
};
