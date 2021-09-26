import type { FunctionComponent } from "react";

import { useListRestaurantsQuery } from "../graphql/generated-types-and-hooks";

// TODO call /restaurants, render list
// TODO filter by rating
export const Main: FunctionComponent = () => {
  const { data, loading, error } = useListRestaurantsQuery();

  return (
    <main>
      <h1>Restaurants</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.restaurants.length && (
        <ul>
          {data.restaurants.map((restaurant) => (
            <li key={restaurant.id}>{restaurant.name}</li>
          ))}
        </ul>
      )}
      {data && !data.restaurants.length && <p>No restaurants</p>}
    </main>
  );
};
