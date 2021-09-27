import type { FunctionComponent } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

import { Header } from "./components/Header";
import { Main } from "./pages/Main";
import { Restaurant } from "./pages/Restaurant";

const AuthenticatedApp: FunctionComponent = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact>
        {/* TODO different for owner */}
        <Main />
      </Route>
      <Route path="/restaurants/:restaurantId">
        <Restaurant />
      </Route>
      <Route path="/login">
        <Redirect to="/" />
      </Route>
    </Switch>
  </Router>
);

export default AuthenticatedApp;
