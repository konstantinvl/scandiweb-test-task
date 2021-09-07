export interface DataInt {
  categories: Categoryint[];
}
export interface Categoryint {
  name: string;
  products: ProductInt[];
}
export interface ProductInt {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description?: string;
  category: string;
  attributes?: AttributesSetInt[];
  prices: PriceInt[];
  brand: string;
}
export interface AttributesSetInt {
  id: string;
  name: string;
  type: string;
  items: AttributeInt[];
}
export interface PriceInt {
  currency: string;
  amount: number;
}
export interface AttributeInt {
  displayValue: string;
  value: string;
  id: string;
}
export interface Cart {
  id: string;
  brand: string;
  name: string;
  quantity: number;
  img: string;
  category: string;
  price: PriceInt[];
  attributes?: AttributesSetInt[];
  chosenAttributes?: Map<string, string>;
}
export interface State {
  cart: Cart[];
  currency: string;
}
