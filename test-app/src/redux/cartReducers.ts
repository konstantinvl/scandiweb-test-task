import { PayloadAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import { Cart } from "../interfaces/interfaces";
import { ADD, CHANGE_ATTRIBUTES, DECREACE, INCREACE } from "./actions";

const initialState: Cart[] = [];

export const cart = (
  state = initialState,
  action: PayloadAction<
    Cart | string | { id: string; key: string; value: string }
  >
): Cart[] => {
  switch (action.type) {
    case ADD: {
      const { payload } = <PayloadAction<Cart>>action;
      if (state.find((prod) => prod.id === payload.id)) {
        return state.map((prod) => {
          if (prod.id === payload.id) {
            prod.quantity++;
          }
          return prod;
        });
      } else {
        return state.concat(payload);
      }
    }
    case INCREACE: {
      return state.map((prod) => {
        if (prod.id === action.payload) {
          prod.quantity++;
        }
        return prod;
      });
    }
    case DECREACE: {
      return state.map((prod) => {
        if (prod.id === action.payload) {
          prod.quantity - 1 < 0 ? prod.quantity : prod.quantity--;
        }
        return prod;
      });
    }
    case CHANGE_ATTRIBUTES: {
      const { payload } = <
        PayloadAction<{ id: string; key: string; value: string }>
      >action;

      return state.map((prod) => {
        if (prod.id === payload.id) {
          prod.chosenAttributes?.set(payload.key, payload.value);
        }
        return prod;
      });
    }
    default: {
      return state;
    }
  }
};
