import type { FunctionComponent } from "react";

import type { NumberBetween1And5 } from "../../../1.domain/shared-kernel";
import type { Review as ReviewType } from "../graphql/generated-types-and-hooks";

import { StarRating } from "./StarRating";

type Props = Omit<ReviewType, "restaurantId">;

export const Review: FunctionComponent<Props> = ({
  rating,
  comment,
  visitedAt,
  reply,
}) => (
  <>
    <article>
      <p>{comment}</p>
      <p>
        On{" "}
        <time dateTime={new Date(visitedAt).toISOString()}>
          {new Date(visitedAt).toLocaleDateString()}
        </time>
      </p>
      <StarRating value={rating as NumberBetween1And5} />
    </article>

    {reply && (
      <article>
        <p>Reply from restaurant owner:</p>
        <blockquote>{reply}</blockquote>
      </article>
    )}
  </>
);
