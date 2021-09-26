/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import type { FormEvent, FunctionComponent } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../AuthContext";

export const LogIn: FunctionComponent = () => {
  const { logIn, logInError } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await logIn({
      variables: {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      },
    });
  };

  return (
    <main>
      <h1>Log in</h1>

      {logInError && <p>{logInError.message}</p>}

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="visually-hidden">Account details</legend>

          <label htmlFor="email">Email</label>
          <input id="email" type="email" required />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" required />
        </fieldset>

        <button type="submit">Log in</button>
      </form>

      <Link to="/sign-up">I don't have an account</Link>
    </main>
  );
};
