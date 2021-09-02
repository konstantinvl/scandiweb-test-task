import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";

// const client = new ApolloClient({
//   uri: "http://localhost:4000/",
//   cache: new InMemoryCache(),
// });
// export async function get() {
//   return await client
//     .query({
//       query: gql`
//         {
//           categories {
//             name
//             products {
//               name
//               description
//               gallery
//             }
//           }
//         }
//       `,
//     })
//     .then((result) => console.log(result));
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
// "@typescript-eslint/eslint-plugin": "^4.30.0",
//     "@typescript-eslint/parser": "^4.30.0",
//     "eslint": "^7.32.0",
//     "eslint-config-airbnb": "^18.2.1",
//     "eslint-plugin-import": "^2.24.2",
//     "eslint-plugin-jsx-a11y": "^6.4.1",
//     "eslint-plugin-react": "^7.25.1",
//     "eslint-plugin-react-hooks": "^4.2.0",
