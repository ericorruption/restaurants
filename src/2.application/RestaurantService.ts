import type { RestaurantWithRating } from "./model/Restaurant";
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
}
