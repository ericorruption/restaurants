import type { Review, ReviewId } from "../../../../1.domain/Review";
import type { ReviewRepository } from "../../../repository/ReviewRepository";

export class MockReviewRepository implements ReviewRepository {
  constructor(private reviews: Review[] = []) {}

  findById(id: ReviewId): Promise<Review> {
    const review = this.reviews.find((review) => review.id === id);

    if (!review) {
      throw new Error(`Review with id ${id} not found`);
    }

    return Promise.resolve(review);
  }

  persist(review: Review): Promise<void> {
    this.reviews.push(review);
    return Promise.resolve();
  }
}
