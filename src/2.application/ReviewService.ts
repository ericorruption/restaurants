import type { OwnerId } from "../1.domain/Restaurant";
import type { Review } from "../1.domain/Review";

import type { ReplyRepository } from "./repository/ReplyRepository";
import type { RestaurantRepository } from "./repository/RestaurantRepository";
import type { ReviewRepository } from "./repository/ReviewRepository";

export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly restaurantRepository: RestaurantRepository,
    private readonly replyRepository: ReplyRepository
  ) {}

  // TODO improve algorithm
  async findPendingByOwner(ownerId: OwnerId): Promise<Review[]> {
    const restaurants = await this.restaurantRepository.findByOwnerId(ownerId);
    const restaurantIds = restaurants.map((restaurant) => restaurant.id);
    const reviews = await this.reviewRepository.getByRestaurantIds(
      restaurantIds
    );
    const reviewIds = reviews.map((review) => review.id);
    const repliesFromReviews = await this.replyRepository.findByReviewIds(
      reviewIds
    );
    const reviewIdsInReplies = repliesFromReviews.map(
      (reply) => reply.reviewId
    );
    const pendingReviews = reviews.filter(
      (review) => !reviewIdsInReplies.includes(review.id)
    );
    return pendingReviews;
  }
}
