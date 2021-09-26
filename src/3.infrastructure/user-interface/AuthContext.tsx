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
  // logout: VoidFunction;
}

const AuthContext = createContext<IAuthContext>({
  logIn: () => Promise.resolve(),
  isLoggedIn: false,
  // logout: () => {},
});

// export const AUTH_TOKEN = "AUTH_TOKEN";

// https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/#jwt_structure
export const AuthProvider: FunctionComponent = (props) => {
  const [token, setToken] = useState<Token>(); // TODO Cookies.get(AUTH_TOKEN)

  useEffect(() => {
    // if (token) {
    //   Cookies.set(AUTH_TOKEN, token);
    // } else {
    //   Cookies.remove(AUTH_TOKEN);
    // }
  }, [token]);

  // if (weAreStillWaitingToGetTheUserData) {
  //   return <FullPageSpinner />
  // }

  const [logIn, { data, error }] = useLogInMutation();

  useEffect(() => {
    if (data?.login) {
      setToken(data.login.token);
    }
  }, [data?.login]);

  // TODO move mutations here? e.g.:
  // const logout = () => {} // clear the token in localStorage and the user data
  return (
    <AuthContext.Provider
      value={{
        logIn,
        logInError: error,
        isLoggedIn: !!token,
        // logout: () => setToken(undefined),
      }}
      {...props}
    />
  );
};

export const useAuth = (): IAuthContext => useContext(AuthContext);
