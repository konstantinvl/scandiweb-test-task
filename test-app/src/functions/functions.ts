export function currensySimbol(currency: string): string {
  switch (currency) {
    case "USD":
      return " $ ";
    case "GBP":
      return " £ ";
    case "RUB":
      return " ₽ ";
    default:
      return "";
  }
}
