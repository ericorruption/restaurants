import type { FunctionComponent } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Header } from "./Header";
import { LogIn } from "./pages/LogIn";
import { SignUp } from "./pages/SignUp";

const UnauthenticatedApp: FunctionComponent = () => (
  <Router>
    <Header />
    <Switch>
      <Route path={["/", "/login"]} exact>
        <LogIn />
      </Route>
      <Route path="/sign-up">
        <SignUp />
      </Route>
    </Switch>
  </Router>
);

export default UnauthenticatedApp;
