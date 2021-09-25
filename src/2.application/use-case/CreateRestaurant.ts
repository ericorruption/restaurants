import { createRestaurant } from "../../1.domain/Restaurant";
import type { User } from "../../1.domain/User";
import type { AuthorizationService } from "../AuthorizationService";
import { Unauthorized } from "../Exceptions";
import type { RestaurantRepository } from "../RestaurantRepository";
import type { UseCase } from "./UseCase";

interface Input {
  user: User;
}

export class CreateRestaurant implements UseCase {
  constructor(
    private restaurantRepository: RestaurantRepository,
    private authorizationService: AuthorizationService
  ) {}

  async execute(input: Input) {
    if (!this.authorizationService.isAllowedToCreateRestaurant(input.user)) {
      throw new Unauthorized();
    }

    const newRestaurant = createRestaurant({
      ownerId: input.user.id,
    });

    await this.restaurantRepository.persist(newRestaurant);
  }
}
