import { gql } from "@apollo/client";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { client, get } from "./apollo/apolo";
import { Category } from "./components/category";
import { Header } from "./components/header";
import { ProductPage } from "./components/productPage";
import { DataInt } from "./interfaces/interfaces";
import "./styles/App.scss";

class App extends React.Component<{}, DataInt> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
  }

  async start() {
    const aa = await client
      .query({
        query: gql`
          {
            categories {
              name
              products {
                id
                name
                inStock
                gallery
                description
                category
                attributes {
                  id
                  name
                  type
                  items {
                    displayValue
                    value
                    id
                  }
                }
                prices {
                  currency
                  amount
                }
                brand
              }
            }
          }
        `,
      })
      .then((result) => result.data);
    const data: DataInt = await aa;
    return data;
  }
  async componentDidMount() {
    this.setState(await this.start());
  }

  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Header />

          <main
            onClick={() => {
              console.log(this.state);
            }}
          >
            <Switch>
              {this.state
                ? this.state.categories.map((category) => {
                    return category.products.map((product) => {
                      return (
                        <Route
                          path={`/${category.name}/${product.id}`}
                          key={product.id}
                        >
                          <ProductPage product={product} currency="USD" />
                        </Route>
                      );
                    });
                  })
                : ""}
              {this.state
                ? this.state.categories.map((category) => {
                    return (
                      <Route path={"/" + category.name} key={category.name}>
                        <Category
                          category={category}
                          currency="USD"
                          key={category.name}
                        />
                      </Route>
                    );
                  })
                : ""}
            </Switch>
            <Route exact path="/">
              <Redirect to="/tech" />
            </Route>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
