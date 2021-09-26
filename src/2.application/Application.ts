import type { AuthenticationService } from "./AuthenticationService";
import type { CreateUser } from "./use-case/auth/CreateUser";
import type { LogIn } from "./use-case/auth/LogIn";
import type { ListRestaurants } from "./use-case/ListRestaurants";

interface UseCases {
  createUser: CreateUser;
  logIn: LogIn;
  listRestaurants: ListRestaurants;
}

export class Application {
  constructor(
    public useCases: UseCases,
    public authenticationService: AuthenticationService
  ) {}
}
