import type { User } from "../1.domain/User";

export interface AuthorizationService {
  isAllowedToCreateRestaurant(user: User): boolean;
}
