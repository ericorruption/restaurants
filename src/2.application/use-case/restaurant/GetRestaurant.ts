import type { Restaurant, RestaurantId } from "../../../1.domain/Restaurant";
import { Unauthorized } from "../../Exceptions";
import type { LoggedUser } from "../../model/LoggedUser";
import type { RestaurantRepository } from "../../repository/RestaurantRepository";
import type { UseCase } from "../UseCase";

interface Input {
  user?: LoggedUser;
  restaurantId: RestaurantId;
}

// TODO guard against non-existing restaurant
export class GetRestaurant implements UseCase {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  async execute(input: Input): Promise<Restaurant> {
    if (!input.user) {
      throw new Unauthorized();
    }

    return this.restaurantRepository.findById(input.restaurantId);
  }
}
