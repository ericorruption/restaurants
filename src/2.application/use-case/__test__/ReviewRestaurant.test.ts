import { AuthorizationService } from "../../AuthorizationService";
import { ReviewRestaurant } from "../ReviewRestaurant";

import { ownerUser, regularUser } from "./fixtures";
import { MockReviewRepository } from "./repository/MockReviewRepository";

test("ReviewRestaurant use case", async () => {
  const reviewRepository = new MockReviewRepository();
  const reviewRestaurant = new ReviewRestaurant(
    reviewRepository,
    new AuthorizationService()
  );

  await expect(
    reviewRestaurant.execute({
      user: regularUser,
      comment: "Loved it!",
      rating: 5,
      restaurantId: "1",
      visitedAt: new Date(),
    })
  ).resolves.toBeUndefined();
});

test("ReviewRestaurant use case: owners cannot review restaurants", async () => {
  const reviewRepository = new MockReviewRepository();
  const reviewRestaurant = new ReviewRestaurant(
    reviewRepository,
    new AuthorizationService()
  );

  await expect(
    reviewRestaurant.execute({
      user: ownerUser,
      comment: "Loved it!",
      rating: 5,
      restaurantId: "1",
      visitedAt: new Date(),
    })
  ).rejects.toThrow();
});

// TODO test for reviews to restaurants that do not exist
