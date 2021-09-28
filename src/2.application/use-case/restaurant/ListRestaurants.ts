import type { AuthorizationService } from "../../AuthorizationService";
import { Unauthorized } from "../../Exceptions";
import type { LoggedUser } from "../../model/LoggedUser";
import type { RestaurantWithRating } from "../../model/Restaurant";
import type { RestaurantService } from "../../RestaurantService";
import type { UseCase } from "../UseCase";

interface Input {
  user?: LoggedUser;
}

export class ListRestaurants implements UseCase {
  constructor(
    private restaurantService: RestaurantService,
    private authorizationService: AuthorizationService
  ) {}

  execute(input: Input): Promise<RestaurantWithRating[]> {
    if (!this.authorizationService.isAllowedToListRestaurants(input.user)) {
      throw new Unauthorized();
    }

    return this.restaurantService.getAllWithRating();
  }
}
