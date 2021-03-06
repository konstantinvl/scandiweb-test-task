import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { currensySimbol } from "../functions/functions";
import { Cart, State } from "../interfaces/interfaces";
import { increace, decreace, changeAttributes } from "../redux/actions";

class PopupProduct extends React.PureComponent<{
  state: State;
  product: Cart;
  increace: (
    id: string,
    chosenAttributes?: Map<string, string> | undefined
  ) => {
    payload: {
      id: string;
      chosenAttributes: Map<string, string> | undefined;
    };
    type: string;
  };
  decreace: (
    id: string,
    chosenAttributes?: Map<string, string> | undefined
  ) => {
    payload: {
      id: string;
      chosenAttributes: Map<string, string> | undefined;
    };
    type: string;
  };
  changeAttributes: (
    id: string,
    key: string,
    value: string,
    chosenAttributes?: Map<string, string> | undefined
  ) => {
    payload: {
      id: string;
      key: string;
      value: string;
      chosenAttributes?: Map<string, string> | undefined;
    };
    type: string;
  };
}> {
  render() {
    const { currency } = this.props.state;
    const { product } = this.props;
    return (
      <div className="popupcart-product">
        <div className="popupinfo">
          <Link
            to={`/${product.category}/${product.id}`}
            className="popupinfo_brand"
          >
            {product.brand}
          </Link>
          <Link
            to={`/${product.category}/${product.id}`}
            className="popupinfo_name"
          >
            {product.name}
          </Link>
          <span className="popupinfo_price">
            {currensySimbol(currency)}
            {product.price.find((price) => price.currency === currency)?.amount}
          </span>
          <div className="popupinfo_attributes">
            {product.attributes?.map((attr) => {
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
                            product.chosenAttributes?.get(attr.name) ===
                            item.value
                              ? "popupattr_options-Btn active"
                              : "popupattr_options-Btn"
                          }
                          title={item.displayValue}
                          onClick={() => {
                            this.props.changeAttributes(
                              this.props.product.id,
                              attr.name,
                              item.value,
                              product.chosenAttributes
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
                              item.value,
                              product.chosenAttributes
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
        <div className="quantity">
          <div
            className="quantity_Btn"
            onClick={() => {
              this.props.increace(product.id, product.chosenAttributes);
              this.forceUpdate();
            }}
          >
            +
          </div>
          <div>{product.quantity}</div>
          <div
            className="quantity_Btn"
            onClick={() => {
              this.props.decreace(product.id, product.chosenAttributes);
              this.forceUpdate();
            }}
          >
            -
          </div>
        </div>
        <div
          className="image"
          style={{ backgroundImage: `url(${product.img})` }}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: { product: Cart }) => {
  return { state, ...ownProps };
};

export default connect(mapStateToProps, {
  increace,
  decreace,
  changeAttributes,
})(PopupProduct);
