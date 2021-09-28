import { AuthorizationService } from "../../../AuthorizationService";
import { ListRestaurants } from "../../restaurant/ListRestaurants";
import { regularUser } from "../fixtures";
import { MockRestaurantRepository } from "../repository/MockRestaurantRepository";

test("ListRestaurants use case", async () => {
  const listRestaurants = new ListRestaurants(
    new MockRestaurantRepository(),
    new AuthorizationService()
  );
  const restaurants = await listRestaurants.execute({
    user: regularUser,
  });
  expect(restaurants).toEqual([]);
});

// TODO test for sorting based on rating
// TODO test for returning only restaurants with specific rating
