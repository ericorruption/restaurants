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

  isAllowedToReplyToReview(user: LoggedUser): boolean {
    // TODO user === owner, owner restaurants includes review.restaurantId
    return true;
  }
}
