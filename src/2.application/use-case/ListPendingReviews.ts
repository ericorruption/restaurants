import type { Review } from "../../1.domain/Review";
import { Unauthorized } from "../Exceptions";
import type { LoggedUser } from "../model/LoggedUser";
import type { ReviewRepository } from "../repository/ReviewRepository";

import type { UseCase } from "./UseCase";

interface Input {
  user?: LoggedUser;
}

export class ListPendingReviews implements UseCase {
  constructor(private reviewRepository: ReviewRepository) {}

  async execute(input: Input): Promise<Review[]> {
    if (!input.user) {
      throw new Unauthorized();
    }

    return this.reviewRepository.getPendingReviewsByOwnerId(input.user.id);
  }
}
