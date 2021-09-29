import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { get } from "./apollo/apolo";
import Category from "./components/category";
import Header from "./components/header";
import ProductPage from "./components/productPage";
import { DataInt, ProductInt } from "./interfaces/interfaces";
import "./styles/App.scss";
import CartBig from "./components/cart";

class App extends React.Component<{}, DataInt> {
  async start(): Promise<DataInt> {
    const responce: Promise<DataInt> = await get();
    const data: DataInt = await responce;
    return data;
  }
  async componentDidMount(): Promise<void> {
    this.setState(await this.start());
  }

  render(): JSX.Element {
    return (
      <div className="app">
        <BrowserRouter>
          <Header />
          <main>
            <Switch>
              {this.state
                ? this.state.categories.map((category) => {
                    return category.products.map((product) => {
                      return (
                        <Route
                          path={`/${category.name}/${product.id}`}
                          key={product.id}
                        >
                          <ProductPage product={product} />
                        </Route>
                      );
                    });
                  })
                : ""}
              {this.state
                ? this.state.categories.map((category) => {
                    return (
                      <Route path={"/" + category.name} key={category.name}>
                        <Category category={category} key={category.name} />
                      </Route>
                    );
                  })
                : ""}
              <Route path="/all">
                {this.state ? (
                  <Category
                    category={{
                      products: this.state.categories.reduce((init, cat) => {
                        return init.concat(cat.products);
                      }, [] as ProductInt[]),
                      name: "All",
                    }}
                  />
                ) : (
                  ""
                )}
              </Route>
            </Switch>
            <Route exact path="/cart">
              <CartBig />
            </Route>
            <Route exact path="/">
              <Redirect to="/all" />
            </Route>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
