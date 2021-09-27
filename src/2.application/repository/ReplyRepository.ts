import type { Reply } from "../../1.domain/Reply";
import type { ReviewId } from "../../1.domain/Review";

export interface ReplyRepository {
  findByReviewId(reviewId: ReviewId): Promise<Reply | undefined>;
  persist(reviewId: ReviewId, reply: string): Promise<void>;
}
