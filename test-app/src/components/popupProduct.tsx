import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { currensySimbol } from "../functions/functions";
import { Cart, State } from "../interfaces/interfaces";
import { increace, decreace, changeAttributes } from "../redux/actions";

class PopupProduct extends React.Component<{
  currency: string;
  product: Cart;
  increace: (id: string) => {
    payload: string;
    type: string;
  };
  decreace: (id: string) => {
    payload: string;
    type: string;
  };
  changeAttributes: (
    id: string,
    key: string,
    value: string
  ) => {
    payload: {
      id: string;
      key: string;
      value: string;
    };
    type: string;
  };
}> {
  constructor(props: {
    currency: string;
    product: Cart;
    increace: (id: string) => {
      payload: string;
      type: string;
    };
    decreace: (id: string) => {
      payload: string;
      type: string;
    };
    changeAttributes: (
      id: string,
      key: string,
      value: string
    ) => {
      payload: {
        id: string;
        key: string;
        value: string;
      };
      type: string;
    };
  }) {
    super(props);
  }

  render() {
    return (
      <div
        className="popupcart-product"
        onMouseEnter={
          () =>
            this.forceUpdate() /*I've done this because quantity did not rerender*/
        }
      >
        <div className="popupinfo">
          <Link
            to={`/${this.props.product.category}/${this.props.product.id}`}
            className="popupinfo_brand"
          >
            {this.props.product.brand}
          </Link>
          <Link
            to={`/${this.props.product.category}/${this.props.product.id}`}
            className="popupinfo_name"
          >
            {this.props.product.name}
          </Link>
          <span className="popupinfo_price">
            {currensySimbol(this.props.currency)}
            {
              this.props.product.price.find(
                (price) => price.currency === this.props.currency
              )?.amount
            }
          </span>
          <div className="popupinfo_attributes">
            {this.props.product.attributes?.map((attr) => {
              return (
                <div className="popupattr" key={attr.id}>
                  <p className="popupinfo-title">
                    {attr.name?.toUpperCase() + ":"}
                  </p>
                  <div className="popupattr_options">
                    {attr.items?.map((item) => {
                      return attr.type !== "swatch" ? (
                        <div
                          key={item.id}
                          className={
                            this.props.product.chosenAttributes?.get(
                              attr.name
                            ) === item.value
                              ? "popupattr_options-Btn active"
                              : "popupattr_options-Btn"
                          }
                          title={item.displayValue}
                          onClick={() => {
                            this.props.changeAttributes(
                              this.props.product.id,
                              attr.name,
                              item.value
                            );
                            this.forceUpdate();
                          }}
                        >
                          {item.displayValue}
                        </div>
                      ) : (
                        <div
                          key={item.id}
                          className={
                            this.props.product.chosenAttributes?.get(
                              attr.name
                            ) === item.value
                              ? "popupattr_options-Btn active"
                              : "popupattr_options-Btn"
                          }
                          style={{
                            backgroundColor: `${item.value}`,
                            borderRadius: "50%",
                          }}
                          title={item.displayValue}
                          onClick={() => {
                            this.props.changeAttributes(
                              this.props.product.id,
                              attr.name,
                              item.value
                            );
                            this.forceUpdate();
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="quantity"
          onClick={() => console.log(this.props.product.quantity)}
        >
          <div
            className="quantity_Btn"
            onClick={() => {
              this.props.increace(this.props.product.id);
              this.forceUpdate();
            }}
          >
            +
          </div>
          <div>{this.props.product.quantity}</div>
          <div
            className="quantity_Btn"
            onClick={() => {
              this.props.decreace(this.props.product.id);
              this.forceUpdate();
            }}
          >
            -
          </div>
        </div>
        <div
          className="image"
          style={{ backgroundImage: `url(${this.props.product.img})` }}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: { product: Cart }) => {
  return { currency: state.currency, ...ownProps };
};

export default connect(mapStateToProps, {
  increace,
  decreace,
  changeAttributes,
})(PopupProduct);
