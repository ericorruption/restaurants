import {
  createContext,
  Dispatch,
  SetStateAction,
  FunctionComponent,
  useEffect,
  useState,
  useContext,
} from "react";

export type Token = string | undefined;

interface IAuthContext {
  token: Token;
  setToken: Dispatch<SetStateAction<Token>>;
  isLoggedIn: boolean;
  // logout: VoidFunction;
}

const AuthContext = createContext<IAuthContext>({
  token: undefined,
  setToken: () => undefined,
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

  // TODO move mutations here? e.g.:
  // const login = () => {} // make a login request
  // const register = () => {} // register the user
  // const logout = () => {} // clear the token in localStorage and the user data
  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn: !!token,
        // logout: () => setToken(undefined),
      }}
      {...props}
    />
  );
};

export const useAuth = (): IAuthContext => useContext(AuthContext);
