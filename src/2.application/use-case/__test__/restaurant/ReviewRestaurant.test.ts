import { AuthorizationService } from "../../../AuthorizationService";
import { ReviewRestaurant } from "../../restaurant/ReviewRestaurant";
import { ownerUser, regularUser } from "../fixtures";
import { MockReviewRepository } from "../repository/MockReviewRepository";

test("ReviewRestaurant use case", async () => {
  const reviewRepository = new MockReviewRepository();
  const reviewRestaurant = new ReviewRestaurant(
    reviewRepository,
    new AuthorizationService()
  );

  expect.assertions(1);

  await expect(
    reviewRestaurant.execute({
      user: regularUser,
      comment: "Loved it!",
      rating: 5,
      restaurantId: "1",
      visitedAt: new Date(),
    })
  ).resolves.toBeTruthy();
});

test("ReviewRestaurant use case: owners cannot review restaurants", async () => {
  const reviewRepository = new MockReviewRepository();
  const reviewRestaurant = new ReviewRestaurant(
    reviewRepository,
    new AuthorizationService()
  );

  expect.assertions(1);

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

test("ReviewRestaurant use case: ratings must be one of 1, 2, 3, 4 or 5", async () => {
  const reviewRepository = new MockReviewRepository();
  const reviewRestaurant = new ReviewRestaurant(
    reviewRepository,
    new AuthorizationService()
  );

  expect.assertions(2);

  await expect(
    reviewRestaurant.execute({
      user: regularUser,
      comment: "Loved it!",
      rating: 6,
      restaurantId: "1",
      visitedAt: new Date(),
    })
  ).rejects.toThrow();

  await expect(
    reviewRestaurant.execute({
      user: regularUser,
      comment: "Loved it!",
      rating: 3.5,
      restaurantId: "1",
      visitedAt: new Date(),
    })
  ).rejects.toThrow();
});

// TODO test for reviews to restaurants that do not exist
