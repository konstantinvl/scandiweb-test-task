import React from "react";
import { connect } from "react-redux";
import { currensySimbol } from "../functions/functions";
import { State } from "../interfaces/interfaces";
import PopupProduct from "./popupProduct";
import "../styles/cart.scss";

class Cart extends React.PureComponent<State, { show: Boolean }> {
  render() {
    const { cart, currency } = this.props;
    return (
      <div className="cart-cart">
        <div className={"cart showBIG"}>
          <p style={{ fontWeight: 500 }}>
            <span style={{ fontSize: "32px", fontWeight: 700 }}>CART</span>
          </p>
          {cart.map((prod, index) => (
            <PopupProduct product={prod} key={prod.id + index} />
          ))}
          <div className="carttotal-price">
            <span>Total:</span>
            <span>
              {currensySimbol(currency)}
              {cart
                .reduce((previousValue, item, index, array) => {
                  let sum = item.price.find(
                    (price) => price.currency === currency
                  )?.amount;
                  return sum
                    ? previousValue + sum * item.quantity
                    : previousValue;
                }, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="cart-buttons">
            <div className="cart-checkout">CHECK OUT</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return state;
};

export default connect(mapStateToProps)(Cart);
