import { lazy, Suspense } from "react";
import type { FunctionComponent } from "react";

import "./App.css";
import { AuthProvider, useAuth } from "./AuthContext";

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
  <AuthProvider>{children}</AuthProvider>
);
