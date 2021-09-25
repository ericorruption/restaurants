import { v4 as uuid } from "uuid";

import type { Id } from "./shared-kernel";
import type { UserId } from "./User";

export type RestaurantId = Id;

export interface Restaurant {
  id: RestaurantId;
  ownerId: UserId;
}

interface CreateRestaurantInput {
  ownerId: UserId;
}

export const createRestaurant = (input: CreateRestaurantInput): Restaurant => ({
  id: uuid(),
  ownerId: input.ownerId,
});
