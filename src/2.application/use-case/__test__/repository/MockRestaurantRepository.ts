import type { Restaurant, RestaurantId } from "../../../../1.domain/Restaurant";
import type { RestaurantRepository } from "../../../repository/RestaurantRepository";

export class MockRestaurantRepository implements RestaurantRepository {
  constructor(private restaurants: Restaurant[] = []) {}

  findByOwnerId(ownerId: string): Promise<Restaurant[]> {
    return Promise.resolve(
      this.restaurants.filter((r) => r.ownerId === ownerId)
    );
  }

  findAll(): Promise<Restaurant[]> {
    return Promise.resolve(this.restaurants);
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
