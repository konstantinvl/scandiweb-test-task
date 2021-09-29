import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Categoryint, State } from "../interfaces/interfaces";
import "../styles/category.scss";
import ProductCard from "./productCard";

class Category extends React.PureComponent<{
  category: Categoryint;
  currency: string;
}> {
  private category: Categoryint;
  constructor(props: { category: Categoryint; currency: string }) {
    super(props);
    this.category = this.props.category;
  }
  render() {
    return (
      <div className="category">
        <p className="category_name">{this.category.name.toUpperCase()}</p>
        <div className="category_field">
          {this.category.products.map((product) => {
            return (
              <Link to={`/${product.category}/${product.id}`} key={product.id}>
                <ProductCard product={product} key={product.id} />
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State, ownProps: { category: Categoryint }) => {
  return { currency: state.currency, ...ownProps };
};

export default connect(mapStateToProps)(Category);
