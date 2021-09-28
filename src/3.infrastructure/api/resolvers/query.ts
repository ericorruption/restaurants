import type { QueryResolvers, Role } from "../generated.types";

export const queryResolvers: QueryResolvers = {
  restaurants: async (_, args, context) => {
    if (args.ownerId) {
      const restaurants =
        await context.app.useCases.listOwnerRestaurants.execute({
          ownerId: args.ownerId,
          user: context.user,
        });

      return restaurants.map((restaurant) => ({ ...restaurant, reviews: [] }));
    }

    const restaurants = await context.app.useCases.listRestaurants.execute(
      context
    );

    return restaurants.map((restaurant) => ({
      ...restaurant,
      rating: restaurant.rating?.value,
      reviews: [],
    }));
  },
  restaurant: async (_, { id }, context) => {
    const restaurant = await context.app.useCases.getRestaurant.execute({
      restaurantId: id,
      user: context.user,
    });

    return {
      ...restaurant,
      rating: restaurant.rating?.value,
      reviews: restaurant.reviews.map((review) => ({
        ...review,
        rating: review.rating.value,
      })),
    };
  },
  me: async (_, __, context) => {
    const user = await context.app.useCases.getUser.execute({
      user: context.user,
    });

    if (!user) {
      return null;
    }

    return { ...user, role: user.role.toUpperCase() as Role };
  },
};
