import type { ReviewId } from "./Review";

export interface Reply {
  reviewId: ReviewId;
  comment: string;
}
