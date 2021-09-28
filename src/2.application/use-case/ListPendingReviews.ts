import type { Review } from "../../1.domain/Review";
import { Unauthorized } from "../Exceptions";
import type { LoggedUser } from "../model/LoggedUser";
import type { ReviewService } from "../ReviewService";

import type { UseCase } from "./UseCase";

interface Input {
  user?: LoggedUser;
}

export class ListPendingReviews implements UseCase {
  constructor(private reviewService: ReviewService) {}

  async execute(input: Input): Promise<Review[]> {
    if (!input.user) {
      throw new Unauthorized();
    }

    return this.reviewService.findPendingByOwner(input.user.id);
  }
}
