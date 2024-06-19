export const API_WHATSAPP_URL = "https://api.whatsapp.com/send/?";

export const DEFAULT_MEDICINE_URL = "/medicine-placeholder.jpeg";

export const getWhatsappUrl = (phoneNumber?: string, text?: string): string => {
  return `${API_WHATSAPP_URL}phone=${phoneNumber}&text=${text ?? ""}`;
};

export const getInitial = (string?: string): string => {
  if (!string) return "";

  const arrayOfWords = string.split(" ");

  if (arrayOfWords.length === 1 || arrayOfWords[1].length === 0) {
    return arrayOfWords[0].slice(0, 2);
  }

  const firstLetter = arrayOfWords[0][0].toUpperCase();
  const secondLetter = arrayOfWords[1][0].toUpperCase();

  return firstLetter + secondLetter;
};

export const formalizeWord = (string?: string): string => {
  if (!string) return "";

  return string[0].toUpperCase() + string.slice(1, string.length).toLowerCase();
};

export const phoneNumberRegex =
  /^([+]?[\\s0-9]+)?(\\d{3}|[(]?[0-9]+[)])?([-]?[\\s]?[0-9])+$/;

export const numbericRegex = /^[0-9\\s]+$/;
