import React from "react";
import { connect } from "react-redux";
import { currensySimbol } from "../functions/functions";
import { Cart, ProductInt, State } from "../interfaces/interfaces";
import "../styles/productCard.scss";
import { addToCart } from "../redux/actions";

class ProductCard extends React.PureComponent<{
  state: State;
  product: ProductInt;
  addToCart: (product: Cart) => {
    payload: Cart;
    type: string;
  };
}> {
  private product: ProductInt;
  constructor(props: {
    state: State;
    product: ProductInt;
    addToCart: (product: Cart) => {
      payload: Cart;
      type: string;
    };
  }) {
    super(props);
    this.product = this.props.product;
  }

  attrPreSelect(product: ProductInt): Map<string, string> {
    const attrMap = new Map();
    product.attributes?.forEach((attr) => {
      attrMap?.set(attr.name, attr.items[0].value);
    });
    return attrMap;
  }

  render() {
    const { currency } = this.props.state;
    const { addToCart } = this.props;
    return (
      <div
        className="product-card"
        style={this.product.inStock ? {} : { color: "#8D8F9A" }}
      >
        <div
          className="product-image"
          style={{ backgroundImage: `url(${this.product.gallery[0]})` }}
        >
          <div
            className="outOfStock"
            style={
              this.product.inStock
                ? { visibility: "collapse" }
                : { visibility: "visible" }
            }
          >
            Out of stock
          </div>
        </div>
        <div className="product-info">
          <div
            className="product-info_toCart"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/CircleIcon.png"
              })`,
            }}
            onClick={(e) => {
              if (this.product.inStock && !this.product.attributes?.length) {
                e.preventDefault();
                addToCart({
                  id: this.product.id,
                  brand: this.product.brand,
                  name: this.product.name,
                  quantity: 1,
                  img: this.product.gallery[0],
                  category: this.product.category,
                  price: this.product.prices,
                  attributes: this.product.attributes,
                  chosenAttributes: this.attrPreSelect(this.product),
                });
              }
            }}
          ></div>
          <div className="product-info_name">{this.product.name}</div>
          <div className="product-info_price">
            <span>{currensySimbol(currency)}</span>
            {
              this.product.prices.find((price) => price.currency === currency)
                ?.amount
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: { product: ProductInt }) => {
  return { state, ...ownProps };
};

export default connect(mapStateToProps, { addToCart })(ProductCard);
