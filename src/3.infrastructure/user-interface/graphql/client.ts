import {
  ApolloClient,
  createHttpLink,
  HttpOptions,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { AUTH_TOKEN } from "../AuthContext";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
});

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.forEach(({ message, locations, path }) =>
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
//       ),
//     );

//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  const options: HttpOptions = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: { ...headers, authorization: token ? `Bearer ${token}` : "" },
  };

  return options;
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
