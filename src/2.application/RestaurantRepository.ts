import type { Restaurant, RestaurantId } from "../1.domain/Restaurant";

export interface RestaurantRepository {
  findAll(): Promise<Restaurant[]>;
  findById(restaurantId: RestaurantId): Promise<Restaurant>;
  // TODO move to query class
  // find by ownerId
}
