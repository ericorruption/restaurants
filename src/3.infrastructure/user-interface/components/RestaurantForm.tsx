import { FormEvent, FunctionComponent, useState } from "react";

import { useCreateRestaurantMutation } from "../graphql/generated-types-and-hooks";

// TODO refresh list, success message
export const RestaurantForm: FunctionComponent = () => {
  const [name, setName] = useState("");
  const [submit] = useCreateRestaurantMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit({
      variables: {
        input: {
          name,
        },
      },
    });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend className="visually-hidden">Add Restaurant</legend>

        <label htmlFor="name">Restaurant name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </fieldset>
      <button type="submit" className="button--primary">
        Add restaurant
      </button>
    </form>
  );
};
