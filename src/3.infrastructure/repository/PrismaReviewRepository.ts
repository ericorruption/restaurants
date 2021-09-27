import type { PrismaClient } from "@prisma/client";

import type { Review } from "../../1.domain/Review";
import type { ReviewRepository } from "../../2.application/repository/ReviewRepository";

export class PrismaReviewRepository implements ReviewRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async persist(review: Review): Promise<void> {
    await this.prisma.review.create({
      data: review,
    });
  }
}
