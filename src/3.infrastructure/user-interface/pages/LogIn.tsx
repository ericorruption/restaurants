import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export const LogIn: FunctionComponent = () => (
  <main>
    <h1>Log in</h1>
    <form>
      <fieldset>
        <legend className="visually-hidden">Account details</legend>

        <label htmlFor="email">Email</label>
        <input id="email" type="email" required />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" required />
      </fieldset>

      <button>Log in</button>
    </form>

    <Link to="/sign-up">I don't have an account</Link>
  </main>
);
