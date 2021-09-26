import type { PrismaClient } from "@prisma/client";

import type { Restaurant, RestaurantId } from "../1.domain/Restaurant";
import type { RestaurantRepository } from "../2.application/RestaurantRepository";

export class PrismaRestaurantRepository implements RestaurantRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findAll(): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany();
  }

  async findById(restaurantId: RestaurantId): Promise<Restaurant> {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      throw new Error(`Restaurant with id ${restaurantId} not found`);
    }

    return restaurant;
  }

  async persist(restaurant: Restaurant): Promise<void> {
    await this.prisma.restaurant.create({ data: restaurant });
  }

  delete(restaurantId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
