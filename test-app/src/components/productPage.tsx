import React from "react";
import { currensySimbol } from "../functions/functions";
import { Cart, ProductInt, State } from "../interfaces/interfaces";
import "../styles/productPage.scss";
import { connect } from "react-redux";
import { addToCart } from "../redux/actions";
import Parser from "html-react-parser";

class ProductPage extends React.Component<
  {
    product: ProductInt;
    currency: string;
    addToCart: (product: Cart) => {
      payload: Cart;
      type: string;
    };
  },
  { mainImg: JSX.Element; attributes?: Map<string, string> }
> {
  private product: ProductInt;
  private attrMap?: Map<string, string>;

  constructor(props: {
    product: ProductInt;
    currency: string;
    addToCart: (product: Cart) => {
      payload: Cart;
      type: string;
    };
  }) {
    super(props);
    this.state = { mainImg: this.changeMainImg(props.product.gallery[0]) };
    this.product = props.product;
  }

  changeMainImg(img: string) {
    return (
      <div
        className="productPage_section-mainImg"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
    );
  }

  attrPreSelect(product: ProductInt) {
    this.attrMap = new Map();
    product.attributes?.forEach((attr) => {
      this.attrMap?.set(attr.name, attr.items[0].value);
    });
    return this.attrMap;
  }

  attrSelect(attr: string, option: string) {
    this.attrMap?.set(attr, option);
    return this.attrMap;
  }
  setDecription(): HTMLElement {
    const elem = document.createElement("div");
    elem.innerHTML = this.product.description as string;
    return elem;
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      attributes: this.attrPreSelect(this.product),
    });
  }

  render() {
    return (
      <div className="productPage">
        <aside className="productPage_gallery">
          {this.props.product.gallery.map((img, index) => {
            return (
              <div
                className="productPage_gallery-img"
                style={{ backgroundImage: `url(${img})` }}
                key={index}
                onClick={() => {
                  this.setState({
                    ...this.state,
                    mainImg: this.changeMainImg(img),
                  });
                }}
              ></div>
            );
          })}
        </aside>

        <div className="productPage_section">
          {this.state.mainImg}
          <div className="productPage_section-info">
            <p className="info_brand">{this.product.brand}</p>
            <p className="info_name">{this.product.name}</p>
            <div className="info_attributes">
              {this.product.attributes?.map((attr) => {
                return (
                  <div className="attr" key={attr.id}>
                    <p className="info-title">
                      {attr.name?.toUpperCase() + ":"}
                    </p>
                    <div className="attr_options">
                      {attr.items?.map((item) => {
                        return attr.type !== "swatch" ? (
                          <div
                            key={item.id}
                            className={
                              this.state.attributes?.get(attr.name) ===
                              item.value
                                ? "attr_options-Btn active"
                                : "attr_options-Btn"
                            }
                            title={item.displayValue}
                            onClick={() => {
                              this.setState({
                                ...this.state,
                                attributes: this.attrSelect(
                                  attr.name,
                                  item.value
                                ),
                              });
                            }}
                          >
                            {item.displayValue}
                          </div>
                        ) : (
                          <div
                            key={item.id}
                            className={
                              this.state.attributes?.get(attr.name) ===
                              item.value
                                ? "attr_options-Btn active"
                                : "attr_options-Btn"
                            }
                            style={{
                              backgroundColor: `${item.value}`,
                              width: "2.3vw",
                              borderRadius: "50%",
                            }}
                            title={item.displayValue}
                            onClick={() => {
                              this.setState(
                                Object.assign({
                                  ...this.state,
                                  attributes: this.attrSelect(
                                    attr.name,
                                    item.value
                                  ),
                                })
                              );
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="info_price">
              <p className="info-title">PRICE:</p>
              <span style={{ fontSize: "24px", marginTop: "10px" }}>
                {currensySimbol(this.props.currency)}
                {
                  this.product.prices.find(
                    (price) => price.currency === this.props.currency
                  )?.amount
                }
              </span>
            </div>
            <div
              className="info_addToCart"
              onClick={() => {
                if (this.product.inStock) {
                  this.props.addToCart({
                    ...this.product,
                    quantity: 1,
                    img: this.product.gallery[0],
                    price: this.product.prices,
                    chosenAttributes: this.state.attributes
                      ? new Map(
                          Object.entries(
                            Object.fromEntries(this.state.attributes.entries())
                          )
                        )
                      : new Map(),
                  });
                }
                this.forceUpdate();
              }}
            >
              ADD TO CART
            </div>
            <div className="info_info">
              {Parser(this.product.description ? this.product.description : "")}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: { product: ProductInt }) => {
  return { currency: state.currency, ...ownProps };
};

export default connect(mapStateToProps, { addToCart })(ProductPage);
