import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { cart } from "./redux/reducer";

const store = createStore(cart);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
