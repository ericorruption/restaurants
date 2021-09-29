import type { AuthenticationService } from "./AuthenticationService";
import type { CreateUser } from "./use-case/user/CreateUser";
import type { LogIn } from "./use-case/auth/LogIn";
import type { CreateRestaurant } from "./use-case/restaurant/CreateRestaurant";
import type { GetRestaurant } from "./use-case/restaurant/GetRestaurant";
import type { GetUser } from "./use-case/user/GetUser";
import type { ListOwnerRestaurants } from "./use-case/restaurant/ListOwnerRestaurants";
import type { ListRestaurants } from "./use-case/restaurant/ListRestaurants";
import type { ReplyToReview } from "./use-case/ReplyToReview";
import type { ReviewRestaurant } from "./use-case/restaurant/ReviewRestaurant";
import type { ListPendingReviews } from "./use-case/ListPendingReviews";
import type { ManagementService } from "./ManagementService";

interface UseCases {
  createUser: CreateUser;
  logIn: LogIn;
  listRestaurants: ListRestaurants;
  createRestaurant: CreateRestaurant;
  reviewRestaurant: ReviewRestaurant;
  replyToReview: ReplyToReview;
  getRestaurant: GetRestaurant;
  getUser: GetUser;
  listOwnerRestaurants: ListOwnerRestaurants;
  listPendingReviews: ListPendingReviews;
}

export class Application {
  constructor(
    public useCases: UseCases,
    public authenticationService: AuthenticationService,
    public managementService: ManagementService
  ) {}
}
