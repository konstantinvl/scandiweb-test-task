import React from "react";
import { Cart, State } from "../interfaces/interfaces";
import { connect } from "react-redux";
import PopupProduct from "./popupProduct";
import { currensySimbol } from "../functions/functions";
import { Link } from "react-router-dom";
import { once } from "events";

class CartPopup extends React.Component<State, { show: Boolean }> {
  constructor(props: State) {
    super(props);
    this.state = { show: false };
  }

  render() {
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
            this.forceUpdate();
            window.addEventListener(
              "click",
              (event) => {
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
        <div className={this.state.show ? "popup show" : "popup"}>
          <p style={{ fontWeight: 500 }}>
            <span style={{ fontWeight: 700 }}>My Bag.</span>{" "}
            {this.props.cart.length} items
          </p>
          {this.props.cart.map((prod) => (
            <PopupProduct product={prod} key={prod.id} />
          ))}
          <div className="popuptotal-price">
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
          style={this.props.cart.length > 0 ? {} : { visibility: "hidden" }}
        >
          {this.props.cart.length > 0 ? this.props.cart.length : ""}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return state;
};

export default connect(mapStateToProps)(CartPopup);
