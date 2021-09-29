import type { Restaurant, RestaurantId } from "../1.domain/Restaurant";
import type { Review, ReviewId } from "../1.domain/Review";
import type { UserId } from "../1.domain/User";

export interface ManagementService {
  updateUser(input: UpdateUserInput): Promise<void>;
  deleteUser(input: DeleteUserInput): Promise<void>;
  updateRestaurant(input: UpdateRestaurantInput): Promise<Restaurant>;
  deleteRestaurant(input: DeleteRestaurantInput): Promise<void>;
  updateReview(input: UpdateReviewInput): Promise<Review>;
  deleteReview(input: DeleteReviewInput): Promise<void>;
  updateReply(input: UpdateReplyInput): Promise<void>;
  deleteReply(input: DeleteReplyInput): Promise<void>;
}

export interface UpdateUserInput {
  userId: UserId;
  name: string;
}

export interface DeleteUserInput {
  userId: UserId;
}

export interface UpdateRestaurantInput {
  restaurantId: RestaurantId;
  name: string;
}

export interface DeleteRestaurantInput {
  restaurantId: RestaurantId;
}

export interface UpdateReviewInput {
  reviewId: ReviewId;
  comment: string;
  // TODO visitedAt, rating
}

export interface DeleteReviewInput {
  reviewId: ReviewId;
}

export interface UpdateReplyInput {
  replyId: string;
  comment: string;
}

export interface DeleteReplyInput {
  replyId: string;
}
