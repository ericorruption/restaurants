import { Rating } from "../../../../1.domain/shared-kernel";
import { AuthorizationService } from "../../../AuthorizationService";
import { RestaurantService } from "../../../RestaurantService";
import { ListRestaurants } from "../../restaurant/ListRestaurants";
import { regularUser } from "../fixtures";
import { MockRestaurantRepository } from "../repository/MockRestaurantRepository";
import { MockReviewRepository } from "../repository/MockReviewRepository";

test("ListRestaurants use case", async () => {
  const listRestaurants = new ListRestaurants(
    new RestaurantService(
      new MockRestaurantRepository(),
      new MockReviewRepository()
    ),
    new AuthorizationService()
  );
  const restaurants = await listRestaurants.execute({
    user: regularUser,
  });
  expect(restaurants).toEqual([]);
});

// TODO probably a competence of presenter instead?
test("ListRestaurants use case: returns restaurants sorted by rating", async () => {
  const listRestaurants = new ListRestaurants(
    new RestaurantService(
      new MockRestaurantRepository([
        {
          id: "1",
          name: "1",
          ownerId: "1",
        },
        {
          id: "2",
          name: "1",
          ownerId: "1",
        },
        {
          id: "3",
          name: "1",
          ownerId: "1",
        },
      ]),
      new MockReviewRepository([
        {
          restaurantId: "2",
          comment: "",
          id: "1",
          rating: new Rating(4),
          userId: "1",
          visitedAt: new Date(),
        },
        {
          restaurantId: "1",
          comment: "",
          id: "1",
          rating: new Rating(5),
          userId: "2",
          visitedAt: new Date(),
        },
      ])
    ),
    new AuthorizationService()
  );
  const restaurants = await listRestaurants.execute({
    user: regularUser,
  });

  expect(restaurants.map((restaurant) => restaurant.rating?.value)).toEqual([
    5,
    4,
    undefined,
  ]);
});

// TODO test for returning only restaurants with specific rating
