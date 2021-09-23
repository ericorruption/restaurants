import type { Restaurant } from "../../1.domain/Restaurant";
import type { RestaurantRepository } from "../RestaurantRepository";
import type { UseCase } from "./UseCase";

export class ListRestaurants implements UseCase {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async execute(): Promise<Restaurant[]> {
    return this.restaurantRepository.findAll();
  }
}
