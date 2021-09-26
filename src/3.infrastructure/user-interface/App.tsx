import { lazy, Suspense } from "react";
import type { FunctionComponent } from "react";
import { ApolloProvider } from "@apollo/client";

import "./App.css";
import { AuthProvider, useAuth } from "./AuthContext";
import { client } from "./graphql/client";

const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));
const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));

export const App: FunctionComponent = () => (
  <AppProviders>
    <AppGate />
  </AppProviders>
);

const AppGate: FunctionComponent = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Suspense fallback={<>Loading...</>}>
      {isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
};

const AppProviders: FunctionComponent = ({ children }) => (
  <ApolloProvider client={client}>
    <AuthProvider>{children}</AuthProvider>
  </ApolloProvider>
);
