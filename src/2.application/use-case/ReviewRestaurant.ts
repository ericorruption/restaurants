import { createReview } from "../../1.domain/Review";
import type { AuthorizationService } from "../AuthorizationService";
import { Unauthorized } from "../Exceptions";
import type { LoggedUser } from "../model/LoggedUser";
import type { ReviewRepository } from "../repository/ReviewRepository";

import type { UseCase } from "./UseCase";

interface Input {
  user?: LoggedUser;
  restaurantId: string;
  rating: number;
  visitedAt: Date;
  comment: string;
}

export class ReviewRestaurant implements UseCase {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly authorizationService: AuthorizationService
  ) {}

  async execute({ user, ...restaurantInput }: Input): Promise<void> {
    if (!user || !this.authorizationService.isAllowedToCreateReview(user)) {
      throw new Unauthorized();
    }

    const newReview = createReview({ ...restaurantInput, userId: user.id });

    await this.reviewRepository.persist(newReview);

    // return newReview
  }
}
