import { createRestaurant, Restaurant } from "../../1.domain/Restaurant";
import type { AuthorizationService } from "../AuthorizationService";
import { Unauthorized } from "../Exceptions";
import type { LoggedUser } from "../model/LoggedUser";
import type { RestaurantRepository } from "../RestaurantRepository";

import type { UseCase } from "./UseCase";

interface Input {
  user?: LoggedUser;
  name: string;
}

export class CreateRestaurant implements UseCase {
  constructor(
    private restaurantRepository: RestaurantRepository,
    private authorizationService: AuthorizationService
  ) {}

  async execute(input: Input): Promise<Restaurant> {
    if (
      !input.user ||
      !this.authorizationService.isAllowedToCreateRestaurant(input.user)
    ) {
      throw new Unauthorized();
    }

    const newRestaurant = createRestaurant({
      ownerId: input.user.id,
      name: input.name,
    });

    await this.restaurantRepository.persist(newRestaurant);

    return newRestaurant;
  }
}
