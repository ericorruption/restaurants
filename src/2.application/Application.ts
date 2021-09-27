import type { AuthenticationService } from "./AuthenticationService";
import type { CreateUser } from "./use-case/auth/CreateUser";
import type { LogIn } from "./use-case/auth/LogIn";
import type { CreateRestaurant } from "./use-case/CreateRestaurant";
import type { GetRestaurant } from "./use-case/GetRestaurant";
import type { GetUser } from "./use-case/GetUser";
import type { ListRestaurants } from "./use-case/ListRestaurants";
import type { ReplyToReview } from "./use-case/ReplyToReview";
import type { ReviewRestaurant } from "./use-case/ReviewRestaurant";

interface UseCases {
  createUser: CreateUser;
  logIn: LogIn;
  listRestaurants: ListRestaurants;
  createRestaurant: CreateRestaurant;
  reviewRestaurant: ReviewRestaurant;
  replyToReview: ReplyToReview;
  getRestaurant: GetRestaurant;
  getUser: GetUser;
}

export class Application {
  constructor(
    public useCases: UseCases,
    public authenticationService: AuthenticationService
  ) {}
}
