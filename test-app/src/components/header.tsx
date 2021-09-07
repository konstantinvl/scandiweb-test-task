import React from "react";
import "../styles/header.scss";
import { NavLink } from "react-router-dom";
import CartPopup from "./cartmini";
import { Cart, State } from "../interfaces/interfaces";
import { connect } from "react-redux";
import { changeCurrency } from "../redux/actions";

class Header extends React.Component<{
  currency: string;
  changeCurrency: (currency: string) => {
    payload: string;
    type: string;
  };
}> {
  render() {
    return (
      <nav>
        <ul className="navigation">
          <li>
            <NavLink to="/tech">TECH</NavLink>
          </li>
          <li>
            <NavLink to="/clothes">CLOTHES</NavLink>
          </li>
        </ul>
        <NavLink to="/cart" className="cart-page_Btn">
          <div
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL + "/cart-logo.png"
              })`,
            }}
          ></div>
        </NavLink>
        <div className="header-options">
          <select
            name="currency"
            id="currency"
            value={this.props.currency}
            onChange={(e) => {
              this.props.changeCurrency(e.target.value);
            }}
          >
            <option value="USD">$ USD</option>
            <option value="GBP">£ GBP</option>
            <option value="RUB">₽ RUB</option>
          </select>
          <CartPopup />
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: State) => {
  return { currency: state.currency };
};

export default connect(mapStateToProps, { changeCurrency })(Header);
