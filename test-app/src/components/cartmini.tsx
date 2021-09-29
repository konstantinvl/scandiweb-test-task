import React from "react";
import { State } from "../interfaces/interfaces";
import { connect } from "react-redux";
import PopupProduct from "./popupProduct";
import { currensySimbol } from "../functions/functions";
import { Link } from "react-router-dom";

class CartPopup extends React.Component<State, { show: Boolean }> {
  constructor(props: State) {
    super(props);
    this.state = { show: false };
  }

  render() {
    const { cart } = this.props;
    return (
      <div className="cart-popup" onClick={(e) => e.stopPropagation()}>
        <div
          className="mini-cart-image"
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/empty-cart.png"
            })`,
          }}
          onClick={(e) => {
            window.addEventListener(
              "click",
              () => {
                if (this.state.show) {
                  this.setState({ show: false });
                }
              },
              { once: true }
            );

            this.setState((prev) => {
              return { show: !prev.show };
            });
          }}
        ></div>
        <div
          className="grey-background"
          style={
            this.state.show
              ? { visibility: "visible" }
              : { visibility: "collapse" }
          }
          onClick={(e) => {
            e.stopPropagation();
            this.setState({ show: false });
          }}
        ></div>
        <div
          className={this.state.show ? "popup show" : "popup"}
          onClick={() => this.forceUpdate()}
        >
          <p style={{ fontWeight: 500 }}>
            <span style={{ fontWeight: 700 }}>My Bag.</span> {cart.length} items
          </p>
          {cart.map((prod) => (
            <PopupProduct product={prod} key={prod.id} />
          ))}
          <div className="popuptotal-price">
            <span>Total:</span>
            <span>
              {currensySimbol(this.props.currency)}
              {cart
                .reduce((previousValue, item) => {
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
          <div className="popup-buttons">
            <Link
              to="/cart"
              onClick={() => {
                this.setState({ show: false });
              }}
            >
              VIEW BAG
            </Link>
            <div className="popup-checkout">CHECK OUT</div>
          </div>
        </div>
        <div
          className="counter"
          style={cart.length > 0 ? {} : { visibility: "hidden" }}
        >
          {cart.length > 0 ? cart.length : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return state;
};

export default connect(mapStateToProps)(CartPopup);
