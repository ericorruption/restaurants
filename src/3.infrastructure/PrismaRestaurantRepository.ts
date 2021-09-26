import type { PrismaClient } from "@prisma/client";

import type { Restaurant, RestaurantId } from "../1.domain/Restaurant";
import type { RestaurantRepository } from "../2.application/RestaurantRepository";

// TODO implement
export class PrismaRestaurantRepository implements RestaurantRepository {
  private restaurants: Restaurant[] = [];

  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Restaurant[]> {
    return Promise.resolve(this.restaurants);
  }

  async findById(restaurantId: RestaurantId): Promise<Restaurant> {
    const restaurant = this.restaurants.find(
      (restaurant) => restaurant.id === restaurantId
    );

    if (!restaurant) {
      throw new Error(`Restaurant with id ${restaurantId} not found`);
    }

    return Promise.resolve(restaurant);
  }

  persist(restaurant: Restaurant): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(restaurantId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
