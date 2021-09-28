import { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";

import { ReplyForm } from "../components/ReplyForm";
import { RestaurantForm } from "../components/RestaurantForm";
import { Review } from "../components/Review";
import { useGetOwnerDashboardQuery } from "../graphql/generated-types-and-hooks";
import { useUser } from "../UserContext";

// TODO move to css classes
export const OwnerDashboard: FunctionComponent = () => {
  const user = useUser();

  const { loading, data, error } = useGetOwnerDashboardQuery({
    variables: {
      ownerId: user?.id ?? "",
    },
  });

  return (
    <main>
      <h1 className="visually-hidden">My Restaurants</h1>
      <p className="h1">Hello{user?.name ? `, ${user.name}` : ""}.</p>

      <div style={{ display: "flex" }}>
        <div style={{ paddingRight: "2.5rem" }}>
          <h2>My restaurants</h2>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && data.restaurants.length > 0 && (
            <ul>
              {[...data.restaurants]
                .filter((restaurant) => restaurant)
                .map((restaurant) => (
                  <li key={restaurant.id}>
                    <Link to={`/restaurants/${restaurant.id}`}>
                      {restaurant.name}
                    </Link>
                  </li>
                ))}
            </ul>
          )}
          {data && data.restaurants.length === 0 && <p>No restaurants</p>}
          <AddRestaurantButton />
        </div>
        <div>
          <h2>Pending reviews</h2>
          {data && (data.me?.pendingReviews?.length ?? 0) > 0 ? (
            <div style={{ display: "flex" }}>
              {data.me?.pendingReviews?.map((review) => (
                <div key={review.id} style={{ marginRight: "2.5rem" }}>
                  <Review {...review} />
                  <div style={{ marginTop: "1rem" }}>
                    <ReplyButton reviewId={review.id} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews</p>
          )}
        </div>
      </div>
    </main>
  );
};

const AddRestaurantButton: FunctionComponent = () => {
  const [showForm, setShowForm] = useState(false);

  return showForm ? (
    <RestaurantForm />
  ) : (
    <button type="button" onClick={() => setShowForm(true)}>
      Add restaurant
    </button>
  );
};

const ReplyButton: FunctionComponent<{ reviewId: string }> = ({ reviewId }) => {
  const [showForm, setShowForm] = useState(false);

  return showForm ? (
    <ReplyForm reviewId={reviewId} />
  ) : (
    <button type="button" onClick={() => setShowForm(true)}>
      Reply now
    </button>
  );
};
