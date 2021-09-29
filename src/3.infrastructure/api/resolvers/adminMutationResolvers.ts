import { Unauthorized } from "../../../2.application/Exceptions";
import type { MutationResolvers } from "../generated.types";

export const adminMutationResolvers: MutationResolvers = {
  updateUser: async (_, args, context) => {
    if (context.user?.role !== "admin") {
      throw new Unauthorized();
    }

    await context.app.managementService.updateUser({
      userId: args.userId,
      name: args.input.name,
    });

    return {
      success: true,
    };
  },
  deleteUser: async (_, args, context) => {
    if (context.user?.role !== "admin") {
      throw new Unauthorized();
    }

    await context.app.managementService.deleteUser(args);
    return { success: true };
  },
  updateRestaurant: async (_, args, context) => {
    if (context.user?.role !== "admin") {
      throw new Unauthorized();
    }

    const updatedRestaurant =
      await context.app.managementService.updateRestaurant({
        restaurantId: args.restaurantId,
        name: args.input.name,
      });

    return { ...updatedRestaurant, reviews: [] };
  },
  deleteRestaurant: async (_, args, context) => {
    if (context.user?.role !== "admin") {
      throw new Unauthorized();
    }

    await context.app.managementService.deleteRestaurant(args);
    return { success: true };
  },
  updateReview: async (_, args, context) => {
    if (context.user?.role !== "admin") {
      throw new Unauthorized();
    }

    const updatedReview = await context.app.managementService.updateReview({
      reviewId: args.reviewId,
      comment: args.input.comment,
    });
    return { ...updatedReview, rating: updatedReview.rating.value };
  },
  deleteReview: async (_, args, context) => {
    if (context.user?.role !== "admin") {
      throw new Unauthorized();
    }

    await context.app.managementService.deleteReview(args);
    return { success: true };
  },
  updateReply: async (_, args, context) => {
    if (context.user?.role !== "admin") {
      throw new Unauthorized();
    }

    await context.app.managementService.updateReply({
      replyId: args.replyId,
      comment: args.input.reply,
    });

    return {
      success: true,
    };
  },
  deleteReply: async (_, args, context) => {
    if (context.user?.role !== "admin") {
      throw new Unauthorized();
    }

    await context.app.managementService.deleteReply(args);
    return { success: true };
  },
};
