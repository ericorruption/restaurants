import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../AuthContext";

import "./Header.css";

export const Header: FunctionComponent = () => {
  const { logOut, isLoggedIn } = useAuth();

  return (
    <header>
      <nav>
        <Link to="/" className="logo">
          REs
        </Link>

        {isLoggedIn && (
          <button type="button" onClick={logOut}>
            Log out
          </button>
        )}
      </nav>
    </header>
  );
};
