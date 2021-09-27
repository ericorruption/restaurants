import type { Reply } from "../../../../1.domain/Reply";
import type { ReviewId } from "../../../../1.domain/Review";
import type { ReplyRepository } from "../../../repository/ReplyRepository";

export class MockReplyRepository implements ReplyRepository {
  constructor(private replies: Reply[] = []) {}

  findByReviewId(reviewId: ReviewId): Promise<Reply | undefined> {
    const reply = this.replies.find((reply) => reply.reviewId === reviewId);

    return Promise.resolve(reply);
  }

  persist(reviewId: string, reply: string): Promise<void> {
    return Promise.resolve();
  }
}
