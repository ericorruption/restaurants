import type { ReviewId } from "../../1.domain/Review";
import type { AuthorizationService } from "../AuthorizationService";
import { Unauthorized } from "../Exceptions";
import type { LoggedUser } from "../model/LoggedUser";
import type { ReplyRepository } from "../repository/ReplyRepository";
import type { ReviewRepository } from "../repository/ReviewRepository";

import type { UseCase } from "./UseCase";

interface Input {
  user?: LoggedUser;
  reviewId: ReviewId;
  reply: string;
}

export class ReplyToReview implements UseCase {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly replyRepository: ReplyRepository,
    private readonly authorizationService: AuthorizationService
  ) {}

  async execute(input: Input): Promise<void> {
    const review = await this.reviewRepository.findById(input.reviewId);

    if (
      !input.user ||
      !this.authorizationService.isAllowedToReplyToReview(input.user, review)
    ) {
      throw new Unauthorized();
    }

    const existingReply = await this.replyRepository.findByReviewId(
      input.reviewId
    );

    if (existingReply) {
      throw new Error("Reply already exists");
    }

    await this.replyRepository.persist(input.reviewId, input.reply);
  }
}
