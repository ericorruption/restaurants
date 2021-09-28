import type { FunctionComponent } from "react";
import { useParams } from "react-router";

import type { RestaurantId } from "../../../1.domain/Restaurant";
import type { NumberBetween1And5 } from "../../../1.domain/shared-kernel";
import { Review } from "../components/Review";
import { ReviewForm } from "../components/ReviewForm";
import { StarRating } from "../components/StarRating";
import { useGetRestaurantQuery } from "../graphql/generated-types-and-hooks";

import "./Restaurant.css";

export const Restaurant: FunctionComponent = () => {
  const { restaurantId } = useParams<{ restaurantId: RestaurantId }>();

  const { data, loading, error } = useGetRestaurantQuery({
    variables: { id: restaurantId },
  });

  if (loading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p>Error: {error.message}</p>
      </main>
    );
  }

  if (!data?.restaurant) {
    return (
      <main>
        <h1>Restaurant not found</h1>
      </main>
    );
  }

  // TODO move to back-end? more criteria (E.g. most recent)
  const sortedReviews = [...data.restaurant.reviews].sort(
    (a, b) => b.rating - a.rating
  );

  const highestRatedReview = sortedReviews[0];
  const lowestRatedReview = sortedReviews[sortedReviews.length - 1];

  return (
    <main>
      <h1 className="restaurant-page-title">{data.restaurant.name}</h1>

      <p className="restaurant-page-average-rating">
        <span className="visually-hidden">Average rating:</span>
        {data.restaurant.rating && (
          <StarRating value={data.restaurant.rating as NumberBetween1And5} />
        )}
      </p>

      <div className="restaurant-page-grid">
        <div className="restaurant-page-grid--1">
          {sortedReviews.length > 0 ? (
            <>
              <h2>Highest rated review</h2>
              {highestRatedReview && <Review {...highestRatedReview} />}

              <h2>Lowest rated review</h2>

              {lowestRatedReview && <Review {...lowestRatedReview} />}
            </>
          ) : (
            <p>
              This restaurant doesn't have any reviews yet.
              <br />
              <strong>Write the first!</strong>
            </p>
          )}
        </div>

        <div className="restaurant-page-grid--2">
          <ReviewForm restaurantId={restaurantId} />

          {/* 4. Last N reviews with rate, comment and reply */}
          {data.restaurant.reviews.length > 0 && <h2>Latest reviews</h2>}
          {data.restaurant.reviews.length > 0 &&
            data.restaurant.reviews.map((review) => (
              <Review key={review.id} {...review} />
            ))}
        </div>
      </div>
    </main>
  );
};
