import type { PrismaClient, Review as DbReview } from "@prisma/client";

import type { OwnerId, RestaurantId } from "../../1.domain/Restaurant";
import type { Review, ReviewId } from "../../1.domain/Review";
import { Rating } from "../../1.domain/shared-kernel";
import type { ReviewModel } from "../../2.application/model/Review";
import type { ReviewRepository } from "../../2.application/repository/ReviewRepository";

export class PrismaReviewRepository implements ReviewRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: ReviewId): Promise<Review> {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new Error(`Review with id ${id} not found`);
    }

    return this.toDomainReview(review);
  }

  async getByRestaurantId(restaurantId: RestaurantId): Promise<ReviewModel[]> {
    const reviews = await this.prisma.review.findMany({
      where: { restaurantId },
      orderBy: { createdAt: "desc" },
      include: {
        Reply: true,
      },
    });

    return reviews.map((review) => ({
      ...this.toDomainReview(review),
      reply: review.Reply?.comment ?? undefined,
    }));
  }

  async getPendingReviewsByOwnerId(ownerId: OwnerId): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({
      where: {
        replyId: null,
        AND: {
          Restaurant: {
            ownerId,
          },
        },
      },
    });

    return reviews.map((review) => this.toDomainReview(review));
  }

  async getByRestaurantIds(restaurantIds: RestaurantId[]): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({
      where: {
        restaurantId: {
          in: restaurantIds,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return reviews.map((review) => this.toDomainReview(review));
  }

  async persist(review: Review): Promise<void> {
    await this.prisma.review.create({
      data: { ...review, rating: review.rating.value },
    });
  }

  async getAverageRatingGroupByRestaurant(): Promise<
    Record<RestaurantId, Rating>
  > {
    const averageRatingPerId = await this.prisma.review.groupBy({
      by: ["restaurantId"],
      _avg: {
        rating: true,
      },
    });

    const initialState: Record<RestaurantId, Rating> = {};

    return averageRatingPerId.reduce((acc, curr) => {
      if (curr._avg.rating) {
        acc[curr.restaurantId] = new Rating(Math.round(curr._avg.rating));
      }
      return acc;
    }, initialState);
  }

  private toDomainReview(review: DbReview): Review {
    return {
      ...review,
      rating: new Rating(review.rating),
    };
  }
}
