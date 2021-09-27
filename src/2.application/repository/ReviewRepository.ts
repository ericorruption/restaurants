import type { Review, ReviewId } from "../../1.domain/Review";

export interface ReviewRepository {
  findById(id: ReviewId): Promise<Review>;
  persist(review: Review): Promise<void>;
}
