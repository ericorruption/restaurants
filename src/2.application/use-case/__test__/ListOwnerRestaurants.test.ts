import { ListOwnerRestaurants } from "../restaurant/ListOwnerRestaurants";

import { regularUser } from "./fixtures";
import { MockRestaurantRepository } from "./repository/MockRestaurantRepository";

test("ListOwnerRestaurants use case", async () => {
  const listOwnerRestaurants = new ListOwnerRestaurants(
    new MockRestaurantRepository([
      {
        id: "1",
        name: "Restaurant 1",
        ownerId: "1",
      },
    ])
  );

  await expect(
    listOwnerRestaurants.execute({
      ownerId: "1",
      user: regularUser,
    })
  ).resolves.toHaveLength(1);
});
