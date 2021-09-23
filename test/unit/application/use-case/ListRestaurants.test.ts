import { ListRestaurants } from "../../../../src/2.application/use-case/ListRestaurants";

import { MockRestaurantRepository } from "../../../MockRestaurantRepository";

test("ListRestaurants use case", async () => {
  const listRestaurants = new ListRestaurants(new MockRestaurantRepository());
  const restaurants = await listRestaurants.execute();
  expect(restaurants).toEqual([]);
});
