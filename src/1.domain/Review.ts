import { v4 as uuid } from "uuid";

import type { RestaurantId } from "./Restaurant";
import type { Id, NumberBetween1And5 } from "./shared-kernel";
import type { UserId } from "./User";

export type ReviewId = Id;

type DateNotInTheFuture = Date;

export interface Review {
  id: ReviewId;
  userId: UserId;
  restaurantId: RestaurantId;
  rating: NumberBetween1And5;
  visitedAt: DateNotInTheFuture;
  comment: string;
}

interface CreateReviewInput {
  userId: UserId;
  restaurantId: RestaurantId;
  rating: number;
  visitedAt: DateNotInTheFuture;
  comment: string;
}

export const createReview = (input: CreateReviewInput): Review => {
  if (![1, 2, 3, 4, 5].includes(input.rating)) {
    throw new Error("Rating must be between 1 and 5");
  }

  const rating = input.rating as NumberBetween1And5;

  return {
    ...input,
    rating,
    id: uuid(),
  };
};
