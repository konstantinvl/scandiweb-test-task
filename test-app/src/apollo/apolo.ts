import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export async function get() {
  return client
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
}
