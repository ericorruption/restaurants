import { v4 as uuid } from "uuid";

import type { RestaurantId } from "./Restaurant";
import { Id, Rating } from "./shared-kernel";
import type { UserId } from "./User";

export type ReviewId = Id;

export type DateNotInTheFuture = Date;

export interface Review {
  id: ReviewId;
  userId: UserId;
  restaurantId: RestaurantId;
  rating: Rating;
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

export const createReview = (input: CreateReviewInput): Review => ({
  ...input,
  rating: new Rating(input.rating),
  id: uuid(),
});
