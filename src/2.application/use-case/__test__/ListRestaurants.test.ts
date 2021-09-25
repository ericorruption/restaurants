import { AuthorizationService } from "../../AuthorizationService";
import { ListRestaurants } from "../ListRestaurants";

import { MockRestaurantRepository } from "./MockRestaurantRepository";

test("ListRestaurants use case", async () => {
  const listRestaurants = new ListRestaurants(
    new MockRestaurantRepository(),
    new AuthorizationService()
  );
  const restaurants = await listRestaurants.execute({
    user: { id: "userId", role: "user" },
  });
  expect(restaurants).toEqual([]);
});
