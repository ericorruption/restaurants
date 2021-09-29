import type { Restaurant, RestaurantId } from "../../1.domain/Restaurant";
import type { UserId } from "../../1.domain/User";

export interface RestaurantRepository {
  findAll(): Promise<Restaurant[]>;
  findById(restaurantId: RestaurantId): Promise<Restaurant>;
  findByOwnerId(ownerId: UserId): Promise<Restaurant[]>;
  persist(restaurant: Restaurant): Promise<void>;
}
