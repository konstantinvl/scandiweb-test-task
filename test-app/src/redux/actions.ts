import { PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../interfaces/interfaces";

export const ADD = "ADD";
export const CHANGE_CURRENCY = "CHANGE_CURRENCY";
export const INCREACE = "INCREACE";
export const DECREACE = "DECREACE";
export const CHANGE_ATTRIBUTES = "CHANGE_ATTRIBUTES";

export function addToCart(product: Cart): PayloadAction<Cart> {
  return {
    type: ADD,
    payload: product,
  };
}

export function changeCurrency(currency: string): PayloadAction<string> {
  return {
    type: CHANGE_CURRENCY,
    payload: currency,
  };
}

export function increace(id: string): PayloadAction<string> {
  return {
    type: INCREACE,
    payload: id,
  };
}

export function decreace(id: string): PayloadAction<string> {
  return {
    type: DECREACE,
    payload: id,
  };
}
export function changeAttributes(
  id: string,
  key: string,
  value: string
): PayloadAction<{ id: string; key: string; value: string }> {
  return {
    type: CHANGE_ATTRIBUTES,
    payload: { id, key, value },
  };
}
