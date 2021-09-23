import type { Id } from "./Id";
// import type { Review } from "./Review";

export type RestaurantId = Id;

export interface Restaurant {
  id: RestaurantId;
  // reviews: Review[];
}
