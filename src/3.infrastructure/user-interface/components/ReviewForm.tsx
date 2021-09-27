/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import type { FormEvent, FunctionComponent } from "react";

import type { RestaurantId } from "../../../1.domain/Restaurant";

import "./ReviewForm.css";

export const ReviewForm: FunctionComponent<{ restaurantId: RestaurantId }> = ({
  restaurantId,
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const visitDate = event.currentTarget["visit-date"].value;

    console.log({
      restaurantId,
      rating: event.currentTarget.rating.value,
      comment: event.currentTarget.comment.value,
      visitDate,
    });
    // TODO hook
  };

  return (
    <>
      <h2>Leave a review</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="visually-hidden">Review details</legend>

          <label htmlFor="rating">Rating</label>
          <RatingSelector />

          <label htmlFor="visit-date">Visit date</label>
          <input id="visit-date" name="visit-date" type="date" required />

          <label htmlFor="comment">Comment</label>
          <textarea id="comment" name="comment" required></textarea>
        </fieldset>

        <button type="submit" className="button--primary">
          Review restaurant
        </button>
      </form>
    </>
  );
};

const RatingSelector: FunctionComponent = () => (
  <div className="rating-selector-wrapper">
    <div className="rating-selector">
      {[1, 2, 3, 4, 5].map((rating) => (
        <>
          <input
            type="radio"
            id={`rating-${rating}`}
            name="rating"
            value={rating}
            className="visually-hidden"
            required
          />
          <label htmlFor={`rating-${rating}`}>
            {rating} star{rating > 1 && "s"}
          </label>
        </>
      ))}
    </div>
  </div>
);
