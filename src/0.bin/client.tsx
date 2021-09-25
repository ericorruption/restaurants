import React from "react";
import ReactDOM from "react-dom";

import { App } from "../3.infrastructure/user-interface/App";

export const main = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
};
