import type { ReplyRepository } from "../../2.application/repository/ReplyRepository";
import type { Reply } from "../../1.domain/Reply";
import type { ReviewId } from "../../1.domain/Review";

import type { PrismaClient } from ".prisma/client";

export class PrismaReplyRepository implements ReplyRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByReviewId(reviewId: ReviewId): Promise<Reply | undefined> {
    const reply = await this.prisma.reply.findFirst({
      include: {
        Review: {
          where: {
            id: reviewId,
          },
        },
      },
    });

    if (!reply) {
      return;
    }

    return reply;
  }

  findByReviewIds(reviewIds: ReviewId[]): Promise<Reply[]> {
    return this.prisma.reply.findMany({
      where: {
        reviewId: {
          in: reviewIds,
        },
      },
    });
  }

  async persist(reviewId: ReviewId, reply: string): Promise<void> {
    await this.prisma.reply.create({ data: { comment: reply, reviewId } });
  }
}
