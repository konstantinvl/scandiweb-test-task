import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { currensySimbol } from "../functions/functions";
import { State } from "../interfaces/interfaces";
import PopupProduct from "./popupProduct";
import "../styles/cart.scss";

class Cart extends React.Component<State, { show: Boolean }> {
  constructor(props: State) {
    super(props);
    //this.state = { show: false };
  }

  render() {
    return (
      <div className="cart-cart">
        <div className={"cart showBIG"}>
          <p style={{ fontWeight: 500 }}>
            <span style={{ fontSize: "32px", fontWeight: 700 }}>CART</span>
          </p>
          {this.props.cart.map((prod) => (
            <PopupProduct product={prod} key={prod.id} />
          ))}
          <div className="carttotal-price">
            <span>Total:</span>
            <span>
              {currensySimbol(this.props.currency)}
              {this.props.cart
                .reduce((previousValue, item, index, array) => {
                  let sum = item.price.find(
                    (price) => price.currency === this.props.currency
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
