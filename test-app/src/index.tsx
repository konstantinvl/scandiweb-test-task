import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { cart } from "./redux/cartReducers";
import { currency } from "./redux/currencyReducer";

const store = createStore(combineReducers({ cart, currency }));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
