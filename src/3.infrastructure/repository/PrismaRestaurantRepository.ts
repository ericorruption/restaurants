import type { PrismaClient } from "@prisma/client";

import type { Restaurant, RestaurantId } from "../../1.domain/Restaurant";
import type { UserId } from "../../1.domain/User";
import type { RestaurantRepository } from "../../2.application/repository/RestaurantRepository";

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

  async findByOwnerId(ownerId: UserId): Promise<Restaurant[]> {
    const restaurants = await this.prisma.restaurant.findMany({
      where: { ownerId },
    });

    if (!restaurants) {
      throw new Error(`Restaurant with ownerId ${ownerId} not found`);
    }

    return restaurants;
  }

  async persist(restaurant: Restaurant): Promise<void> {
    await this.prisma.restaurant.create({ data: restaurant });
  }

  delete(restaurantId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
