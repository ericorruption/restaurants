import type { Review } from "../../../1.domain/Review";
import { Rating } from "../../../1.domain/shared-kernel";
import { ListPendingReviews } from "../ListPendingReviews";

import { ownerUser } from "./fixtures";
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
  const mockReviewRepository = new MockReviewRepository([mockReview]);
  const listPendingReview = new ListPendingReviews(mockReviewRepository);

  expect.assertions(1);

  await expect(
    listPendingReview.execute({
      user: ownerUser,
    })
  ).resolves.toEqual([mockReview]);
});
