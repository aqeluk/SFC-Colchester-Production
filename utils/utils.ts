export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const renderPrice = (price: number) => {
  return price > 0 ? `+ £${price.toFixed(2)}` : "";
};

export function capitalizeFirstLetter(str: string | undefined): string {
  if (typeof str !== "string" || str === undefined || str === null) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function normalizeDate(date?: string) {
  const dateAndTime = date?.split("T")[1].split(":");
  return dateAndTime?.[0] + ":" + dateAndTime?.[1];
}

export function sanitizePhoneNumber(phone: string) {
  const phoneTrim = phone.trim();
  if (phoneTrim.startsWith("0")) {
    return "+44" + phoneTrim.substring(1);
  }
  return phoneTrim;
}

export function generateRandomId(length = 5) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
