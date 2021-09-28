import { v4 as uuid } from "uuid";

import type { Id } from "./shared-kernel";
import type { UserId } from "./User";

export type RestaurantId = Id;
export type OwnerId = UserId;

export interface Restaurant {
  id: RestaurantId;
  ownerId: OwnerId;
  name: string;
}

interface CreateRestaurantInput {
  ownerId: UserId;
  name: string;
}

export const createRestaurant = (input: CreateRestaurantInput): Restaurant => ({
  id: uuid(),
  ...input,
});
