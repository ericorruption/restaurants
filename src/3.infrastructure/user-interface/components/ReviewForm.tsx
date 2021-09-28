/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import {
  ChangeEventHandler,
  FormEvent,
  Fragment,
  FunctionComponent,
  useState,
} from "react";

import type { RestaurantId } from "../../../1.domain/Restaurant";
import type { NumberBetween1And5 } from "../../../1.domain/shared-kernel";
import {
  GetRestaurantDocument,
  Role,
  useReviewRestaurantMutation,
} from "../graphql/generated-types-and-hooks";
import { useUser } from "../UserContext";

import "./ReviewForm.css";

export const ReviewForm: FunctionComponent<{ restaurantId: RestaurantId }> = ({
  restaurantId,
}) => {
  const user = useUser();
  const [submit] = useReviewRestaurantMutation({
    refetchQueries: [GetRestaurantDocument],
  });
  const [rating, setRating] = useState<NumberBetween1And5>(5);

  const handleRatingChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setRating(parseInt(event.target.value, 10) as NumberBetween1And5);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const visitDate = new Date(
      event.currentTarget["visit-date"].value
    ).toISOString();

    await submit({
      variables: {
        input: {
          restaurantId,
          rating: 5,
          comment: event.currentTarget.comment.value,
          visitedAt: visitDate,
        },
      },
    });

    (event.target as HTMLFormElement).reset();
  };

  if (user?.role === Role.Owner) {
    return null;
  }

  return (
    <>
      <h2>Leave a review</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="visually-hidden">Review details</legend>

          <label htmlFor="rating">Rating</label>
          <RatingSelector value={rating} onChange={handleRatingChange} />

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

const RatingSelector: FunctionComponent<{
  value?: NumberBetween1And5;
  onChange: ChangeEventHandler<HTMLInputElement>;
}> = ({ onChange, value }) => (
  <div className="rating-selector-wrapper">
    <div className="rating-selector">
      {[5, 4, 3, 2, 1].map((rating) => (
        <Fragment key={rating}>
          <input
            type="radio"
            id={`rating-${rating}`}
            name="rating"
            value={rating}
            checked={rating === value}
            className="visually-hidden"
            onChange={onChange}
            required
          />
          <label htmlFor={`rating-${rating}`}>
            {rating} star{rating > 1 && "s"}
          </label>
        </Fragment>
      ))}
    </div>
  </div>
);
