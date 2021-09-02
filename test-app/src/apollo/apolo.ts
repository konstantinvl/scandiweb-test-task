import React from "react";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { graphql, ChildDataProps } from "@apollo/react-hoc";
import { DataInt } from "../interfaces/interfaces";

// const HERO_QUERY = gql`
//   query Category(name: string) {
//     Category(name: "woman") {
//         name: string,
//         products: [Product]
//     }
//   }
// `;

type Price = {
  currency: string;
  amount: number;
};

type Attribute = {
  displayValue: string;
  value: string;
  id: string;
};

type AttributeSet = {
  id: string;
  name: string;
  type: string;
  items: [Attribute];
};

type Product = {
  id: string;
  name: string;
  inStock: boolean;
  gallery: [string];
  description: string;
  category: string;
  attributes: [AttributeSet];
  prices: [Price];
  brand: string;
};

type Category = {
  name: string;
  products: [Product];
};

// input CategoryInput= {
//     title: string!
// }

// type Query= {
//     categories: [Category],
//     category(input: CategoryInput): Category,
//     product(id: string!): Product,
//     currencies: [string]
// }

//type ChildProps = ChildDataProps<InputProps, Response, Variables>;

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});
export async function get() {
  return await client
    .query({
      query: gql`
        {
          categories {
            name
            products {
              name
              description
              gallery
            }
          }
        }
      `,
    })
    .then((result) => result.data.json());
}
