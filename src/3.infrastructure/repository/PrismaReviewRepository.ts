import type { PrismaClient } from "@prisma/client";

import type { Review, ReviewId } from "../../1.domain/Review";
import { Rating } from "../../1.domain/shared-kernel";
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

    return { ...review, rating: new Rating(review.rating) };
  }

  async persist(review: Review): Promise<void> {
    await this.prisma.review.create({
      data: { ...review, rating: review.rating.value },
    });
  }
}
