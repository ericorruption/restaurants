import type { UserResolvers } from "../generated.types";

export const userResolvers: UserResolvers = {
  pendingReviews: async (_, __, context) => {
    const reviews = await context.app.useCases.listPendingReviews.execute({
      user: context.user,
    });

    return reviews.map((review) => ({
      ...review,
      rating: review.rating.value,
    }));
  },
};
