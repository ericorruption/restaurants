import type { FunctionComponent } from "react";
import { Link } from "react-router-dom";

import { useListOwnerRestaurantsQuery } from "../graphql/generated-types-and-hooks";
import { useUser } from "../UserContext";

export const OwnerDashboard: FunctionComponent = () => {
  const user = useUser();

  const { loading, data, error } = useListOwnerRestaurantsQuery({
    variables: {
      ownerId: user?.id ?? "",
    },
  });

  return (
    <main>
      <h1 className="visually-hidden">My Restaurants</h1>
      <p className="h1">Hello{user?.name ? `, ${user.name}` : ""}.</p>

      <h2>My restaurants</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.restaurants.length && (
        <ul>
          {[...data.restaurants]
            .filter((restaurant) => restaurant)
            .map((restaurant) => (
              <li key={restaurant.id}>
                {/* TODO beautiful pic */}
                <Link to={`/restaurants/${restaurant.id}`}>
                  {restaurant.name}
                </Link>
              </li>
            ))}
        </ul>
      )}
      {data && !data.restaurants.length && <p>No restaurants</p>}

      <h2>Pending reviews</h2>
    </main>
  );
};
