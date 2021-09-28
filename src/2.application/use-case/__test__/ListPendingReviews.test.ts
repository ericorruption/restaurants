import type { Review } from "../../../1.domain/Review";
import { Rating } from "../../../1.domain/shared-kernel";
import { ReviewService } from "../../ReviewService";
import { ListPendingReviews } from "../ListPendingReviews";

import { ownerUser } from "./fixtures";
import { MockReplyRepository } from "./repository/MockReplyRepository";
import { MockRestaurantRepository } from "./repository/MockRestaurantRepository";
import { MockReviewRepository } from "./repository/MockReviewRepository";

const mockReview: Review = {
  comment: "A pending comment",
  id: "doesnt matter",
  restaurantId: "1",
  rating: new Rating(2),
  userId: "1",
  visitedAt: new Date(),
};

test("ListPendingReview use case", async () => {
  const mockRestaurantRepository = new MockRestaurantRepository([
    {
      id: "1",
      name: "My store",
      ownerId: ownerUser.id,
    },
  ]);
  const mockReviewRepository = new MockReviewRepository([mockReview]);
  const mockReplyRepository = new MockReplyRepository();

  const listPendingReview = new ListPendingReviews(
    new ReviewService(
      mockReviewRepository,
      mockRestaurantRepository,
      mockReplyRepository
    )
  );

  expect.assertions(1);

  await expect(
    listPendingReview.execute({
      user: ownerUser,
    })
  ).resolves.toEqual([mockReview]);
});
