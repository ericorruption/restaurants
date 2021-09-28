import type { RestaurantId } from "../../1.domain/Restaurant";
import type { DateNotInTheFuture, ReviewId } from "../../1.domain/Review";
import type { Rating } from "../../1.domain/shared-kernel";

// import type { LoggedUser } from "./LoggedUser";

export interface ReviewModel {
  id: ReviewId;
  // user: LoggedUser;
  restaurantId: RestaurantId;
  rating: Rating;
  visitedAt: DateNotInTheFuture;
  comment: string;
}
