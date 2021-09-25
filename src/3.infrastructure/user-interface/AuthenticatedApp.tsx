import type { FunctionComponent } from "react";

import { Header } from "./Header";
import { Router } from "./Router";

const AuthenticatedApp: FunctionComponent = () => (
  <>
    <Header />
    <Router />
  </>
);

export default AuthenticatedApp;
