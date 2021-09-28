import type { RestaurantId } from "../../../../1.domain/Restaurant";
import type { Review, ReviewId } from "../../../../1.domain/Review";
import { Rating } from "../../../../1.domain/shared-kernel";
import type { ReviewRepository } from "../../../repository/ReviewRepository";

export class MockReviewRepository implements ReviewRepository {
  constructor(private reviews: Review[] = []) {}

  getByRestaurantIds(restaurantIds: string[]): Promise<Review[]> {
    return Promise.resolve(
      this.reviews.filter((review) =>
        restaurantIds.includes(review.restaurantId)
      )
    );
  }

  getByRestaurantId(restaurantId: string): Promise<Review[]> {
    const reviews = this.reviews.filter(
      (review) => review.restaurantId === restaurantId
    );

    return Promise.resolve(reviews);
  }

  getAverageRatingGroupByRestaurant(): Promise<Record<RestaurantId, Rating>> {
    const initialState: Record<RestaurantId, Rating> = {};
    const result: Record<RestaurantId, Rating> = this.reviews.reduce(
      (acc, curr) => {
        acc[curr.restaurantId] = new Rating(curr.rating.value);
        return acc;
      },
      initialState
    );

    return Promise.resolve(result);
  }

  findById(id: ReviewId): Promise<Review> {
    const review = this.reviews.find((review) => review.id === id);

    if (!review) {
      throw new Error(`Review with id ${id} not found`);
    }

    return Promise.resolve(review);
  }

  persist(review: Review): Promise<void> {
    this.reviews.push(review);
    return Promise.resolve();
  }
}
