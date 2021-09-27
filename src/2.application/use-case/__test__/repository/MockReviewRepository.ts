import type { Review } from "../../../../1.domain/Review";
import type { ReviewRepository } from "../../../repository/ReviewRepository";

export class MockReviewRepository implements ReviewRepository {
  private reviews: Review[] = [];

  persist(review: Review): Promise<void> {
    this.reviews.push(review);
    return Promise.resolve();
  }
}
