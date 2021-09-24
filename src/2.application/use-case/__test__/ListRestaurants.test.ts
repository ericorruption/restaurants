import { ListRestaurants } from "../ListRestaurants";

import { MockRestaurantRepository } from "./MockRestaurantRepository";

test("ListRestaurants use case", async () => {
  const listRestaurants = new ListRestaurants(new MockRestaurantRepository());
  const restaurants = await listRestaurants.execute();
  expect(restaurants).toEqual([]);
});
