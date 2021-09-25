import type { User } from "../1.domain/User";

export class AuthorizationService {
  isAllowedToListRestaurants(user?: User) {
    return user;
  }

  isAllowedToCreateRestaurant(user: User) {
    return user.role === "owner";
  }
}
