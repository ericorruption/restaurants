import type { RestaurantId } from "../../../1.domain/Restaurant";
import { Unauthorized } from "../../Exceptions";
import type { LoggedUser } from "../../model/LoggedUser";
import type { RestaurantWithReviews } from "../../model/Restaurant";
import type { RestaurantService } from "../../RestaurantService";
import type { UseCase } from "../UseCase";

interface Input {
  user?: LoggedUser;
  restaurantId: RestaurantId;
}

export class GetRestaurant implements UseCase {
  constructor(private readonly restaurantService: RestaurantService) {}

  async execute(input: Input): Promise<RestaurantWithReviews> {
    if (!input.user) {
      throw new Unauthorized();
    }

    return this.restaurantService.getByIdWithReviews(input.restaurantId);
  }
}
