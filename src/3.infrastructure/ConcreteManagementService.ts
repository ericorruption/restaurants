import type { PrismaClient } from "@prisma/client";

import type { Restaurant } from "../1.domain/Restaurant";
import type { Review } from "../1.domain/Review";
import { NumberBetween1And5, Rating } from "../1.domain/shared-kernel";
import type {
  DeleteReplyInput,
  DeleteRestaurantInput,
  DeleteReviewInput,
  DeleteUserInput,
  ManagementService,
  UpdateReplyInput,
  UpdateRestaurantInput,
  UpdateReviewInput,
  UpdateUserInput,
} from "../2.application/ManagementService";

// Pressed for time to create use cases just for admins.
export class ConcreteManagementService implements ManagementService {
  constructor(private readonly prisma: PrismaClient) {}

  async updateUser(input: UpdateUserInput): Promise<void> {
    await this.prisma.user.update({
      data: {
        name: input.name,
      },
      where: {
        id: input.userId,
      },
    });
  }

  async deleteUser(input: DeleteUserInput): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: input.userId,
      },
    });
  }

  async updateRestaurant(input: UpdateRestaurantInput): Promise<Restaurant> {
    const updatedRestaurant = await this.prisma.restaurant.update({
      data: {
        name: input.name,
      },
      where: {
        id: input.restaurantId,
      },
    });

    return updatedRestaurant;
  }

  async deleteRestaurant(input: DeleteRestaurantInput): Promise<void> {
    await this.prisma.restaurant.delete({
      where: {
        id: input.restaurantId,
      },
    });
  }

  async updateReview(input: UpdateReviewInput): Promise<Review> {
    const updatedReview = await this.prisma.review.update({
      data: {
        comment: input.comment,
      },
      where: {
        id: input.reviewId,
      },
    });

    return {
      ...updatedReview,
      rating: new Rating(updatedReview.rating as NumberBetween1And5),
    };
  }

  async deleteReview(input: DeleteReviewInput): Promise<void> {
    await this.prisma.review.delete({
      where: {
        id: input.reviewId,
      },
    });
  }

  async updateReply(input: UpdateReplyInput): Promise<void> {
    await this.prisma.reply.update({
      data: {
        comment: input.comment,
      },
      where: {
        id: input.replyId,
      },
    });
  }

  async deleteReply(input: DeleteReplyInput): Promise<void> {
    await this.prisma.reply.delete({
      where: {
        id: input.replyId,
      },
    });
  }
}
