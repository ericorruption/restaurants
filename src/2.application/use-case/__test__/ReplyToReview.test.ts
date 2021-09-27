import { AuthorizationService } from "../../AuthorizationService";
import { ReplyToReview } from "../ReplyToReview";

import { MockReplyRepository } from "./repository/MockReplyRepository";
import { MockReviewRepository } from "./repository/MockReviewRepository";

test("ReplyToReview use case", async () => {
  const mockReplyRepository = new MockReplyRepository();
  const mockReviewRepository = new MockReviewRepository([
    {
      id: "1",
      comment: "I liked this restaurant.",
      rating: 5,
      restaurantId: "1",
      userId: "1",
      visitedAt: new Date(),
    },
  ]);
  const replyToReview = new ReplyToReview(
    mockReviewRepository,
    mockReplyRepository,
    new AuthorizationService()
  );

  await expect(
    replyToReview.execute({
      reviewId: "1",
      reply: "We'll improve our service.",
      user: {
        id: "userId",
        email: "",
        role: "owner",
      },
    })
  ).resolves.toBeUndefined();
});

// TODO test: trying to reply with a regular user account
// TODO test: trying to reply to non existing review
// TODO trying to reply more than once
