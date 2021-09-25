import type { User } from "../1.domain/User";
import type { AuthorizationService } from "../2.application/AuthorizationService";

export class InMemoryAuthorizationService implements AuthorizationService {
  isAllowedToCreateRestaurant(user: User) {
    return user.role === "owner";
  }
}
