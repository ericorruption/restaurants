import type { ApolloError } from "@apollo/client";
import {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
  useContext,
} from "react";

import {
  LogInMutationVariables,
  useLogInMutation,
} from "./graphql/generated-types-and-hooks";

export type Token = string | undefined;

interface IAuthContext {
  logIn: (input: { variables: LogInMutationVariables }) => Promise<unknown>;
  logInError?: ApolloError;
  isLoggedIn: boolean;
  logOut: VoidFunction;
}

const AuthContext = createContext<IAuthContext>({
  logIn: () => Promise.resolve(),
  isLoggedIn: false,
  logOut: () => {
    // noop
  },
});

export const AUTH_TOKEN = "AUTH_TOKEN";

// TODO
// https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#jwt_structure
export const AuthProvider: FunctionComponent = (props) => {
  const [token, setToken] = useState<Token>(
    localStorage.getItem(AUTH_TOKEN) ?? undefined
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN);
    }
  }, [token]);

  const [logIn, { data, error, client }] = useLogInMutation();

  useEffect(() => {
    if (data?.login) {
      setToken(data.login.token);
      void client.resetStore();
    }
  }, [client, data?.login]);

  const logOut = () => {
    setToken(undefined);
    void client.resetStore();
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logInError: error,
        isLoggedIn: !!token,
        logOut,
      }}
      {...props}
    />
  );
};

export const useAuth = (): IAuthContext => useContext(AuthContext);
