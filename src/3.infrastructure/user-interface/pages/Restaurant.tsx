import type { FunctionComponent } from "react";
import { useParams } from "react-router";

import type { RestaurantId } from "../../../1.domain/Restaurant";
import { Review } from "../components/Review";
import { ReviewForm } from "../components/ReviewForm";
import { StarRating } from "../components/StarRating";

import "./Restaurant.css";

export const Restaurant: FunctionComponent = () => {
  const { restaurantId } = useParams<{ restaurantId: RestaurantId }>();

  return (
    <main>
      <h1 className="restaurant-page-title">Restaurant name</h1>

      <p className="restaurant-page-average-rating">
        {/* 1. Overall average rating */}
        <span className="visually-hidden">Average rating:</span>
        <StarRating value={5} />
      </p>

      <div className="restaurant-page-grid">
        <div className="restaurant-page-grid--1">
          <h2>Highest rated review</h2>
          {/* 2. Highest rated review */}
          <Review
            visitedAt={new Date()}
            comment="I love this restaurant it's so good!"
            rating={5}
          />

          <h2>Lowest rated review</h2>
          {/* 3. Lowest rated review */}
          <Review
            visitedAt={new Date("2019-08-11")}
            comment="This was horrible!"
            rating={1}
          />
        </div>
        <div className="restaurant-page-grid--2">
          <ReviewForm restaurantId={restaurantId} />

          <h2>Latest reviews</h2>
          {/* 4. Last N reviews with rate, comment and reply */}
          {/* TODO empty state */}
          {/* TODO */}
        </div>
      </div>
    </main>
  );
};
