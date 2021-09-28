import type { Restaurant } from "../../1.domain/Restaurant";
import type { Rating } from "../../1.domain/shared-kernel";

// import type { ReviewModel } from "./Review";

export interface RestaurantWithRating extends Restaurant {
  rating?: Rating; // average rating
}

// export interface RestaurantWithReviews extends RestaurantWithRating {
//   latestReviews: ReviewModel[];
//   highestReview?: ReviewModel;
//   lowestReview?: ReviewModel;
// }
