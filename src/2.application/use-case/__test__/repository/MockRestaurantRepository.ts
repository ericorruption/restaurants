import type { Restaurant, RestaurantId } from "../../../../1.domain/Restaurant";
import type { RestaurantRepository } from "../../../repository/RestaurantRepository";

export class MockRestaurantRepository implements RestaurantRepository {
  findAll(): Promise<Restaurant[]> {
    return Promise.resolve([]);
  }

  findById(restaurantId: RestaurantId): Promise<Restaurant> {
    return Promise.resolve({
      id: restaurantId,
      ownerId: "",
      reviews: [],
      name: "Mock",
    });
  }

  persist(restaurant: Restaurant): Promise<void> {
    return Promise.resolve();
  }
}
