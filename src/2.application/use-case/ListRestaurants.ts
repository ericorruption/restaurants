import type { Restaurant } from "../../1.domain/Restaurant";
import type { AuthorizationService } from "../AuthorizationService";
import { Unauthorized } from "../Exceptions";
import type { LoggedUser } from "../model/LoggedUser";
import type { RestaurantRepository } from "../RestaurantRepository";

import type { UseCase } from "./UseCase";

interface Input {
  user?: LoggedUser;
}

export class ListRestaurants implements UseCase {
  constructor(
    private restaurantRepository: RestaurantRepository,
    private authorizationService: AuthorizationService
  ) {}

  async execute(input: Input): Promise<Restaurant[]> {
    if (!this.authorizationService.isAllowedToListRestaurants(input.user)) {
      throw new Unauthorized();
    }

    const restaurants = await this.restaurantRepository.findAll();

    return restaurants;
  }
}
