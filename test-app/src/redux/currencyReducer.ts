import { PayloadAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import { Cart } from "../interfaces/interfaces";
import { CHANGE_CURRENCY } from "./actions";

const initialState: string = "USD";

export const currency = (
  state = initialState,
  action: PayloadAction<string>
): string => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return action.payload;
    default: {
      return state;
    }
  }
};
