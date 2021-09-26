import {
  ApolloClient,
  createHttpLink,
  HttpOptions,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { AUTH_TOKEN } from "../AuthContext";

const httpLink = createHttpLink({
  // TODO change for production deployment
  uri: "http://localhost:4000",
});

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
