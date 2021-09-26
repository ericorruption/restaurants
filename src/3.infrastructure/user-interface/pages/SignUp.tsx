/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import type { FormEvent, FunctionComponent } from "react";
import { Link } from "react-router-dom";

import { Role, useSignUpMutation } from "../graphql/generated-types-and-hooks";

export const SignUp: FunctionComponent = () => {
  const [signUp, { data, error }] = useSignUpMutation();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;
    const repeatPassword = event.currentTarget["repeat-password"].value;
    const isOwner: boolean = event.currentTarget["is-owner"].checked;

    if (password !== repeatPassword) {
      return;
    }

    await signUp({
      variables: {
        input: {
          email,
          password,
          role: isOwner ? Role.Owner : undefined,
        },
      },
    });
  };

  return (
    <main>
      <h1>Sign up</h1>
      {error && <p>{error.message}</p>}
      {data && data.signUp.success && <p>Account created successfully!</p>}
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend className="visually-hidden">Account details</legend>

          <label htmlFor="email">Email</label>
          <input id="email" type="email" required />

          <br />

          <label htmlFor="password">Password</label>
          <input id="password" type="password" required />

          <br />

          <label htmlFor="repeat-password">Repeat password</label>
          <input id="repeat-password" type="password" required />

          <br />

          <label>
            <input type="checkbox" name="is-owner" value="true" />
            I'm a restaurant owner
          </label>
        </fieldset>

        <button type="submit">Sign up</button>
      </form>
      <Link to="/login">I already have an account</Link>
    </main>
  );
};
