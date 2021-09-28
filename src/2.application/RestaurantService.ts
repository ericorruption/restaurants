import type { RestaurantId } from "../1.domain/Restaurant";
import { Rating } from "../1.domain/shared-kernel";

import type {
  RestaurantWithRating,
  RestaurantWithReviews,
} from "./model/Restaurant";
import type { ReviewRepository } from "./repository/ReviewRepository";
import type { RestaurantRepository } from "./repository/RestaurantRepository";

export class RestaurantService {
  constructor(
    private restaurantRepository: RestaurantRepository,
    private reviewRepository: ReviewRepository
  ) {}

  // TODO account for amount of reviews for sorting
  async getAllWithRating(): Promise<RestaurantWithRating[]> {
    const [restaurants, ratings] = await Promise.all([
      this.restaurantRepository.findAll(),
      this.reviewRepository.getAverageRatingGroupByRestaurant(),
    ]);

    return restaurants
      .map((restaurant) => ({
        ...restaurant,
        rating: ratings[restaurant.id],
      }))
      .sort((a, b) => b.rating?.value ?? 0 - a.rating?.value ?? 0);
  }

  async getByIdWithReviews(
    restaurantId: RestaurantId
  ): Promise<RestaurantWithReviews> {
    const [restaurant, reviews] = await Promise.all([
      this.restaurantRepository.findById(restaurantId),
      this.reviewRepository.getByRestaurantId(restaurantId),
    ]);

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((acc, curr) => acc + curr.rating.value, 0) /
          reviews.length
        : undefined;

    return {
      ...restaurant,
      reviews,
      rating: averageRating ? new Rating(Math.round(averageRating)) : undefined,
    };
  }
}
