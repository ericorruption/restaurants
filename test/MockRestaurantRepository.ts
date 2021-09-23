import type { Restaurant, RestaurantId } from "../src/1.domain/Restaurant";
import type { RestaurantRepository } from "../src/2.application/RestaurantRepository";

export class MockRestaurantRepository implements RestaurantRepository {
  findAll(): Promise<Restaurant[]> {
    return Promise.resolve([]);
  }

  findById(restaurantId: RestaurantId): Promise<Restaurant> {
    return Promise.resolve({
      id: restaurantId,
      ownerId: "",
      reviews: [],
    });
  }
}
