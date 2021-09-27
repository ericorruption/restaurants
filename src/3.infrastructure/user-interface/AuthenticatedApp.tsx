import type { FunctionComponent } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

import { Header } from "./components/Header";
import { Role } from "./graphql/generated-types-and-hooks";
import { Main } from "./pages/Main";
import { OwnerDashboard } from "./pages/OwnerDashboard";
import { Restaurant } from "./pages/Restaurant";
import { UserProvider, useUser } from "./UserContext";

const AuthenticatedApp: FunctionComponent = () => (
  <UserProvider>
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <MainOrDashboard />
        </Route>
        <Route path="/restaurants/:restaurantId">
          <Restaurant />
        </Route>
        <Route path="/login">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  </UserProvider>
);

export default AuthenticatedApp;

const MainOrDashboard: FunctionComponent = () => {
  const user = useUser();
  return user?.role === Role.Owner ? <OwnerDashboard /> : <Main />;
};
