import type { FunctionComponent } from "react";

import type { NumberBetween1And5 } from "../../../1.domain/shared-kernel";
import type { Review as ReviewType } from "../graphql/generated-types-and-hooks";

import { StarRating } from "./StarRating";

interface Props extends Pick<ReviewType, "rating" | "comment"> {
  visitedAt: Date;
}

export const Review: FunctionComponent<Props> = ({
  rating,
  comment,
  visitedAt,
}) => {
  const castRating = rating as NumberBetween1And5;

  return (
    <article>
      <p>{comment}</p>
      <p>
        On{" "}
        <time dateTime={visitedAt.toISOString()}>
          {visitedAt.toLocaleDateString()}
        </time>
      </p>
      <StarRating value={castRating} />
    </article>
  );
};
