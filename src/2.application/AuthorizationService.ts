import type { Review } from "../1.domain/Review";

import type { LoggedUser } from "./model/LoggedUser";

export class AuthorizationService {
  isAllowedToListRestaurants(user?: LoggedUser): boolean {
    return user !== undefined;
  }

  isAllowedToCreateRestaurant(user: LoggedUser): boolean {
    return user.role === "owner";
  }

  isAllowedToCreateReview(user: LoggedUser): boolean {
    return user.role === "user";
  }

  isAllowedToReplyToReview(user: LoggedUser, review: Review): boolean {
    // TODO user restaurants includes review.restaurantId
    // OR
    // restaurant.ownerId === user.id (using a restaurants service)
    return user.role === "owner";
  }
}
