import type { FunctionComponent } from "react";

export const SignUp: FunctionComponent = () => (
  <main>
    <h1>Sign up</h1>
    <form>
      <fieldset>
        <legend className="visually-hidden">Account details</legend>

        <label htmlFor="email">Email</label>
        <input id="email" type="email" required />

        <br />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" required />

        <br />

        <label>
          <input type="checkbox" name="is-owner" value="true" />
          I'm a restaurant owner
        </label>
      </fieldset>

      <button>Sign up</button>
    </form>
  </main>
);
