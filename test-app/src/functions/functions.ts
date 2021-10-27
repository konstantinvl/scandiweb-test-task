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

export function attributesEqual(
  map1: undefined | Map<string, string>,
  map2: undefined | Map<string, string>
) {
  if (map1 && map2) {
    for (let attrKey of Array.from(map1.keys())) {
      if (map1.get(attrKey) !== map2.get(attrKey)) {
        return false;
      }
    }

    return true;
  }

  return false;
}
