import { PayloadAction } from "@reduxjs/toolkit";
import { attributesEqual } from "../functions/functions";
import { Cart, State } from "../interfaces/interfaces";
import {
  ADD,
  CHANGE_ATTRIBUTES,
  CHANGE_CURRENCY,
  DECREACE,
  INCREACE,
} from "./actions";

const initialState: State = {
  cart: [],
  currency: "USD",
};

export const cart = (
  state = initialState,
  action: PayloadAction<
    | Cart
    | string
    | {
        id: string;
        chosenAttributes: undefined | Map<string, string>;
      }
    | {
        id: string;
        key: string;
        value: string;
        chosenAttributes: undefined | Map<string, string>;
      }
  >
): State => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      const { payload } = action as PayloadAction<string>;
      return { ...state, currency: payload };
    case ADD: {
      const { cart } = state;
      const { payload } = action as PayloadAction<Cart>;

      if (
        cart.find(
          (prod) =>
            prod.id === payload.id &&
            attributesEqual(prod.chosenAttributes, payload.chosenAttributes)
        )
      ) {
        return {
          ...state,
          cart: cart.map((prod) => {
            if (
              prod.id === payload.id &&
              attributesEqual(prod.chosenAttributes, payload.chosenAttributes)
            ) {
              prod.quantity++;
            }
            return prod;
          }),
        };
      } else {
        return { ...state, cart: cart.concat(payload) };
      }
    }
    case INCREACE: {
      let { cart } = state;
      const { payload } = action as PayloadAction<{
        id: string;
        chosenAttributes: undefined | Map<string, string>;
      }>;

      let rez = cart.map((prod) => {
        if (
          prod.id === payload.id &&
          attributesEqual(prod.chosenAttributes, payload.chosenAttributes)
        ) {
          prod.quantity++;
        }

        return prod;
      });
      return { ...state, cart: rez };
    }
    case DECREACE: {
      let { cart } = state;
      const { payload } = action as PayloadAction<{
        id: string;
        chosenAttributes: undefined | Map<string, string>;
      }>;
      if (
        cart.find((prod) => {
          if (
            prod.id === payload.id &&
            attributesEqual(prod.chosenAttributes, payload.chosenAttributes) &&
            prod.quantity === 1
          ) {
            return true;
          }
          return false;
        })
      ) {
        cart.splice(
          cart.findIndex(
            (prod) =>
              prod.id === payload.id &&
              attributesEqual(prod.chosenAttributes, payload.chosenAttributes)
          ),
          1
        );

        const rez = Object.assign({}, { ...state, cart: cart });

        return rez;
      }
      return {
        ...state,
        cart: cart.map((prod) => {
          if (
            prod.id === payload.id &&
            attributesEqual(prod.chosenAttributes, payload.chosenAttributes)
          ) {
            prod.quantity--;
          }
          return prod;
        }),
      };
    }
    case CHANGE_ATTRIBUTES: {
      const { cart } = state;
      const { payload } = action as PayloadAction<{
        id: string;
        key: string;
        value: string;
        chosenAttributes: undefined | Map<string, string>;
      }>;
      return {
        ...state,
        cart: cart.map((prod) => {
          if (
            prod.id === payload.id &&
            attributesEqual(prod.chosenAttributes, payload.chosenAttributes)
          ) {
            prod.chosenAttributes?.set(payload.key, payload.value);
          }
          return prod;
        }),
      };
    }
    default: {
      return state;
    }
  }
};
