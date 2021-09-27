import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";

import type { NumberBetween1And5 } from "../../../1.domain/shared-kernel";
import { RatingFilter } from "../components/RatingFilter";
import { useListRestaurantsQuery } from "../graphql/generated-types-and-hooks";

import "./Main.css";

// TODO move filtering to back-end
// TODO propagate rating to URL
export const Main: FunctionComponent = () => {
  const { data, loading, error } = useListRestaurantsQuery();
  const [rating, setRating] = useState<NumberBetween1And5>();

  return (
    <main>
      <h1 className="main-page-title">Restaurants</h1>
      <p>Sorted by average rating.</p>

      <div className="main-page-grid">
        <div>
          <RatingFilter value={rating} onChange={setRating} />
        </div>
        <div>
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
        </div>
      </div>
    </main>
  );
};
