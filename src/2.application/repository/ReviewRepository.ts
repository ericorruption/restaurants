import type { OwnerId, RestaurantId } from "../../1.domain/Restaurant";
import type { Review, ReviewId } from "../../1.domain/Review";
import type { Rating } from "../../1.domain/shared-kernel";
import type { ReviewModel } from "../model/Review";

export interface ReviewRepository {
  findById(id: ReviewId): Promise<Review>;
  getByRestaurantId(restaurantId: RestaurantId): Promise<ReviewModel[]>;
  getByRestaurantIds(restaurantIds: RestaurantId[]): Promise<Review[]>;
  persist(review: Review): Promise<void>;
  getAverageRatingGroupByRestaurant(): Promise<Record<RestaurantId, Rating>>;
  getPendingReviewsByOwnerId(ownerId: OwnerId): Promise<Review[]>;
}
