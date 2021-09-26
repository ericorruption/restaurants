import type { User } from "../1.domain/User";

export class AuthorizationService {
  isAllowedToListRestaurants(user?: User): boolean {
    return user !== undefined;
  }

  isAllowedToCreateRestaurant(user: User): boolean {
    // TODO input is userId, get user role
    return user.role === "owner";
  }
}
