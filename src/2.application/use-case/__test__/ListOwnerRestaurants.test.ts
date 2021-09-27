import { ListOwnerRestaurants } from "../ListOwnerRestaurants";

import { regularUser } from "./fixtures";
import { MockRestaurantRepository } from "./repository/MockRestaurantRepository";

test("ListOwnerRestaurants use case", async () => {
  const listOwnerRestaurants = new ListOwnerRestaurants(
    new MockRestaurantRepository()
  );

  await expect(
    listOwnerRestaurants.execute({
      ownerId: "1",
      user: regularUser,
    })
  ).resolves.toHaveLength(1);
});
