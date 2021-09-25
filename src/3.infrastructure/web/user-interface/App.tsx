import type { FunctionComponent } from "react";

import { Router } from "./Router";

import "./App.css";
import { Header } from "./Header";

export const App: FunctionComponent = () => {
  // TODO load auth info from storage if any

  return (
    <>
      <Header />
      <Router />
    </>
  );
};
