import type { Restaurant } from "../../../1.domain/Restaurant";
import type { UserId } from "../../../1.domain/User";
import { Unauthorized } from "../../Exceptions";
import type { LoggedUser } from "../../model/LoggedUser";
import type { RestaurantRepository } from "../../repository/RestaurantRepository";
import type { UseCase } from "../UseCase";

interface Input {
  user?: LoggedUser;
  ownerId: UserId;
}

// Unsure whether only restaurant owners should be able to perform this
export class ListOwnerRestaurants implements UseCase {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async execute(input: Input): Promise<Restaurant[]> {
    if (!input.user) {
      throw new Unauthorized();
    }

    return this.restaurantRepository.findByOwnerId(input.ownerId);
  }
}
