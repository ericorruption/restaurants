import { lazy, Suspense } from "react";
import type { FunctionComponent } from "react";

import { useUser } from "./auth";

import "./App.css";

const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));
const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));

export const App: FunctionComponent = () => {
  const user = useUser();

  return (
    <Suspense fallback={<>Loading...</>}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  );
};
